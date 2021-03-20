
/**
 * Common useful methods helper
 */
const Utils = {
    timeToHours: (time: number) => {
        return Math.floor(time / 3600);
    },

    timeToMinutes: (time: number) => {
        return Math.floor(time / 60);
    },

    timeToSeconds: (time: number) => {
        return time % 60;
    },

    timeToText: (time: number) => {
        return ('00' + time).slice(-2);
    },

    isFunction: (func: any) => {
        return typeof func === 'function';
    }
};

export default Utils;