import { Component, input } from '@angular/core';
import { PokemonsCardComponent } from "../pokemons-card/pokemons-card.component";
import { SimplePokemon } from '../../interfaces';

@Component({
  selector: 'pokemons-list',
  imports: [PokemonsCardComponent],
  templateUrl: './pokemons-list.component.html'
})
export class PokemonsListComponent {

  public pokemons = input.required<SimplePokemon[]>()

}
