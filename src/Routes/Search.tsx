import { color } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { IGetMoviesResult, searchMovies } from "../api";
import Slide from "../Components/Slide";
import { makeImagePath } from "../utils";
const Wrapper = styled.div`
  overflow-x: hidden;
  padding-bottom: 200px;
  height: 200vh;
  background: linear-gradient(to bottom, black, #333333);
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Banner = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
`;

const CannotFind = styled.div`
  color: white;
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 20%;
  justify-content: center;
`;
const Result = styled.div<{ bgphoto: string }>`
margin-left: 25%;
width:50%;
height: 70%;
background-size: cover;
 display:flex
 justify-content: center;
 background-position: center center;
 background-image:url(${(props) => props.bgphoto});

`;
function Search() {
  const location = useLocation();
  const { keyword } = location.state.value;

  const { data, isLoading, isError } = useQuery<IGetMoviesResult>(
    ["movies", "search", keyword],
    () => searchMovies(keyword)
  );
  console.log(data);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : !data || data?.results.length === 0 ? (
        <CannotFind>
          입력하신 검색어{keyword}와 일치하는 결과가 없습니다.
        </CannotFind>
      ) : (
        <Banner>
          <Slide data={data}></Slide>
        </Banner>
      )}
    </Wrapper>
  );
}
export default Search;
