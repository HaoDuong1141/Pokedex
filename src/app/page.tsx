"use client";
import React, { useState } from "react";
import Axios from "axios";

export default function Home() {
    const [pokemonName, setPokemonName] = useState("");
    const [pokemonChosen, setPokemonChosen] = useState(false);
    const [pokemon, setPokemon] = useState({
        name: "",
        species: "",
        img: "",
        hp: "",
        attack: "",
        defense: "",
        type: "",
    });

    const searchPokemon = () => {
        Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response) => {
            console.log(response);
            setPokemon({
                name: pokemonName,
                species: response.data.species.name,
                img: response.data.sprites.front_default,
                hp: response.data.stats[0].base_stat,
                attack: response.data.stats[1].base_stat,
                defense: response.data.stats[2].base_stat,
                type: response.data.types[0].type.name,
            });
            setPokemonChosen(true);
        });
    };

    return (
        <main>
            <div className="flex flex-col items-center bg-[#5DB9FF] py-12 gap-y-10">
                <h1 className="font-bold text-white text-6xl">Pokedex</h1>
                <input
                    type="text"
                    placeholder="Enter Pokemon Name"
                    onChange={(event) => {
                        setPokemonName(event.target.value);
                    }}
                    className="h-[45px] w-[300px] text-lg rounded-lg text-center border-none outline-none"
                />
                <button
                    onClick={searchPokemon}
                    className="text-white text-xl h-[60px] w-[220px] bg-[#006cbf] p-2 rounded-lg hover:scale-110"
                >
                    Search for Pokemon
                </button>
            </div>
            <div className="flex flex-col items-center pt-24">
                {!pokemonChosen ? (
                    <h1>Please choose a Pokemon</h1>
                ) : (
                    <>
                        <h1 className="text-2xl font-bold capitalize">{pokemon.name}</h1>
                        <img src={pokemon.img} />
                        <h3 className="capitalize">Species: {pokemon.species}</h3>
                        <h3 className="capitalize">Type: {pokemon.type}</h3>
                        <h4>Hp: {pokemon.hp}</h4>
                        <h4>Attack: {pokemon.attack}</h4>
                        <h4>Defense: {pokemon.defense}</h4>
                    </>
                )}
            </div>
        </main>
    );
}
