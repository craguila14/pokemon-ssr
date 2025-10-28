import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonsCardComponent } from './pokemons-card.component';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces';

const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'bulbasaur'
}

describe('PokemonsCardComponent', () => {

  let fixture: ComponentFixture<PokemonsCardComponent>;
  let compiled: HTMLElement;
  let component:PokemonsCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonsCardComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonsCardComponent);

    fixture.componentRef.setInput('pokemon', mockPokemon)

    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    fixture.detectChanges()
  });

  it('should create the app', () => {
    // console.log(compiled)

    expect(component).toBeTruthy();
  });

  it('should have the SimplePokemon signal inputValue', () => {
    //toEqual para evaluar objetos
    expect(component.pokemon()).toEqual(mockPokemon)

  });


  it('should render the pokemon name and image correctly', () => {
    const img = compiled.querySelector('img')!;
    const name = compiled.querySelector('h2')!;

    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`

    expect(img.src).toBe(imgUrl);
    expect((name.textContent ?? '').trim()).toBe(mockPokemon.name);

  });

  it('should have the proper ng-reflect-router-link', () => {

    const divWithLink = compiled.querySelector('div');

    expect(divWithLink?.attributes.getNamedItem('ng-reflect-router-link')?.value).toBe(`/pokemons,${mockPokemon.name}`)

  });

});
