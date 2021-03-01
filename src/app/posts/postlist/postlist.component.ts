import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Post } from '../model/post.model';
import { deletePost } from '../state/post.actions';
import { getPosts } from '../state/post.selector';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostlistComponent implements OnInit {
  posts$: Observable<Post[]>
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.posts$ = this.store.select(getPosts)
  }

  onDeletePost(id: number){
    if (confirm('Are you sure you want to delete')) {
      this.store.dispatch(deletePost({ id }));
    }
  }

}
