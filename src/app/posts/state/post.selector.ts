import { createFeatureSelector, createSelector } from "@ngrx/store";
import { postsState } from "./post.state";

export const POST_STATE_NAME = "posts";

const getPostState = createFeatureSelector<postsState>(POST_STATE_NAME);

export const getPosts = createSelector(getPostState, (state) => {
    return state.posts;
})

export const getPostById = createSelector(getPostState, (state, props) => {
    return state.posts.find((post) => post.id === props.id);
})


