import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { IGetMoviesResult, searchMovies } from "../api";
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
function Search() {
  const location = useLocation();
  const { keyword } = location.state.value;

  const { data, isLoading, isError } = useQuery<IGetMoviesResult>(
    ["movies", "search"],
    () => searchMovies(keyword)
  );
  console.log(data);

  console.log(isError);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : !data || data?.results.length === 0 ? (
        <div>찾는 내용 없음</div>
      ) : (
        <Banner bgphoto={makeImagePath(data.results[0].backdrop_path)}></Banner>
      )}
    </Wrapper>
  );
}
export default Search;
