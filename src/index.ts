// index.ts
import { cloneNode } from '@finsweet/ts-utils';

import { greetUser } from '$utils/greet';

const pokemonsData = [
  {
    id: 1,
    name: 'Ditto',
    sprites: {
      other: {
        official_artwork: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png',
        },
      },
    },
  },
  {
    id: 2,
    name: 'Pikachu',
    sprites: {
      other: {
        official_artwork: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        },
      },
    },
  },
  {
    id: 3,
    name: 'Bulbasaur',
    sprites: {
      other: {
        official_artwork: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        },
      },
    },
  },
];

window.Webflow = window.Webflow || [];
window.Webflow.push(() => {
  const itemTemplate = document.querySelector<HTMLAnchorElement>('[data-element="pokemon-item"]');
  if (!itemTemplate) return;

  const itemList = itemTemplate.parentElement!;

  itemTemplate.remove();

  const pokemonItems = pokemonsData.map(({ id, name, sprites }) => {
    const item = cloneNode(itemTemplate);
    const imageElement = item.querySelector<HTMLImageElement>('[data-element="pokemon-image"]');
    const idElement = item.querySelector<HTMLDivElement>('[data-element="pokemon-id"]');
    const nameElement = item.querySelector<HTMLDivElement>('[data-element="pokemon-name"]');

    if (imageElement) {
      imageElement.src = sprites.other.official_artwork.front_default;
    }

    if (idElement) {
      idElement.textContent = id.toString();
    }

    if (nameElement) {
      nameElement.textContent = name.toString();
    }

    item.removeAttribute('data-cloack');

    return item;
  });

  console.log(pokemonItems);

  itemList.append(...pokemonItems);
});
