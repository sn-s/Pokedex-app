import React, {useState, useEffect} from "react";
import axios from "axios";
import PokemonCard from "./components/PokemonCard";
import "./App.css";

const App = () => {

  const [pokedex, setPokedex] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchPokemon()
  }, [])

  useEffect(() => {
    setFiltered(pokedex)
    setFiltered(filtered => filtered.filter(pokemon => pokemon.name.includes(query))
      .sort((a, b) => a.name > b.name ? 1 : -1))
  }, [query])

  const fetchPokemon = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?offset0&limit=100")
      .then(resp => {
        return resp.data.results
      })
      .then(fullData => {
        fullData.map(item => {
          return axios.get(item.url)
            .then(pokemon => {
              setPokedex(pokedex => [...pokedex, 
                {
                  name: pokemon.data.name,
                  type: pokemon.data.types[0].type.name,
                  ability: pokemon.data.abilities[0].ability.name,
                  image: pokemon.data.sprites.front_default
                }])
            })
        })
      })
  }

  const handleOnchange = (e) => {
    const input = e.target.value;
    setQuery(input);
  }

  return (
    <div className="app-wrapper">
      <header>
        <h1 className="title" >PokeDex</h1>
        <h3 className="sub-title" >Database</h3>
        <form className="form-style" >
          <input type="text" placeholder="Start typing here" onChange={handleOnchange} value={query} />
        </form>
      </header>

      <section className="pokedex">
        <div>
        <PokemonCard data={filtered} />
        </div>     
      </section>
    </div>
  )
}

export default App;
