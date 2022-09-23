import React from "react";
import "./Joke.css";

const Joke = (state) => {
  function getColorAndEmojie() {
    if (state.votes >= 15)
      return {
        color: "#4CAF50",
        emojie: "em em-rolling_on_the_floor_laughing",
      };
    else if (state.votes >= 12)
      return { color: "#8BC34A", emojie: "em em-laughing" };
    else if (state.votes >= 9)
      return { color: "#CDDC39", emojie: "em em-smiley" };
    else if (state.votes >= 6)
      return { color: "#FFEB3B", emojie: "em em-slightly_smiling_face" };
    else if (state.votes >= 3)
      return { color: "#FFC107", emojie: "em em-neutral_face" };
    else if (state.votes >= 0)
      return { color: "#FF9800", emojie: "em em-confused" };
    return { color: "#f44336", emojie: "em em-angry" };
  }

  return (
    <div className="Joke">
      <div className="Joke-buttons">
        <i
          class="fa-solid fa-arrow-up"
          onClick={() => state.handleVote(state.id, 1)}
        ></i>
        <span
          style={{ borderColor: getColorAndEmojie().color }}
          className="Joke-votes"
        >
          {state.votes}
        </span>
        <i
          class="fa-solid fa-arrow-down"
          onClick={() => state.handleVote(state.id, -1)}
        ></i>
      </div>
      <div className="Joke-text">{state.text}</div>

      <div className="Joke-smiley">
        <i className={getColorAndEmojie().emojie}></i>
      </div>
    </div>
  );
};

export default Joke;
