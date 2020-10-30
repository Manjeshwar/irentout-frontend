import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private title: Title, private meta: Meta) { }

  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  updateDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc })
  }

  updateOgUrl(url: string) {
    this.meta.updateTag({ name: 'og:url', content: url })
  }

  updateOgType(type: string) {
    this.meta.updateTag({ name: 'og:type', content: type })
  }

  updateOgTitle(title: string) {
    this.meta.updateTag({ name: 'og:title', content: title })
  }
  updateOgDescription(description: string) {
    this.meta.updateTag({ name: 'og:description', content: description })
  }
  updateOgImage(image: string) {
    this.meta.updateTag({ name: 'og:image', content: image })
  }
  

  
}
