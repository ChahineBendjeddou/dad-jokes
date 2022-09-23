import axios from "axios";
import { v4 as uuid } from "uuid";
import React, { useState, useEffect } from "react";
import Joke from "./Joke";
import "./JokeList.css";

const JokeList = () => {
  const API_URL = "https://icanhazdadjoke.com/";
  const NUMBER_JOKES = 10;
  const [jokes, setJokes] = useState(
    JSON.parse(window.localStorage.getItem("jokes") || "[]")
  );
  const [isLoading, setIsLoading] = useState(false);

  async function getJokes(jokes) {
    setIsLoading(true);
    const seenJokes = new Set(jokes.map((j) => j.text));
    const newJokes = [];
    const options = { headers: { Accept: "application/json" } };
    while (newJokes.length < NUMBER_JOKES) {
      const { data } = await axios.get(API_URL, options);
      if (!seenJokes.has(data.joke)) {
        newJokes.push(data.joke);
      }
    }
    newJokes.map((joke) =>
      setJokes((state) => [...state, { id: uuid(), text: joke, votes: 0 }])
    );
    setIsLoading(false);
  }
  useEffect(() => {
    window.localStorage.setItem("jokes", JSON.stringify(jokes));
    if (jokes.length) return;
    getJokes(jokes);
  }, [jokes]);

  function handleVote(id, delta) {
    setJokes((state) =>
      state.map((joke) =>
        joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
      )
    );
  }
  return (
    <div className="JokeList">
      <div className="JokeList-sidebar">
        <h1 className="JokeList-title">
          <span>Dad</span> Jokes
        </h1>

        <img
          src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
          alt="laughing tears"
        />
        <button className="JokeList-getmore" onClick={() => getJokes(jokes)}>
          New Jokes
        </button>
      </div>

      {isLoading ? (
        <div className="JokeList-spinner">
          <i className="far fa-8x fa-laugh fa-spin" />
          <h1 className="">Loading...</h1>
        </div>
      ) : (
        ""
      )}
      <div className="JokeList-jokes">
        {jokes
          .sort((a, b) => b.votes - a.votes)
          .map((j) => (
            <Joke
              id={j.id}
              key={j.id}
              text={j.text}
              votes={j.votes}
              handleVote={handleVote}
            />
          ))}
      </div>
    </div>
  );
};

export default JokeList;
