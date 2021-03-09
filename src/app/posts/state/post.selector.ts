import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "src/app/store/router/custom-serializer";
import { getCurrentRoute } from "src/app/store/router/router.selector";
import { postsAdapter, PostsState } from "./post.state";

export const POST_STATE_NAME = "posts";

export const postsSelectors = postsAdapter.getSelectors();

const getPostState = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const getPosts = createSelector(getPostState, postsSelectors.selectAll);

export const getPostEntities = createSelector(
    getPostState,
    postsSelectors.selectEntities
);

export const getPostById = createSelector(getPostEntities, getCurrentRoute, (posts, route: RouterStateUrl) => {
    return posts ? posts[route.params['id']] : null;
})

export const getCount = createSelector(getPostState, (state) => state.count);

