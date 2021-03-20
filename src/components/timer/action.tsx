
/**
 * 
 * @param intervalID id created by setInterval
 * @returns
 */
export function startTimerAction (intervalID)
{
    return {type: 'START_TIMER', intervalID: intervalID};
}

export function stopTimerAction ()
{
    return {type: 'STOP_TIMER'};
}

export function updateTimerAction ()
{
    return {type: 'UPDATE_TIMER'};
}

export function resetTimerAction ()
{
    return {type: 'RESET_TIMER'};
}

export function setTimerAction (timerTime: number)
{
    return {type: 'SET_TIMER', timerTime: timerTime};
}