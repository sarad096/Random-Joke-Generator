import React, { useState, useEffect } from "react";
import "./main.css";
import Loader from "../Loader/Loader"
const Jokes = () => {
  const url = "https://icanhazdadjoke.com/";
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [joke, setJoke] = useState("Default Joke");
  const [background, setBackground] = useState("#1c163a");

  document.body.style.backgroundColor = `${background}`;
  const GenerateJoke = () => {
    fetch(url, {
      headers: {
        Accept: "application/json",
      },
    })
      .then((resp) => {
        if (resp.status >= 200 && resp.status <= 299) {
          return resp.json();
        } else {
          setIsLoading(false);
          setIsError(true);
          throw new Error(resp.statusText);
        }
      })
      .then((resp) => {
        // console.log(resp.joke)
        const { joke } = resp;
        setJoke(joke);
        setIsLoading(false);
        setBackground("#73A9AD");
      })
      .catch((err) => {
        // console.log(err)
        setIsError(true);
      });
  };
  useEffect(() => {
    GenerateJoke();
  }, []);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <h1 className="center color error-header ">
          OOPs! Something Went Wrong ):
        </h1>
      </div>
    );
  }
  return (
    <div className="wrapper">
      <h1 className="center main--heading">Random Jokes Generator</h1>
      <div className="container">
        <div className="jokewrapper">
          <h2 className="center color joke--heading">LOL JOKES</h2>
          <div className="jokedesc">
            <p className="center"> {joke} </p>
          </div>
          <button onClick={GenerateJoke} className="btn">
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Jokes;
