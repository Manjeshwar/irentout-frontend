import { Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
// import { DemoComponent } from './demo/demo.component';
import { HomeComponent } from './home/home.component';

export const rootRouterConfig: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'abc',
  //   pathMatch: 'full'
  // },
  // {
  //   path: '',
  //   component: HomeComponent
  // },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'categories',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'Bangalore',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'Mumbai',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'Pune',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'Hyderabad',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'Bangalore',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      },
      {
        path: 'Mumbai',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      },
      {
        path: 'Pune',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      },
      {
        path: 'Hyderabad',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      },
      {
        path: 'blog',
        loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)
      }
    ]
  },
  {
    path: '**',
    // component: HomeComponent
    redirectTo: 'Bangalore/404',
    pathMatch: 'full'
  }
];

