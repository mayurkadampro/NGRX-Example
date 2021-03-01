import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostlistComponent } from './postlist/postlist.component';

const routes: Routes = [
  {
    path: '', component: PostlistComponent,
    children: [
        { path: "", component: AddPostComponent },
        { path: "edit/:id", component: EditPostComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
