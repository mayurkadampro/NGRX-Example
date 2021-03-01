import { createReducer, on } from "@ngrx/store"
import { ChangeChannelName, ChannelName, CustomIncrement, Decrement, Increment, Reset } from "./counter.actions";
import { initialState } from "./counter.state"

const _counterReducer = createReducer(
    initialState,
    on(Increment, (state) => {
        return {
            ...state,
            counter: state.counter + 1
        }
    }),
    on(Decrement, (state) => {
        return {
            ...state,
            counter: state.counter - 1
        }
    }),
    on(Reset, (state) => {
        return {
            ...state,
            counter: initialState.counter
        }
    }),
    on(CustomIncrement, (state, action) => {
        return {
            ...state,
            counter: state.counter + action.value
        }
    }),
    on(ChannelName, (state) => {
        return {
            ...state,
            channelName: state.channelName
        }
    }),
    on(ChangeChannelName, (state,action) => {
        return {
            ...state,
            channelName: action.value
        }
    })
);

export function counterReducer(state, action) {
    return _counterReducer(state, action)
}