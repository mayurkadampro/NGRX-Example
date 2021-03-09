import { Post } from "../model/post.model";

export interface PostsState {
  posts: Post[];
}

export const initialState: PostsState = {
  posts: null,
};