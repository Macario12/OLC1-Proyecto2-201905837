import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from '../app/components/editor/editor.component'

const routes: Routes = [
  {
    path: 'editor',
    component: EditorComponent,
  },
  {
    path: '',
    component: EditorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }