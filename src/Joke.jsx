import React from "react";

const Joke = ({ joke, votes }) => {
  return (
    <div className="Joke">
      {joke}-{votes}
    </div>
  );
};

export default Joke;
