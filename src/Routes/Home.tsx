import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import Slide from "../Components/Slide";
import TopMovie from "../Components/Slide";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background: black;
  overflow-x: hidden;
  padding-bottom: 200px;
  height: 200vh;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 50px;
  width: 50%;

  color: white;
`;
const Overview = styled.p`
  font-size: 36px;
`;

const Slider = styled.div`
  position: relative;
  top: -300px;
`; //

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`; //

const Overlay = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  opacity: 0;
`;
const BigMoive = styled(motion.div)`
  position: fixed;
  zindex: 3;
  width: 40vw;
  height: 80vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;
const BigPhoto = styled.div<{ bgphoto: string }>`
  background-size: cover;
  width: 100%;
  background-position: center center;
  height: 400px;
  background-image: linear-gradient(to top, black, transparent),
    url(${(props) => props.bgphoto});
`;

const BigTitle = styled.div`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;
const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;
/*const rowVariants = {
  hidden: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exitRight: {
    // 오른쪽 방향 exit 애니메이션
    x: -window.outerWidth - 10,
  },
  exitLeft: {
    // 왼쪽 방향 exit 애니메이션
    x: window.outerWidth + 10,
  },
};*/

function Home() {
  const navigate = useNavigate();

  const bigMovieMatch: PathMatch<string> | null = useMatch("/movies/:id");

  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  const clickedMovie =
    bigMovieMatch?.params.id &&
    data?.results.find((movie) => movie.id + "" === bigMovieMatch?.params.id);

  const onOverlayClick = () => {
    navigate("/");
  };

  console.log(data, isLoading);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>

          {data ? <Slide data={data} /> : null}
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMoive layoutId={bigMovieMatch.params.id}>
                  {clickedMovie && (
                    <>
                      <BigPhoto
                        bgphoto={makeImagePath(
                          clickedMovie.backdrop_path,
                          "w500"
                        )}
                      ></BigPhoto>
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMoive>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
