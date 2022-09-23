import React from "react";
import "./Joke.css";

const Joke = (state) => {
  return (
    <div className="Joke">
      <div className="Joke-buttons">
        <i
          class="fa-solid fa-arrow-up"
          onClick={() => state.handleVote(state.id, 1)}
        ></i>
        <span className="Joke-votes">{state.votes}</span>
        <i
          class="fa-solid fa-arrow-down"
          onClick={() => state.handleVote(state.id, -1)}
        ></i>
      </div>
      <div className="Joke-text">{state.text}</div>

      <div className="Joke-smiley">
        <i
          class="em em-rolling_on_the_floor_laughing"
          aria-label="ROLLING ON THE FLOOR LAUGHING"
        ></i>
      </div>
    </div>
  );
};

export default Joke;
