import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HrFilesSearchComponent } from './hr-files/hr-files-search.component';
import { PayrollSearchComponent } from './payroll/payroll-search.component';
import { SearchBoxComponent } from './search/search-box.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBoxComponent,
    HrFilesSearchComponent,
    PayrollSearchComponent,
    WelcomeComponent
  ],
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
