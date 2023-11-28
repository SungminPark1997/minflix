import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  PathMatch,
  useLocation,
  useMatch,
  useNavigate,
} from "react-router-dom";
import { styled } from "styled-components";
import { IGetMoviesResult, searchMovies } from "../api";
import Slide from "../Components/Slide";
import { makeImagePath } from "../utils";
import { BigMoive, BigOverview, BigPhoto, BigTitle, Overlay } from "./Home";
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

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state: { value } = {} } = location;
  const { state } = location;
  const defaultData: IGetMoviesResult | undefined = state?.defaultData;

  let key: any;
  if (defaultData === undefined) {
    key = value.keyword;
  }
  const bigSearchMatch: PathMatch<string> | null = useMatch("/search/:id");
  const { data, isLoading, isError } = useQuery<IGetMoviesResult>(
    ["movies", "search", key],
    () => searchMovies(key)
  );
  const clickedMovie =
    bigSearchMatch?.params.id &&
    defaultData?.results.find(
      (movie) => movie.id + "" === bigSearchMatch?.params.id
    );
  const onOverlayClick = () => {
    navigate(-1);
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : !data || data?.results.length === 0 ? (
        <CannotFind>
          입력하신 검색어 "{key}"" 와 일치하는 결과가 없습니다.
        </CannotFind>
      ) : (
        <Banner>
          {defaultData ? (
            <Slide top={0} data={defaultData}></Slide>
          ) : (
            <Slide top={0} data={data}></Slide>
          )}
        </Banner>
      )}
      <AnimatePresence>
        {bigSearchMatch ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <BigMoive layoutId={bigSearchMatch.params.id}>
              {clickedMovie && (
                <>
                  <BigPhoto
                    bgphoto={makeImagePath(clickedMovie.backdrop_path, "w500")}
                  ></BigPhoto>
                  <BigTitle>{clickedMovie.title}</BigTitle>
                  <BigOverview>{clickedMovie.overview}</BigOverview>
                </>
              )}
            </BigMoive>
          </>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}
export default Search;
