import { filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from './post.actions';
import { RouterNavigatedAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Update } from '@ngrx/entity';
import { Post } from '../model/post.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getPosts } from './post.selector';
import { of } from 'rxjs';
import { dummyAction } from 'src/app/auth/state/auth.actions';

@Injectable()
export class PostsEffects {
    constructor(
        private actions$: Actions,
        private postsService: PostService,
        private store: Store<AppState>) { }

    loadPosts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadPosts),
            withLatestFrom(this.store.select(getPosts)),
            mergeMap(([action, posts]) => {
                if (!posts.length || posts.length === 1) {
                    return this.postsService.getPosts().pipe(
                        map((posts) => {
                            return loadPostsSuccess({ posts });
                        })
                    );
                }
                of(dummyAction());
            })
        );
    });

    addPost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addPost),
            mergeMap((action) => {
                return this.postsService.addPost(action.post).pipe(
                    map((data) => {
                        const post = { ...action.post, id: data.name };
                        return addPostSuccess({ post });
                    })
                );
            })
        );
    });

    updatePost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updatePost),
            switchMap((action) => {
                return this.postsService.updatePost(action.post).pipe(
                    map((data) => {
                        const updatedPost: Update<Post> = {
                            id: action.post.id,
                            changes: {
                                ...action.post,
                            },
                        };
                        return updatePostSuccess({ post: updatedPost });
                    })
                );
            })
        );
    });

    deletePost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deletePost),
            switchMap((action) => {
                return this.postsService.deletePost(action.id).pipe(
                    map((data) => {
                        return deletePostSuccess({ id: action.id });
                    })
                );
            })
        );
    });

    getSinglePost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ROUTER_NAVIGATION),
            filter((r: RouterNavigatedAction) => {
                return r.payload.routerState.url.startsWith('/posts/details');
            }),
            map((r: RouterNavigatedAction) => {
                return r.payload.routerState['params']['id'];
            }),
            withLatestFrom(this.store.select(getPosts)),
            switchMap(([id, post]) => {
                if (!post.length) {
                    return this.postsService.getPostById(id).pipe(
                        map((post) => {
                            const postData = [{ ...post, id }];
                            return loadPostsSuccess({ posts: postData });
                        })
                    );
                }
                return of(dummyAction());
            })
        );
    });
}