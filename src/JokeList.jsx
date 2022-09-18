import axios from "axios";
import React, { useState, useEffect } from "react";
import Joke from "./Joke";

const JokeList = () => {
  const API_URL = "https://icanhazdadjoke.com/";
  const NUMBER_JOKES = 10;
  const [jokes, setJokes] = useState([]);

  async function getJokes() {
    const jokes = new Set();
    const options = { headers: { Accept: "application/json" } };
    while (jokes.size < NUMBER_JOKES) {
      const { data } = await axios.get(API_URL, options);
      jokes.add(data);
    }
    setJokes([...jokes]);
  }

  useEffect(() => {
    getJokes();
  }, []);

  return (
    <>
      <h1>Jokes</h1>
      <ul className="">
        {jokes.map(({ joke, id }) => (
          <Joke key={id} joke={joke} />
        ))}
      </ul>
    </>
  );
};

export default JokeList;
