import { createReducer, on } from "@ngrx/store"
import { addPostSuccess, deletePost, deletePostSuccess, loadPostsSuccess, updatePost, updatePostSuccess } from "./post.actions"
import { initialState } from "./post.state"

const _postReducer = createReducer(
    initialState,
    on(addPostSuccess, (state, action) => {
        let post = { ...action.post };
        return {
            ...state,
            posts: [...state.posts, post],
        };
    }),
    on(updatePostSuccess, (state, action) => {
        let updatedPost = state.posts.map((post) => {
            return post.id == action.post.id ? action.post : post
        })
        return {
            ...state,
            posts: updatedPost
        }
    }),
    on(deletePostSuccess, (state, { id }) => {
        const updatedPosts = state.posts.filter((post) => {
            return post.id !== id;
        });

        return {
            ...state,
            posts: updatedPosts,
        };
    }),
    on(loadPostsSuccess, (state, action) => {
        return {
            ...state,
            posts: action.posts,
        };
    })
)

export function postReducer(state, action) {
    return _postReducer(state, action)
}