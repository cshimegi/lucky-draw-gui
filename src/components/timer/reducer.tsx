import * as timerModel from './model';

/**
 * Process timer's state transition of redux's reducer
 * 
 * @param state - state managed bu redux's storage
 * @param action 
 * @return new state by action
 */
export function timer (state = timerModel.initialState(), action)
{
    console.log(state);

    switch (action.type) {
        case 'START_TIMER':
            return timerModel.start(state, action.intervalID);
        case 'STOP_TIMER':
            return timerModel.stop(state);
        case 'UPDATE_TIMER':
            return timerModel.update(state);
        case 'RESET_TIMER':
            return timerModel.reset(state);
        case 'SET_TIMER':
            return timerModel.set(state, action.timerTime);
        default:
            return state;
    }
}