import { useQuery } from "react-query";
import { getTv, IGetMoviesResult, IGetTv, ITv, popularTv } from "../api";
import Slide from "../Components/Slide";
import { makeImagePath } from "../utils";
import {
  Banner,
  Content,
  Loader,
  NowPlayingLine,
  Overview,
  Title,
  TrendingLine,
  Wrapper,
} from "./Home";

function Tv() {
  const { data: tv_nowPlaying, isLoading: isLoadingNowPlaying } =
    useQuery<IGetMoviesResult>(["tv", "nowPlaying"], getTv);
  const { data: tv_popular, isLoading: isLoadingPopular } =
    useQuery<IGetMoviesResult>(["tv", "popular"], popularTv);

  return (
    <Wrapper>
      {isLoadingNowPlaying ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(
              tv_nowPlaying?.results[1].backdrop_path || ""
            )}
          >
            <Title>{tv_nowPlaying?.results[1].title}</Title>
            <Overview>{tv_nowPlaying?.results[1].overview}</Overview>
          </Banner>
          {tv_nowPlaying && tv_popular ? (
            <Content>
              <NowPlayingLine>지금 상영중인 영화</NowPlayingLine>
              <Slide top={0} data={tv_nowPlaying}></Slide>
              <TrendingLine>요즘 잘나가는 시리즈</TrendingLine>
              <Slide top={300} data={tv_popular} />
            </Content>
          ) : null}
        </>
      )}
    </Wrapper>
  );
}
export default Tv;
