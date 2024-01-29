// index.ts
import { cloneNode } from '@finsweet/ts-utils';

import { greetUser } from '$utils/greet';

const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
const numberOfPokemons = 1025; // Change this to the number of Pokémon you want to fetch

// Utility function to convert text to sentence case
function toSentenceCase(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// Fetch data from the API
async function fetchPokemonData(id: number) {
  const response = await fetch(`${apiUrl}/${id}`);
  const data = await response.json();
  return data;
}

// Function to filter Pokémon items based on search input
function filterPokemonItems(searchText: string, items: HTMLElement[]) {
  const lowerSearchText = searchText.toLowerCase();
  items.forEach((item) => {
    const nameElement = item.querySelector<HTMLDivElement>('[data-element="pokemon-name"]');
    const typesElement = item.querySelector<HTMLDivElement>('[data-element="pokemon-types"]');
    if (nameElement && typesElement) {
      const name = nameElement.textContent?.toLowerCase() || '';
      const types = typesElement.textContent?.toLowerCase() || '';
      const isMatch = name.includes(lowerSearchText) || types.includes(lowerSearchText);
      item.style.display = isMatch ? 'block' : 'none';
    }
  });
}

window.Webflow = window.Webflow || [];
window.Webflow.push(async () => {
  const itemTemplate = document.querySelector<HTMLAnchorElement>('[data-element="pokemon-item"]');
  if (!itemTemplate) return;

  const itemList = itemTemplate.parentElement!;
  const searchInput = document.querySelector<HTMLInputElement>('[data-element="pokemon-search"]');

  itemTemplate.remove();

  const pokemonItems = [];

  // Auto-generate Pokémon data
  for (let id = 1; id <= numberOfPokemons; id++) {
    // Fetch Pokemon details from the API
    const pokemonDetails = await fetchPokemonData(id);

    // Use the fetched data to create the item
    const item = cloneNode(itemTemplate);
    const imageElement = item.querySelector<HTMLImageElement>('[data-element="pokemon-image"]');
    const typesElement = item.querySelector<HTMLDivElement>('[data-element="pokemon-types"]');
    const nameElement = item.querySelector<HTMLDivElement>('[data-element="pokemon-name"]');

    if (imageElement) {
      // Use the front_default sprite URL
      imageElement.src = pokemonDetails.sprites.front_default;
    }

    if (typesElement) {
      // Display Pokémon types in sentence case
      const types = pokemonDetails.types.map((type: any) => toSentenceCase(type.type.name));
      typesElement.textContent = types.join(', ');
    }

    if (nameElement) {
      // Display Pokémon name in sentence case
      nameElement.textContent = toSentenceCase(pokemonDetails.name);
    }

    item.removeAttribute('data-cloack');

    pokemonItems.push(item);
  }

  console.log(pokemonItems);

  itemList.append(...pokemonItems);

  // Add event listener to the search input
  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      const searchText = (event.target as HTMLInputElement).value;
      filterPokemonItems(searchText, pokemonItems);
    });
  }
});