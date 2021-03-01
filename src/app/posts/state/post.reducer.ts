import { createReducer, on } from "@ngrx/store"
import { addPost, deletePost, updatePost } from "./post.actions"
import { initialState } from "./post.state"

const _postReducer = createReducer(
    initialState,
    on(addPost, (state, action) => {
        let newPost = { ...action.post }
        newPost.id = state.posts.length + 1
        return {
            ...state,
            posts: [...state.posts, newPost]
        }
    }),
    on(updatePost, (state, action) => {
        let updatedPost = state.posts.map((post) => {
            return post.id == action.post.id ? action.post : post
        })
        return {
            ...state,
            posts: updatedPost
        }
    }),
    on(deletePost, (state, action) => {
        let updatedPost = state.posts.filter((post) => post.id != action.id);
        return {
            ...state,
            posts: updatedPost
        }
    })
)

export function postReducer(state, action) {
    return _postReducer(state, action)
}