import axios from "axios";
import { Info, Pokemon } from "./interface";
import { PokemonItem } from "./PokemonItem";

interface Props {
  pokemons: Pokemon[];
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setInfo: React.Dispatch<React.SetStateAction<Info>>;
}

interface Ability {
  ability: {
    name: string;
  };
}

export const PokemonCollection = (props: Props) => {
  const { pokemons, setShowDetail, setInfo } = props;

  const viewDetail = async (name: string, url: string) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    let ability_list: string[] = [];
    res.data.abilities.forEach((ability: Ability) => {
      ability_list.push(ability.ability.name);
    });
    setInfo({
      name: name,
      img_url: url,
      ability: ability_list
    });
  };

  return (
    <div className="poke--container">
      {pokemons.map((pokemon) => {
        return (
          <PokemonItem
            key={pokemon.id}
            name={pokemon.name}
            img_src={pokemon.sprites.front_default}
            onClick={() => {
              setShowDetail(true);
              viewDetail(pokemon.name, pokemon.sprites.front_default);
            }}
          />
        );
      })}
    </div>
  );
};
