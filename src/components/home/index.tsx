import React, { Component } from 'react';
import Timer from '@app/timer/timer';
import TimerButton from '@app/timer/button';
import Form from 'react-bootstrap/Form';

interface IState {
    timerTime: number
}
export default class Home extends Component<{}, IState> {
    refs: any;

    constructor(props)
    {
        super(props);
        
        this.refs = React.createRef();
        this.state = {
            timerTime: 0
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.drawLuckyPeople = this.drawLuckyPeople.bind(this);
    }

    setTimerTime (timerTime: string): void
    {
        if (timerTime.match(/\d+/g)) {
            this.setState({
                timerTime: parseInt(timerTime)
            });
        }
    }

    onSubmit (): void
    {
        this.refs.timer.set(this.state.timerTime);
        this.setState({
            timerTime: 0
        });
    }

    drawLuckyPeople (): void
    {
        console.log('draw');
    }

    render ()
    {
        return (
            <>
                <main role="main" className="container">
                    <div className="row">
                        <div className="col-md-6 order-md-1">
                            <div className="timer-setting">
                                <h4 className="mb-3">
                                    Please set up timer here
                                </h4>
                                <Form name="form">
                                    <div className="mb-3">
                                        <Form.Group controlId="form.ctrlTimerTime">
                                            <Form.Label>Timer time (seconds)</Form.Label>
                                            <Form.Control type="number"
                                                required
                                                value={this.state.timerTime}
                                                placeholder="Set your timer here"
                                                onChange={e => this.setTimerTime(e.target.value)}/>
                                        </Form.Group>
                                    </div>
                                    <TimerButton text={'SET'} handleClick={this.onSubmit}/>
                                </Form>
                            </div>
                            <div className='center-container' style={{marginTop: '80px'}} >
                                <Timer ref='timer' timeUpCallback={this.drawLuckyPeople}/>
                                <div className='timer-button-container'>
                                    <TimerButton text={'RESET'} handleClick={() => this.refs.timer.reset()} />
                                    <TimerButton text={'STOP'} handleClick={() => this.refs.timer.stop()} />
                                    <TimerButton text={'START'} handleClick={() => this.refs.timer.start()} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 order-md-1">

                        </div>
                    </div>
                </main>
            </>
        )
    }
}