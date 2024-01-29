"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // node_modules/.pnpm/@finsweet+ts-utils@0.40.0/node_modules/@finsweet/ts-utils/dist/helpers/cloneNode.js
  var cloneNode = (node, deep = true) => node.cloneNode(deep);

  // src/index.ts
  var apiUrl = "https://pokeapi.co/api/v2/pokemon";
  var numberOfPokemons = 1025;
  function toSentenceCase(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  async function fetchPokemonData(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const data = await response.json();
    return data;
  }
  function filterPokemonItems(searchText, items) {
    const lowerSearchText = searchText.toLowerCase();
    items.forEach((item) => {
      const nameElement = item.querySelector('[data-element="pokemon-name"]');
      const typesElement = item.querySelector('[data-element="pokemon-types"]');
      if (nameElement && typesElement) {
        const name = nameElement.textContent?.toLowerCase() || "";
        const types = typesElement.textContent?.toLowerCase() || "";
        const isMatch = name.includes(lowerSearchText) || types.includes(lowerSearchText);
        item.style.display = isMatch ? "block" : "none";
      }
    });
  }
  window.Webflow = window.Webflow || [];
  window.Webflow.push(async () => {
    const itemTemplate = document.querySelector('[data-element="pokemon-item"]');
    if (!itemTemplate)
      return;
    const itemList = itemTemplate.parentElement;
    const searchInput = document.querySelector('[data-element="pokemon-search"]');
    itemTemplate.remove();
    const pokemonItems = [];
    for (let id = 1; id <= numberOfPokemons; id++) {
      const pokemonDetails = await fetchPokemonData(id);
      const item = cloneNode(itemTemplate);
      const imageElement = item.querySelector('[data-element="pokemon-image"]');
      const typesElement = item.querySelector('[data-element="pokemon-types"]');
      const nameElement = item.querySelector('[data-element="pokemon-name"]');
      if (imageElement) {
        imageElement.src = pokemonDetails.sprites.front_default;
      }
      if (typesElement) {
        const types = pokemonDetails.types.map((type) => toSentenceCase(type.type.name));
        typesElement.textContent = types.join(", ");
      }
      if (nameElement) {
        nameElement.textContent = toSentenceCase(pokemonDetails.name);
      }
      item.removeAttribute("data-cloack");
      pokemonItems.push(item);
    }
    console.log(pokemonItems);
    itemList.append(...pokemonItems);
    if (searchInput) {
      searchInput.addEventListener("input", (event) => {
        const searchText = event.target.value;
        filterPokemonItems(searchText, pokemonItems);
      });
    }
  });
})();
//# sourceMappingURL=index.js.map
