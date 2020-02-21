import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { CopyrightComponent } from './copyright/copyright.component';

@NgModule({
  declarations: [CopyrightComponent],
  imports: [BrowserModule],
  // Tell Angular it needs to compile our component in to a component factory
  entryComponents: [CopyrightComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    // Convert our Angular component in to a web component
    const copyright = createCustomElement(CopyrightComponent, {
      injector
    });
    // Add our component to the browser's list of custom elements
    customElements.define('app-copyright', copyright);
  }
  // A module that is bootstrapped must define either a bootstrap property or
  // an ngDoBootstrap method. Since this module is just here as a container,
  // we just use this empty ngDoBootstrap
  ngDoBootstrap() {}
}
