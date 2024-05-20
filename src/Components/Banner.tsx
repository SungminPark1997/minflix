import { styled } from "styled-components";
import { makeImagePath } from "../utils";
import { IGetMoviesResult } from "../api";
import { useLocation } from "react-router-dom";

export const Wrapper = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;

  background-image: linear-gradient(rgba(8%, 8%, 8%, 0), rgba(8%, 8%, 8%, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;
const Cover = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
`;
export const Title = styled.h2`
  font-size: 50px;
  width: 100%;
  color: white;
  margin-bottom: 5%;
`;
export const Overview = styled.p`
  font-size: 36px;
  color: white;
`;
export default function Banner(now_playing: IGetMoviesResult) {
  const location = useLocation();
  return (
    <Wrapper
      bgphoto={makeImagePath(now_playing?.results[0].backdrop_path || "")}
    >
      <Cover>
        {" "}
        <Title>
          {location.pathname === "/tv"
            ? now_playing?.results[0].original_name
            : now_playing?.results[0].title}
        </Title>
        <Overview>{now_playing?.results[0].overview}</Overview>
      </Cover>
    </Wrapper>
  );
}
