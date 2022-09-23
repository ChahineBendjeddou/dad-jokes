import axios from "axios";
import { v4 as uuid } from "uuid";
import React, { useState, useEffect } from "react";
import Joke from "./Joke";
import "./JokeList.css";

const JokeList = () => {
  const API_URL = "https://icanhazdadjoke.com/";
  const NUMBER_JOKES = 10;
  const [jokes, setJokes] = useState([]);

  async function getJokes() {
    const jokes = new Set();
    const options = { headers: { Accept: "application/json" } };
    while (jokes.size < NUMBER_JOKES) {
      const { data } = await axios.get(API_URL, options);
      jokes.add(data.joke);
    }
    [...jokes].map((joke) =>
      setJokes((state) => [...state, { id: uuid(), text: joke, votes: 0 }])
    );
  }

  useEffect(() => {
    getJokes();
  }, []);
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
        <button className="JokeList-getmore">New Jokes</button>
      </div>
      <div className="JokeList-jokes">
        {jokes.map((j) => (
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
