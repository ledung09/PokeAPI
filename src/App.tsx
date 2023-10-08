import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { PokemonCollection } from "./components/PokemonCollection";
import { Pokemon } from "./interface";

interface Pokemons {
  name: string;
  url: string;
}

function App() {
  const [data, setData] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [ability, setAbility] = useState<string[]>([])

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
      );
      setNextUrl(res.data.next)
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
    res.data.results.forEach(async (pokemon: Pokemons) => {
      const pokeRes = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      setData((p) => [...p, pokeRes.data]);
      setIsLoading(false);
    });
  }


  return (
    <div className="App">
      <p className="poke--header">Pokemon</p>
      {
        showDetail ?  
        <>
          <p> {ability[0]} </p>
          <p> {ability[1]} </p>
        </>
          : 
          <>
            <PokemonCollection 
              pokemons={data}
              setShowDetail = {setShowDetail}
              setAbility = {setAbility}
            />
            <div onClick={showMore} className="show--more"> 
              {isLoading ? "Loading..." : "Show more"}
            </div>
          </>
      }
      
    </div>
  );
}

export default App;
