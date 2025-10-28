import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonsListComponent } from './pokemons-list.component';
import { SimplePokemon } from '../../interfaces';
import { provideRouter } from '@angular/router';

const mockPokemons: SimplePokemon[] = [
  {id: '1', name: 'bulbasaur'},
  {id: '2', name: 'ivysaur'}
]

describe('PokemonsListComponent', () => {

  let fixture: ComponentFixture <PokemonsListComponent>;
  let compiled: HTMLElement;
  let component: PokemonsListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonsListComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonsListComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

  });

  it('should create the app', () => {
    fixture.componentRef.setInput('pokemons', [])

    fixture.detectChanges()

    expect(component).toBeTruthy();
  });

  it('should render "no hay pokemons"', () => {
    fixture.componentRef.setInput('pokemons', []);

    fixture.detectChanges();
    expect(compiled.querySelector('div')?.textContent).toContain('No hay pokemones')

  });

  it('should render pokemon list with 2 pokemons card', () => {
    fixture.componentRef.setInput('pokemons', mockPokemons);

    fixture.detectChanges();
    expect(compiled.querySelectorAll('pokemons-card').length).toBe(2)

  });



});
