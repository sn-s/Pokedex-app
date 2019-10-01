import React from "react";
import "./PokemonCard.css";

const PokemonCard = ({data}) => {

  const displayPokemon = data.map(pokemon => (
     <div key={pokemon.name} className="pokemon">
      <h2 className="pokemon-name" >{pokemon.name}</h2>
      <h4>type: {pokemon.type}</h4>
      <h4>ability: {pokemon.ability}</h4>
      <img src={pokemon.image} alt="pokemon" />
    </div>
  ))
  return (
    <div className="pokedex-list">
      {displayPokemon}
    </div>
  )
}

export default PokemonCard;
