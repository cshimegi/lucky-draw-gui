import React, { Component } from 'react';
import Timer from '@app/timer/timer';
import TimerButton from '@app/timer/button';
import Form from 'react-bootstrap/Form';
import RepoService from '@service/repo';
import ListGroup from 'react-bootstrap/ListGroup';

interface IState {
    timerTime: number,
    isLoaded: boolean,
    items: any,
    error: any
}
export default class Home extends Component<{}, IState> {
    refs: any;
    isMounted: boolean = false;

    constructor(props)
    {
        super(props);
        
        this.refs = React.createRef();
        this.state = {
            timerTime: 0,
            isLoaded: false,
            items: [],
            error: null
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.drawLuckyPeople = this.drawLuckyPeople.bind(this);
    }

    componentDidMount (): void
    {
        RepoService
            .getAll('attendee')
            .then(
                (results) => {
                    if (this.isMounted) {
                        this.setState({
                            isLoaded: true,
                            items: results
                        });
                    }
                },
                (error) => {
                    if (this.isMounted) {
                        this.setState({
                            isLoaded: true,
                            error: error
                        });
                    }
                }
            )
    }

    componentWillUnmount (): void
    {
        this.isMounted = false;
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
        const items = this.state.items.map((item) => {
            item.name = unescape(item.name);
            item.email = unescape(item.email);
            item.phone = unescape(item.phone);
            
            return item;
        });
        const attendeeNums = this.state.items.length;

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
                        <div className="col-md-6 order-md-2 mb-4">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">Current Attendee</span>
                                <span className="badge badge-secondary badge-pill">
                                    {attendeeNums}
                                </span>
                            </h4>
                            <ul className="list-group attendee-list shadow">
                            {
                                items.map((value, index) => {
                                    return <ListGroup className="attendee-list-item"
                                                      key={index}
                                                      horizontal>
                                                <ListGroup.Item>{value.id}</ListGroup.Item>
                                                <ListGroup.Item>{value.name}</ListGroup.Item>
                                                <ListGroup.Item>{value.phone}</ListGroup.Item>
                                           </ListGroup>
                                })
                            }
                            </ul>
                        </div>
                    </div>
                </main>
            </>
        )
    }
}