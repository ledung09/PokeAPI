import axios from "axios";
import { Pokemon } from "../interface";
import { PokemonItem } from "./PokemonItem";

interface Props {
  pokemons: Pokemon[];
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setAbility: React.Dispatch<React.SetStateAction<string[]>>;
}

interface Ability {
  ability: {
    name: string
  }
}

export const PokemonCollection = (props: Props) => {
  const { pokemons, setShowDetail, setAbility } = props;

  const viewDetail  = async (name:string) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    let ability_list:string[] = []
    res.data.abilities.forEach((ability:Ability) => {
      ability_list.push(ability.ability.name)
    })
    setAbility(ability_list)
  }

  return (
    <div className="poke--container">
      {pokemons.map((pokemon) => {
        return (
          <PokemonItem 
            key = {pokemon.id}
            name = {pokemon.name}
            img_src = {pokemon.sprites.front_default}
            onClick = {() => {
              setShowDetail(true);
              viewDetail(pokemon.name)
            }}
          />     
        )
      })}
    </div>
  );
};
