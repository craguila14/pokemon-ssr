import { TestBed } from '@angular/core/testing';
import { PokemonsService } from './pokemons.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { PokeAPIResponse, SimplePokemon } from '../interfaces';
import { Testability } from '@angular/core';
import { catchError } from 'rxjs';

const mockPokeApiResponse: PokeAPIResponse = {
    "count": 1328,
    "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
    "previous": null,
    "results": [
        {
            "name": "bulbasaur",
            "url": "https://pokeapi.co/api/v2/pokemon/1/"
        },
        {
            "name": "ivysaur",
            "url": "https://pokeapi.co/api/v2/pokemon/2/"
        }
      ]
}

const expectedPokemons: SimplePokemon[] = [
  {id: '1', name: 'bulbasaur'},
  {id: '2', name: 'ivysaur'}
]

const mockPokemon = {
  id: 1,
  name: 'bulbasaur'
}


describe('PokemonsService', () => {

  let service : PokemonsService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(PokemonsService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify()
  })

  it('should create the app', () => {
    expect(service).toBeTruthy()
  })

  it('should load a page of SimplePokemons', () => {

    service.loadPage(1).subscribe(pokemons => {
      expect(pokemons).toEqual(expectedPokemons)
    })

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`
    );

    expect(req.request.method).toBe('GET')
    req.flush(mockPokeApiResponse)

  });

    it('should load page 5 of SimplePokemond', () => {

    service.loadPage(5).subscribe(pokemons => {
      expect(pokemons).toEqual(expectedPokemons)
    })

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon?offset=80&limit=20`
    );

    expect(req.request.method).toBe('GET')
    req.flush(mockPokeApiResponse)

  });

    it('should load a pokemon by id', () => {

    const pokemonId = '1'

    service.loadPokemon(pokemonId).subscribe((pokemon: any) => {
      expect(pokemon).toEqual(mockPokemon)
    })

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`    );

    expect(req.request.method).toBe('GET')
    req.flush(mockPokemon)

  });

   it('should load a pokemon by name', () => {

    const pokemonName = 'bulbasaur'

    service.loadPokemon(pokemonName).subscribe((pokemon: any) => {
      expect(pokemon).toEqual(mockPokemon)
    })

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`    );

    expect(req.request.method).toBe('GET')
    req.flush(mockPokemon)

  });

   it('should catch error if pokemon not found', () => {

    const pokemonId = 'pokemon-no-existe'

    service.loadPokemon(pokemonId)
    .pipe(catchError(err =>  {
     expect(err.message).toContain('Pokemon not found')
      return[]
    }))
    .subscribe()

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`    );

    expect(req.request.method).toBe('GET')
    req.flush('Pokemon not found', {
      status: 404,
      statusText: 'Not found'
    })

  });



});


