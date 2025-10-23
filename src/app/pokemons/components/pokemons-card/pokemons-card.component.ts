import { Component, computed, effect, input } from '@angular/core';
import { SimplePokemon } from '../../interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pokemons-card',
  imports: [RouterLink],
  templateUrl: './pokemons-card.component.html'
})
export class PokemonsCardComponent {
  public pokemon = input.required<SimplePokemon>()

  public pokemonImage = computed(() => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`)

  // logEffect = effect(() => {
  //   console.log('Pokemon card', this.pokemon())
  // })


}
