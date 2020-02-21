import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome.component';

const welcomeRoutes: Routes = [
  { path: '', component: WelcomeComponent }
];

@NgModule({
  declarations: [WelcomeComponent],
  imports: [RouterModule.forChild(welcomeRoutes)],
  exports: [WelcomeComponent]
})
export class WelcomeModule {}
