"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // node_modules/.pnpm/@finsweet+ts-utils@0.40.0/node_modules/@finsweet/ts-utils/dist/helpers/cloneNode.js
  var cloneNode = (node, deep = true) => node.cloneNode(deep);

  // src/index.ts
  var apiUrl = "https://pokeapi.co/api/v2/pokemon";
  var numberOfPokemons = 99;
  async function fetchPokemonData(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const data = await response.json();
    return data;
  }
  window.Webflow = window.Webflow || [];
  window.Webflow.push(async () => {
    const itemTemplate = document.querySelector('[data-element="pokemon-item"]');
    if (!itemTemplate)
      return;
    const itemList = itemTemplate.parentElement;
    itemTemplate.remove();
    const pokemonItems = [];
    for (let id = 1; id <= numberOfPokemons; id++) {
      const pokemonDetails = await fetchPokemonData(id);
      const item = cloneNode(itemTemplate);
      const imageElement = item.querySelector('[data-element="pokemon-image"]');
      const idElement = item.querySelector('[data-element="pokemon-id"]');
      const nameElement = item.querySelector('[data-element="pokemon-name"]');
      if (imageElement) {
        imageElement.src = pokemonDetails.sprites.front_default;
      }
      if (idElement) {
        idElement.textContent = pokemonDetails.id.toString();
      }
      if (nameElement) {
        nameElement.textContent = pokemonDetails.name.toString();
      }
      item.removeAttribute("data-cloack");
      pokemonItems.push(item);
    }
    console.log(pokemonItems);
    itemList.append(...pokemonItems);
  });
})();
//# sourceMappingURL=index.js.map
