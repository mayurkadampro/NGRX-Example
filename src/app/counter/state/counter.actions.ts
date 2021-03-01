import { createAction, props } from "@ngrx/store";

export const Increment = createAction('increment');
export const Decrement = createAction('decrement');
export const Reset = createAction('reset');

export const CustomIncrement = createAction(
    'customIncrement',
    props<{ value: number }>()
);

export const ChannelName = createAction('channelName');

export const ChangeChannelName = createAction(
    'changeChannelName',
    props<{ value: string }>()
);