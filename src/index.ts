// index.ts
import { cloneNode } from '@finsweet/ts-utils';

import { greetUser } from '$utils/greet';

const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
const numberOfPokemons = 99; // Change this to the number of Pokémon you want to fetch

// Fetch data from the API
async function fetchPokemonData(id: number) {
  const response = await fetch(`${apiUrl}/${id}`);
  const data = await response.json();
  return data;
}

window.Webflow = window.Webflow || [];
window.Webflow.push(async () => {
  const itemTemplate = document.querySelector<HTMLAnchorElement>('[data-element="pokemon-item"]');
  if (!itemTemplate) return;

  const itemList = itemTemplate.parentElement!;

  itemTemplate.remove();

  const pokemonItems = [];

  // Auto-generate Pokémon data
  for (let id = 1; id <= numberOfPokemons; id++) {
    // Fetch Pokemon details from the API
    const pokemonDetails = await fetchPokemonData(id);

    // Use the fetched data to create the item
    const item = cloneNode(itemTemplate);
    const imageElement = item.querySelector<HTMLImageElement>('[data-element="pokemon-image"]');
    const idElement = item.querySelector<HTMLDivElement>('[data-element="pokemon-id"]');
    const nameElement = item.querySelector<HTMLDivElement>('[data-element="pokemon-name"]');

    if (imageElement) {
      // Use the front_default sprite URL
      imageElement.src = pokemonDetails.sprites.front_default;
    }

    if (idElement) {
      idElement.textContent = pokemonDetails.id.toString();
    }

    if (nameElement) {
      nameElement.textContent = pokemonDetails.name.toString();
    }

    item.removeAttribute('data-cloack');

    pokemonItems.push(item);
  }

  console.log(pokemonItems);

  itemList.append(...pokemonItems);
});
