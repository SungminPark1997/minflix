import { AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import { getTv, IGetMoviesResult, IGetTv, ITv, popularTv } from "../api";
import Slide from "../Components/Slide";
import { makeImagePath } from "../utils";
import {
  BigMoive,
  BigOverview,
  BigPhoto,
  BigTitle,
  Content,
  Loader,
  NowPlayingLine,
  Overlay,
  TrendingLine,
  Wrapper,
} from "./Home";
import Banner from "../Components/Banner";

function Tv() {
  const navigate = useNavigate();
  const matchInfo = useMatch("/tv/:tvId/:top");
  const { data: tv_nowPlaying, isLoading: isLoadingNowPlaying } =
    useQuery<IGetMoviesResult>(["tv", "nowPlaying"], getTv);
  const { data: tv_popular, isLoading: isLoadingPopular } =
    useQuery<IGetMoviesResult>(["tv", "popular"], popularTv);
  const arr = [
    ...Object.values(tv_nowPlaying?.results || {}),
    ...Object.values(tv_popular?.results || {}),
  ];
  const clickedTv =
    matchInfo?.params.tvId &&
    arr.find((tv) => tv.id + "" === matchInfo?.params.tvId);

  const onOverlayClick = () => {
    navigate("/tv");
  };
  return (
    <Wrapper>
      {isLoadingNowPlaying ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {tv_nowPlaying && tv_popular ? (
            <>
              <Banner {...tv_nowPlaying} />
              <Content>
                <NowPlayingLine>지금 상영중인 드라마</NowPlayingLine>
                <Slide top={0} data={tv_nowPlaying}></Slide>
                <TrendingLine>요즘 잘나가는 시리즈</TrendingLine>
                <Slide top={300} data={tv_popular} />
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
                {clickedTv && matchInfo.params.top && (
                  <BigMoive
                    layoutId={clickedTv.id + Number(matchInfo?.params.top) + ""}
                  >
                    {clickedTv && (
                      <>
                        <BigPhoto
                          bgphoto={makeImagePath(
                            clickedTv.backdrop_path,
                            "w500"
                          )}
                        ></BigPhoto>
                        <BigTitle>{clickedTv.original_name}</BigTitle>
                        <BigOverview>{clickedTv.overview}</BigOverview>
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
export default Tv;
