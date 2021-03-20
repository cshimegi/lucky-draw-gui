import Utils from '@service/utils';

/**
 * Set timer
 * 
 * @param state
 * @param {number} timerTime
 * @return
 */
 export function set (state, timerTime: number): any
 {
    state.time = timerTime;
    const time = state.time;
    const hours = Utils.timeToHours(time);
    const minutes = Utils.timeToMinutes(time);
    const seconds = Utils.timeToSeconds(time);

    return Object.assign({}, state, {
        hours: Utils.timeToText(hours),
        minutes: Utils.timeToText(minutes),
        seconds: Utils.timeToText(seconds),
        time: time
    });
 }

/**
 * Start timer
 * 
 * @param state
 * @param {number} intervalID
 * @return started state
 */
export function start (state, intervalID): any
{
    return Object.assign({}, state, {
        started: true,
        intervalID: intervalID
    });
}

/**
 * Stop timer
 *
 * @param state 
 * @return stopped state
 */
export function stop (state: any): any
{
    clearInterval(state.intervalID);

    return Object.assign({}, state, {
        started: false,
        intervalID: -1
    });
}

/**
 * Update timer
 * 
 * @param state timer's state
 * @return new status per second
 */
export function update (state: any): any
{
    const time = state.time - 1;
    const hours = Utils.timeToHours(time);
    const minutes = Utils.timeToMinutes(time);
    const seconds = Utils.timeToSeconds(time);

    return Object.assign({}, state, {
        hours: Utils.timeToText(hours),
        minutes: Utils.timeToText(minutes),
        seconds: Utils.timeToText(seconds),
        time: time
    });
}

/**
 * Reset timer
 * 
 * @return Timer's initial state
 */
export function reset (state: any): any
{
    return Object.assign({}, initialState(), {
        started: state.started,
        intervalID: state.intervalID
    });
}

/**
 * Timer's initial state
 * 
 * @return Timer's initial state
 */
export function initialState (): any
{
    return {
        hours: '00',
        minutes: '00',
        seconds: '00',
        time: 0,
        started: false,
        intervalID: -1
    };
}