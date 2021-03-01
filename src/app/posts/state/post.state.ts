import { Post } from '../model/post.model'

export interface postsState {
    posts: Post[]
}

export const initialState: postsState = {
    posts: [
        {
            id: 1,
            title: "Sample State 1",
            description: "Description Sample State 1"
        },
        {
            id: 2,
            title: "Sample State 2",
            description: "Description Sample State 2"
        }
    ]
}