import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { FormComponent } from './components/to-do/form/form.component';
import { ListComponent } from './components/to-do/list/list.component';
import { ItemComponent } from './components/to-do/list/item/item.component';
import { ShowComponent } from './components/to-do/show/show.component';
import { HeaderComponent } from './components/sections/header/header.component';
import { FooterComponent } from './components/sections/footer/footer.component';

const appRoutes : Routes = [
  { path: '', component: IndexComponent },
  { path: 'todo_items/:id', component: ShowComponent },
  { path: 'add', component: FormComponent },
  { path: 'edit/:id', component: FormComponent }
  
]

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    FormComponent,
    ListComponent,
    ItemComponent,
    ShowComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
