import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { PostlistComponent } from './postlist/postlist.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { postReducer } from './state/post.reducer';
import { POST_STATE_NAME } from './state/post.selector';

@NgModule({
  declarations: [
    PostlistComponent,
    AddPostComponent,
    EditPostComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PostRoutingModule,
    StoreModule.forFeature(POST_STATE_NAME, postReducer)
  ]
})
export class PostModule { }
