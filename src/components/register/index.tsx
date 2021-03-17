import React, { Component } from 'react';
import RegisterFrom from './register';
import RepoService from '@service/repo';


export default class List extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: false,
            items: [],
            error: null
        };
    }

    componentDidMount() {
        RepoService
            .getAll('attendee')
            .then(
                (result) => {
                    console.log('this.attendeeRepo', result)
                    // this.setState({
                    //     isLoaded: true,
                    //     items: result
                    // });
                },
                (error) => {
                    console.error(error)
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
      }

    render () {
        const items = new Array(15);
        items.fill(10);
        const attendeeNums = items.length;

        return (
            <>
                <main className="container">
                    <div className="py-5 text-center">
                        <p className="lead">
                            If you want to test your luck, please register here. It's your big chance to make your dream come true.
                        </p>
                    </div>
                    <div className="row">
                        <RegisterFrom></RegisterFrom>
                        <div className="col-md-4 order-md-2 mb-4">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">Attendee</span>
                                <span className="badge badge-secondary badge-pill">
                                    {attendeeNums}
                                </span>
                            </h4>
                            <ul className="list-group attendee-list shadow">
                            {
                                items.map((value, index) => {
                                    return <li className="list-group-item attendee"
                                            key={index}>{value}
                                        </li>
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