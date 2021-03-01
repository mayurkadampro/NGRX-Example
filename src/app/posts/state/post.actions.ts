import { createAction, props } from "@ngrx/store";
import { Post } from "../model/post.model";

const ADD_POST_ACTION = '[posts page] add post';
const UPDATE_POST_ACTION = '[posts page] update post';
const DELETE_POST_ACTION = '[posts page] delete post';

export const addPost = createAction(ADD_POST_ACTION, props<{ post: Post }>());

export const updatePost = createAction(UPDATE_POST_ACTION, props<{ post: Post }>());

export const deletePost = createAction(DELETE_POST_ACTION, props<{ id: number }>());
