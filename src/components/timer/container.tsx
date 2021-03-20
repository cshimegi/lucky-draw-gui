import { connect } from 'react-redux';
import Home from '@app/home';
import * as action from './action';

/**
 * Send state managed by redux to react's component
 * 
 * @param state state managed by redux's store
 * @returns
 */
function mapStateToProps (state) {
    return state
}

/**
 * Combin user action by react with redux action
 * 
 * @param dispatch function to send action to redux's reducer
 * @param props
 * @returns
 */
function mapDispatchToProps (dispatch, props) {
    return {
        startTimer: () => {
            const intervalID = setInterval(() => dispatch(action.updateTimerAction()), 1000);

            dispatch(action.startTimerAction(intervalID));
        },
        stopTimer: () => dispatch(action.stopTimerAction()),
        resetTimer: () => dispatch(action.resetTimerAction()),
        setTimer: (timerTime: number) => dispatch(action.setTimerAction(timerTime))
    }
}

/**
 * 
 * @param stateProps 
 * @param dispatchProps 
 * @param ownProps 
 * @returns 
 */
function mergeProps (stateProps, dispatchProps, ownProps) {
    return Object.assign({}, stateProps, dispatchProps, ownProps, {
        // if timer stops, start count down
        startTimer: () => {
            if (!stateProps.started) dispatchProps.startTimer();
        }
    });
}

// Use defined methods and connect them with redux and react's component
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Home);