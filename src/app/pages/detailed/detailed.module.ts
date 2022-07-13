import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailedComponent } from './detailed.component';

const routes: Routes = [
    {
      path: ':userId',
      component: DetailedComponent,
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  declarations: [DetailedComponent],
  exports: [DetailedComponent],
})
export class DetailedModule {}
