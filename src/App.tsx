import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { PokemonCollection } from "./components/PokemonCollection";
import { Info, Pokemon } from "./components/interface";
import { PokemonInfo } from "./components/PokemonInfo";

interface Pokemons {
  name: string;
  url: string;
}

function App() {
  const [data, setData] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [info, setInfo] = useState<Info>({
    name: "",
    img_url: "",
    ability: [],
  });

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=18&offset=0"
      );
      setNextUrl(res.data.next);
      res.data.results.forEach(async (pokemon: Pokemons) => {
        const pokeRes = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        setData((p) => [...p, pokeRes.data]);
        setIsLoading(false);
      });
    };
    getPokemon();
  }, []);

  const showMore = async () => {
    setIsLoading(true);
    const res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    res.data.results.forEach(async (pokemon: Pokemons) => {
      const pokeRes = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      setData((p) => [...p, pokeRes.data]);
      setIsLoading(false);
    });
  };

  return (
    <div className="App">
      <p className="poke--header">Pokemon</p>
      {showDetail ? (
        <>
          <PokemonInfo 
            name={info.name}
            img_url={info.img_url}
            ability={info.ability}
            setShowDetail={setShowDetail}
          />
        </>
      ) : (
        <>
          <PokemonCollection
            pokemons={data}
            setShowDetail={setShowDetail}
            setInfo={setInfo}
          />
          <div onClick={showMore} className="show--more">
            {isLoading ? "Loading..." : "Show more"}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
