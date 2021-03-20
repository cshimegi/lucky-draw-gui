import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Utils from '@service/utils';

interface IProps {
    ref: any,
    timeUpCallback?: Function
}

interface IState {
    hours: string,
    minutes: string,
    seconds: string,
    time: number
}

export default class Timer extends Component<IProps, IState> {
    intervalTimer: NodeJS.Timeout;
    isMounted: boolean = true;

    constructor (props) {
        super(props);

        this.state = {
            hours: '00',
            minutes: '00',
            seconds: '00',
            time: 0
        };
    }

    start (): void
    {
        if (this.state.time > 0) {
            // it's meaningless to start timer if set time is 0
            this.intervalTimer = setInterval(() => this.update(), 1000);
        }
    }

    stop (): void
    {
        clearInterval(this.intervalTimer);
    }

    reset (): void
    {
        this.stop();
        this.setState({
            hours: '00',
            minutes: '00',
            seconds: '00',
            time: 0
        });
    }

    update (): void
    {
        // countdown
        const time = this.state.time - 1;
        
        if (time > 0) {
            if (this.isMounted) {
                // avoid memory leak when move to another page
                this.set(time);
            }
        } else {
            // time's up
            this.reset();

            if (Utils.isFunction(this.props.timeUpCallback)) {
                this.props.timeUpCallback.apply(null, []);
            }
        }
    }

    set (timerTime: number): void
    {
        const time = timerTime;
        const hours = Utils.timeToHours(time);
        const minutes = Utils.timeToMinutes(time);
        const seconds = Utils.timeToSeconds(time);

        this.setState({
            hours: Utils.timeToText(hours),
            minutes: Utils.timeToText(minutes),
            seconds: Utils.timeToText(seconds),
            time: time
        });
    }

    componentWillUnmount (): void
    {
        this.stop();
        this.isMounted = false;
    }

    render ()
    {
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='timer-number text-center' role='hour'>Hour</th>
                            <th className='timer-number text-center' role='minute'>Minute</th>
                            <th className='timer-number text-center' role='second'>Second</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-center">
                                <h3>{this.state.hours}</h3>
                            </td>
                            <td className="text-center">
                                <h3>{this.state.minutes}</h3>
                            </td>
                            <td className="text-center">
                                <h3>{this.state.seconds}</h3>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}