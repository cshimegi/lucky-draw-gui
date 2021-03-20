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
    error: any,
    modal: any,
    noStartMessage: string
}
export default class Home extends Component<{}, IState> {
    refs: any;
    isMounted: boolean = true;

    constructor(props)
    {
        super(props);
        
        this.refs = React.createRef();
        this.state = {
            timerTime: 0,
            isLoaded: false,
            items: [],
            error: null,
            modal: {
                title: 'Our lucky man is almost there...',
                luckyPerson: ''
            },
            noStartMessage: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.drawLuckyPerson = this.drawLuckyPerson.bind(this);
        this.startTimer = this.startTimer.bind(this);
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

    startTimer (): void
    {
        if (this.state.timerTime === 0) {
            const newState = {
                modal: {
                    title: 'Information',
                    luckyPerson: ''
                },
                noStartMessage: 'Please set timer first!'
            };

            this.setState(newState, this.showStartErrorMessage);
        } else if (this.state.items.length !== 0) {
            // since no any attendee
            this.refs.timer.start();
        } else {
            const newState = {
                modal: {
                    title: 'Information',
                    luckyPerson: ''
                },
                noStartMessage: 'Please register to join lucky draw first!'
            };

            this.setState(newState, this.showStartErrorMessage);
        }
    }

    onSubmit (): void
    {
        this.refs.timer.set(this.state.timerTime);
        this.setState({
            timerTime: 0
        });
    }

    drawLuckyPerson (): void
    {
        this.openModal();
        const allAttendeeIds = this.state.items.map(item => item.id);

        // intend to make audience wait for a while
        // to make the result look like more reliable and not prearranged
        setTimeout(() => {
            const maxNums = allAttendeeIds.length - 1; // array index starts from 0
            const luckyNumber = Math.floor(Math.random() * maxNums);
            const luckyPerson = this.state.items.find(item => item.id === allAttendeeIds[luckyNumber]);
            this.setModalData(luckyPerson);
        }, 10000);
    }

    setModalData (luckyPerson: any): void
    {
        this.setState({modal: {
            title: 'Congradulate! Our lucky man~',
            luckyPerson: luckyPerson
        }}, this.showResults);
    }

    openModal (): void
    {
        let element = document.getElementById("result-modal");
        element.style.display = 'block';

        element.classList.add('show');
    }

    closeModal (): void
    {
        let element = document.getElementById("result-modal");
        element.style.display = 'none';

        element.classList.remove('show');
    }

    showResults (): void
    {
        let spinner = document.getElementById('waiting');
        spinner.classList.remove('show');
        spinner.classList.add('hide');

        let noAttendee = document.getElementById('no-start');
        noAttendee.classList.remove('show');
        noAttendee.classList.add('hide');

        let element = document.getElementById('result');
        element.classList.remove('hide');
        element.classList.add('show');
    }

    showStartErrorMessage (): void
    {
        let spinner = document.getElementById('waiting');
        spinner.classList.remove('show');
        spinner.classList.add('hide');

        let noAttendee = document.getElementById('no-start');
        noAttendee.classList.remove('hide');
        noAttendee.classList.add('show');

        let element = document.getElementById('result');
        element.classList.remove('show');
        element.classList.add('hide');

        this.openModal();
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
                                <Timer ref='timer' timeUpCallback={this.drawLuckyPerson}/>
                                <div className='timer-button-container'>
                                    <TimerButton text={'RESET'} handleClick={() => this.refs.timer.reset()} />
                                    <TimerButton text={'STOP'} handleClick={() => this.refs.timer.stop()} />
                                    <TimerButton text={'START'} handleClick={() => this.startTimer()} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 order-md-2 attendee-list-container">
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
                    <div className="row result-modal__container">
                        <div className="modal fade" id="result-modal">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title"
                                            id="result-modal__label">{this.state.modal.title}</h5>
                                        <button type="button"
                                                className="close"
                                                data-dismiss="modal"
                                                aria-label="Close"
                                                onClick={this.closeModal}>
                                            <span>&times;</span>
                                        </button>
                                    </div>
                                    <div id="result" className="modal-body result-body hide">
                                        <div className="lucky-person-contact">
                                            <div className="col-md-12">
                                                <div className="col-md-5">
                                                    <label htmlFor="result-name">Lucky Name:</label>
                                                </div>
                                                <div className="col-md-7">
                                                    <span id="result-name">
                                                        {this.state.modal.luckyPerson.name}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="col-md-5">
                                                    <label htmlFor="result-email">Email:</label>
                                                </div>
                                                <div className="col-md-7">
                                                    <span id="result-email">
                                                        {this.state.modal.luckyPerson.email}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="col-md-5">
                                                    <label htmlFor="result-phone">Phone:</label>
                                                </div>
                                                <div className="col-md-7">
                                                    <span id="result-phone">
                                                        {this.state.modal.luckyPerson.phone}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="result-message">
                                            <p className="highlight red">
                                                Please contact out staff to get your prize.
                                            </p>
                                            Wish you have a nice day~~!
                                        </div>
                                    </div>
                                    <div id="waiting" className="modal-body waiting-body show text-center">
                                        <button className="btn btn-primary"
                                                type="button"
                                                disabled>
                                            <span className="spinner-grow spinner-grow-sm"
                                                role="status"></span>
                                            Loading...
                                        </button>
                                    </div>
                                    <div id="no-start" className="modal-body no-start-body hide text-center">
                                        {this.state.noStartMessage}
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button"
                                                className="btn btn-secondary"
                                                data-dismiss="modal"
                                                onClick={this.closeModal}>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        )
    }
}