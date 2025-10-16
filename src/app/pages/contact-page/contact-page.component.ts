import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-page',
  imports: [],
  templateUrl: './contact-page.component.html'
})
export default class ContactPageComponent implements OnInit {

  private title = inject(Title)
  private meta = inject(Meta)

  ngOnInit(): void {
    this.title.setTitle('Contact page')
    this.meta.updateTag({name: 'contact', content: 'Este es mi contact page'})
    this.meta.updateTag({name: 'og:title', content: 'About page'})
    this.meta.updateTag({name: 'keywords', content: 'Hola, Mundo, Cony, Curso, Angular, PRO'})
  }

}
