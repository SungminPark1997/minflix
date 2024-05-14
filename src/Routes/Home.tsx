import { AnimatePresence, motion } from "framer-motion";

import { useQuery } from "react-query";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMoviesResult, trendMovies } from "../api";
import Slide from "../Components/Slide";
import { makeImagePath } from "../utils";
import Banner from "../Components/Banner";
export const Wrapper = styled.div`
  background: rgb(8%, 8%, 8%);
  overflow-x: hidden;
  padding-bottom: 200px;
`;

export const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

export const Overlay = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 200vh;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  opacity: 0;
`;
export const BigMoive = styled(motion.div)`
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
export const BigPhoto = styled.div<{ bgphoto: string }>`
  background-size: cover;
  width: 100%;
  background-position: center center;
  height: 400px;
  background-image: linear-gradient(to top, black, transparent),
    url(${(props) => props.bgphoto});
`;

export const BigTitle = styled.div`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;
export const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;
export const NowPlayingLine = styled.div`
  position: absolute;
  top: -335px;

  z-index: 1;
  color: white;
  font-size: 24px;
`;
export const TrendingLine = styled.div`
  position: absolute;
  top: -35px;

  z-index: 1;
  color: white;
  font-size: 24px;
`;
function Home() {
  const navigate = useNavigate();
  const matchInfo = useMatch("/movies/:movieId/:top");

  const { data: now_playing, isLoading: isLoadingNowPlaying } =
    useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);

  const { data: trending, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "trending"],
    trendMovies
  );
  const arr = [
    ...Object.values(now_playing?.results || {}),
    ...Object.values(trending?.results || {}),
  ];
  const clickedMovie =
    matchInfo?.params.movieId &&
    arr.find((movie) => movie.id + "" === matchInfo?.params.movieId);

  const onOverlayClick = () => {
    navigate("/");
  };

  return (
    <Wrapper>
      {isLoadingNowPlaying && isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {now_playing && trending ? (
            <>
              <Banner {...now_playing} />
              <Content>
                <NowPlayingLine>지금 상영중인 영화</NowPlayingLine>
                <Slide top={0} data={now_playing}></Slide>
                <TrendingLine>요즘 핫한 영화</TrendingLine>
                <Slide top={300} data={trending} />
              </Content>
            </>
          ) : null}
          <AnimatePresence>
            {matchInfo ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                {clickedMovie && matchInfo.params.top && (
                  <BigMoive
                    layoutId={
                      clickedMovie.id + Number(matchInfo?.params.top) + ""
                    }
                  >
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
                )}
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
