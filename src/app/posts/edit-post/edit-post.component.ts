import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Post } from '../model/post.model';
import { updatePost } from '../state/post.actions';
import { getPostById } from '../state/post.selector';
import { postsState } from '../state/post.state';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  post: Post;
  postForm: FormGroup;
  postSubscription: Subscription;
  constructor(
    private store: Store<postsState>,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.store.select(getPostById, { "id" : +id }).subscribe((post) => {
        if (post) {
          this.post = post;
          this.postForm.patchValue({
            title: post.title,
            description: post.description,
          });
          
        }
      });
    });
  }

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onSubmit() {
    if (!this.postForm.valid) {
      return;
    }

    const title = this.postForm.value.title;
    const description = this.postForm.value.description;

    const post: Post = {
      id: this.post.id,
      title,
      description,
    };

    //dispatch the action
    this.store.dispatch(updatePost({ post }));
    this.router.navigate(['posts']);
  }
}
