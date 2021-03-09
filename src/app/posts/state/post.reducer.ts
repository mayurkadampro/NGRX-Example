import { createReducer, on } from "@ngrx/store"
import { addPostSuccess, deletePost, deletePostSuccess, loadPostsSuccess, updatePost, updatePostSuccess } from "./post.actions"
import { initialState, postsAdapter } from "./post.state"

const _postReducer = createReducer(
    initialState,
    on(addPostSuccess, (state, action) => {
        return postsAdapter.addOne(action.post, state);
    }),
    on(updatePostSuccess, (state, action) => {
        return postsAdapter.updateOne(action.post, {
            ...state,
            count: state.count + 1,
        });
    }),
    on(deletePostSuccess, (state, { id }) => {
        return postsAdapter.removeOne(id, state);
    }),
    on(loadPostsSuccess, (state, action) => {
        return postsAdapter.setAll(action.posts, {
            ...state,
            count: state.count + 1,
        });
    })
)

export function postReducer(state, action) {
    return _postReducer(state, action)
}