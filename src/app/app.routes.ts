import { Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { DemoComponent } from './demo/demo.component';
import { HomeComponent } from './home/home.component';

export const rootRouterConfig: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'abc',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'pages',
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
    component: HomeComponent
  }
];

