import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'detailed',
        loadChildren: () =>
          import('./pages/detailed/detailed.module').then(
            (m) => m.DetailedModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    CommonModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
