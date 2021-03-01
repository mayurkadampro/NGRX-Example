import { counterReducer } from "../counter/state/counter.reducer";
import { initialStateInterface } from "../counter/state/counter.state";
import { postReducer } from "../posts/state/post.reducer";
import { postsState } from "../posts/state/post.state";

export interface AppState {
    counterState: initialStateInterface,
    postState: postsState
}

export const AppReducer = {
    counter: counterReducer,
    posts: postReducer
}