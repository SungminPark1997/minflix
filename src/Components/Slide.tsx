import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { useState } from "react";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import { IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import React from "react";
interface SliderProps {
  data: IGetMoviesResult; // data를 props로 받음
}
const Slider = styled.div`
  position: relative;
  top: -300px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;
const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  height: 200px;

  font-size: 66px;

  background-image: url(${(props) => props.bgphoto});
  background-position: center, center;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const LeftStyledIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 3rem;
  position: absolute;
  top: 80px;
  left: 25px;
  cursor: pointer;
`;

const RightStyledIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 3rem;
  position: absolute;
  top: 80px;
  right: 25px;
  cursor: pointer;
`;
const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? window.outerWidth + 10 : -window.outerWidth - 10, // 초기 위치
      opacity: 0,
    };
  },
  center: {
    x: 0, // 가운데로 이동
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? window.outerWidth + 10 : -window.outerWidth - 10, // 나가는 위치
      opacity: 0,
    };
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.5,
    y: -50,

    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};
const offset = 6;
function Slide({ data }: SliderProps) {
  const navigate = useNavigate();
  const [direction, setDirection] = useState(1);
  const [index, setIndex] = useState(0);
  const [condition, setCondition] = useState("left");
  const bigMovieMatch: PathMatch<string> | null = useMatch("/movies/:id");
  console.log(condition);
  console.log(index);

  const [isFinish, setFinish] = useState(false);

  const increaseIndex = (newDirection: number) => {
    if (data) {
      if (isFinish) return;
      setDirection(newDirection);
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;

      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      setCondition("right");
    }
  };

  const decreaseIndex = (newDirection: number) => {
    if (data) {
      if (isFinish) return;
      setDirection(newDirection);
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
      setCondition("left");
    }
  };

  const toggleLeaving = () => {
    setFinish((prev) => !prev);
  };
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  return (
    <Slider>
      <AnimatePresence
        initial={false}
        onExitComplete={toggleLeaving}
        custom={direction}
      >
        <Row
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          custom={direction}
          transition={{ type: "tween", duration: 1 }}
          key={index}
        >
          {data?.results
            .slice(1)
            .slice(offset * index, offset * index + offset)
            .map((movie) =>
              movie.backdrop_path ? (
                <Box
                  layoutId={movie.id + ""}
                  variants={boxVariants}
                  whileHover="hover"
                  initial="normal"
                  key={movie.id}
                  onClick={() => onBoxClicked(movie.id)}
                  transition={{ type: "tween" }}
                  bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                >
                  <Info variants={infoVariants}>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              ) : null
            )}
        </Row>
        <RightStyledIcon
          key="right-icon"
          icon={faArrowRight}
          onClick={() => {
            increaseIndex(1);
          }}
        />
        <LeftStyledIcon
          key="left-icon"
          icon={faArrowLeft}
          onClick={() => {
            decreaseIndex(-1);
          }}
        />
      </AnimatePresence>
    </Slider>
  );
}

export default React.memo(Slide);
