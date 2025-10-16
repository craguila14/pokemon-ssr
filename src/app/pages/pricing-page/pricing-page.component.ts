import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing-page',
  imports: [],
  templateUrl: './pricing-page.component.html'
})
export default class PricingPageComponent implements OnInit {

    private title = inject(Title)
    private meta = inject(Meta)
    private platform = inject(PLATFORM_ID)

    ngOnInit(): void {

      // console.log(this.platform)

      // if(isPlatformBrowser(this.platform)){
      //   document.title = 'Pricing page'
      // }

      // document.title = 'pricing page'

      this.title.setTitle('Pricing page')
      this.meta.updateTag({name: 'pricing', content: 'Este es mi pricing page'})
      this.meta.updateTag({name: 'og:title', content: 'About page'})
      this.meta.updateTag({name: 'keywords', content: 'Hola, Mundo, Cony, Curso, Angular, PRO'})
    }

}
