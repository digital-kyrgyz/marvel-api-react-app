import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import axios from "axios";
import CharacterTable from "./components/CharacterTable";
import Search from "./components/Search";

const hash = "a00779885432ff657620df52a32ba8b6";

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetch = async () => {
      if (query === "") {
        const result = await axios(
          `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=4cb6dd6ce205a55d6baab396aac52e4a&hash=${hash}`
        );
        console.log(result.data.data.results);
        setItems(result.data.data.results);
        setLoading(false);
      } else {
        const result = await axios(
          `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=1&apikey=4cb6dd6ce205a55d6baab396aac52e4a&hash=${hash}`
        );

        setItems(result.data.data.results);
        setLoading(false);
      }
    };
    fetch();
  }, [query]);

  return (
    <div className="container">
      <Header />
      <Search search={(q) => setQuery(q)} />
      <CharacterTable items={items} isLoading={isLoading} />
    </div>
  );
}

export default App;
