import { ApplicationRef, Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonsListComponent } from "../../pokemons/components/pokemons-list/pokemons-list.component";
import { PokemonsListSkeletonComponent } from "./pokemons-list-skeleton/pokemons-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop'
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'pokemons-page',
  imports: [PokemonsListComponent, PokemonsListSkeletonComponent, RouterLink],
  templateUrl: './pokemons-page.component.html'
})
export default class PokemonsPageComponent {

  private pokemonService = inject(PokemonsService)
  public pokemons = signal<SimplePokemon[]>([])

  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private title = inject(Title)

  //se usa toSignal porque route es un observable, enntonces lo transforma en señal

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map((params) =>
        params['page'] ?? '1'),
      map(page => (isNaN(+page) ? 1 : +page)),
      map(page => Math.max(1, page))
    )
  )

  public loadOnPageChange = effect(() => {
    this.loadPokemons(this.currentPage())
  }, {
    allowSignalWrites: true
  })



  // public isLoading = signal(true)

  // private appRef = inject(ApplicationRef)
  // private $appState = this.appRef.isStable.subscribe(isStable => {
  //   console.log({isStable})
  // })

  // ngOnInit(): void {
  //   this.loadPokemons()
  //   // console.log(this.currentPage())
  //   // setTimeout(() => {
  //   //   this.isLoading.set(false)
  //   // }, 3000)
  // }

  public loadPokemons(page = 0) {

    this.pokemonService.loadPage(page)
      .pipe(
        // tap(() => this.router.navigate([], {queryParams: {page: pageToLoad}}) ),
        tap(() => this.title.setTitle(`Pókemons SSR - Page ${page}`))
      )
      .subscribe(pokemons =>{
        this.pokemons.set(pokemons)
      })
  }

  // ngOnDestroy(): void {
  //   console.log('destroy')
  //   this.$appState.unsubscribe()
  // }

}
