import { ApplicationRef, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonsListComponent } from "../../pokemons/components/pokemons-list/pokemons-list.component";
import { PokemonsListSkeletonComponent } from "./pokemons-list-skeleton/pokemons-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop'
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'pokemons-page',
  imports: [PokemonsListComponent, PokemonsListSkeletonComponent],
  templateUrl: './pokemons-page.component.html'
})
export default class PokemonsPageComponent implements OnInit {

  private pokemonService = inject(PokemonsService)
  public pokemons = signal<SimplePokemon[]>([])

  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private title = inject(Title)

  //se usa toSignal porque route es un observable, enntonces lo transforma en señal

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map(params =>
        params.get('page') ?? '1'),
      map(page => (isNaN(+page) ? 1 : +page)),
      map(page => Math.max(1, page))
    )
  )



  // public isLoading = signal(true)

  // private appRef = inject(ApplicationRef)
  // private $appState = this.appRef.isStable.subscribe(isStable => {
  //   console.log({isStable})
  // })

  ngOnInit(): void {
    this.loadPokemons()
    // console.log(this.currentPage())
    // setTimeout(() => {
    //   this.isLoading.set(false)
    // }, 3000)
  }

  public loadPokemons(page = 0) {

    const pageToLoad = this.currentPage()! + page;

    this.pokemonService.loadPage(pageToLoad)
      .pipe(
        tap(() => this.router.navigate([], {queryParams: {page: pageToLoad}}) ),
        tap(() => this.title.setTitle(`Pókemons SSR - Page ${pageToLoad}`))
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
