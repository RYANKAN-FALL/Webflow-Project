"use strict";(()=>{var r=(e,o=!0)=>e.cloneNode(o);var f=[{id:1,name:"Ditto",sprites:{other:{official_artwork:{front_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png"}}}},{id:2,name:"Pikachu",sprites:{other:{official_artwork:{front_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"}}}},{id:3,name:"Bulbasaur",sprites:{other:{official_artwork:{front_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"}}}}];window.Webflow=window.Webflow||[];window.Webflow.push(()=>{let e=document.querySelector('[data-element="pokemon-item"]');if(!e)return;let o=e.parentElement;e.remove();let m=f.map(({id:s,name:l,sprites:p})=>{let t=r(e),n=t.querySelector('[data-element="pokemon-image"]'),i=t.querySelector('[data-element="pokemon-id"]'),a=t.querySelector('[data-element="pokemon-name"]');return n&&(n.src=p.other.official_artwork.front_default),i&&(i.textContent=s.toString()),a&&(a.textContent=l.toString()),t.removeAttribute("data-cloack"),t});console.log(m),o.append(...m)});})();
