import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {TasksTableComponent} from './tasks-table/tasks-table.component';
import {HomePageComponent} from './home-page/home-page.component';
import {CreatePageComponent} from './create-page/create-page.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {AlertComponent} from './alert/alert.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TasksfilterPipe} from './shared/tasksfilter.pipe';
import {FilterComponent} from './filter/filter.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'create',
    component: CreatePageComponent
  },
  {
    path: 'edit/:id',
    component: EditPageComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TasksTableComponent,
    HomePageComponent,
    CreatePageComponent,
    EditPageComponent,
    AlertComponent,
    TasksfilterPipe,
    FilterComponent,
    TasksfilterPipe
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    RouterModule.forRoot(
      appRoutes
    ),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
