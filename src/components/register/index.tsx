import React, { Component } from 'react';
import RegisterForm from './register';
import RepoService from '@service/repo';
import ListGroup from 'react-bootstrap/ListGroup'

interface IState {
    isLoaded: boolean,
    items: any,
    error: any
};

export default class List extends Component<{}, IState> {
    isMounted: boolean = true;

    constructor (props)
    {
        super(props);
        
        this.state = {
            isLoaded: false,
            items: [],
            error: null
        };
    }

    componentDidMount (): void
    {
        this.getAllAttendee();
    }

    componentWillUnmount (): void
    {
        this.isMounted = false;
    }

    getAllAttendee (): void
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

    render () {
        const items = this.state.items.map((item) => {
            item.name = unescape(item.name);
            item.email = unescape(item.email);
            item.phone = unescape(item.phone);
            
            return item;
        });
        const attendeeNums = this.state.items.length;

        return (
            <>
                <main className="container">
                    <div className="py-5 text-center">
                        <p className="lead">
                            If you want to test your luck, please register here. It's your big chance to make your dream come true.
                        </p>
                    </div>
                    <div className="row">
                        <RegisterForm callback={this.getAllAttendee} />
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