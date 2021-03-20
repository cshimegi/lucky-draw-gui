import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import RepoService from '@service/repo';

interface IState {
    name: string,
    email: string,
    phone: string
}
export default class List extends Component<{}, IState> {
    isFormValid: boolean = false;

    constructor (props)
    {
        super(props);

        this.state = {
            name: '',
            email: '',
            phone: ''
        }
    }

    componentDidMount (): void
    {
        this.changeSubmitButtonStatus();
    }

    setField (field: string, value: string): void
    {
        let tmp = {};
        tmp[field] = value;
        
        this.setState(tmp, this.validateForm);
    }

    validateForm (): void
    {
        const isValid = this.state.name.length > 0 &&
            this.state.email.length > 0 &&
            this.state.phone.length > 0;
        
        this.isFormValid = isValid;
        
        this.changeSubmitButtonStatus();
    }

    changeSubmitButtonStatus (): void
    {
        let element = document.getElementById('btn-register');
        
        if (this.isFormValid) {
            element.classList.remove('disabled');
        } else {
            element.classList.add('disabled');
        }
    }

    clearForm (): void
    {
        this.setState({
            name: '',
            email: '',
            phone: ''
        }, this.validateForm);
    }

    onSubmit (event): void
    {
        event.preventDefault();
        
        if (!this.isFormValid) {
            return;
        }

        const params = {
            name: escape(this.state.name),
            email: escape(this.state.email),
            phone: escape(this.state.phone)
        };

        RepoService.post('attendee', params)
            .then(
                (result) => {
                    console.log(result.json());
                },
                (error) => {
                    console.error(error);
                }
            );
    }

    render () {
        return (
            <>
                <main className="container">
                    <div className="py-5 text-center">
                        <p className="lead">
                            If you want to test your luck, welcome to join us now. It's your big chance to make your dream come true.
                        </p>
                    </div>
                    <div className="row">
                        <div className="col-md-6 order-md-1">
                            <h4 className="mb-3">
                                Please fill up the form here
                            </h4>
                            <Form name="registerForm"
                                onSubmit={this.onSubmit.bind(this)}>
                                <div className="mb-3">
                                    <Form.Group controlId="registerForm.ctrlName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text"
                                                    value={this.state.name}
                                                    required
                                                    placeholder="Your name"
                                                    isInvalid={!this.state.name}
                                                    onChange={e => this.setField('name', e.target.value)}/>
                                    </Form.Group>
                                </div>
                                <div className="mb-3">
                                    <Form.Group controlId="registerForm.ctrlEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email"
                                                    value={this.state.email}
                                                    required
                                                    placeholder="example@example.domain"
                                                    isInvalid={!this.state.email}
                                                    onChange={e => this.setField('email', e.target.value)} />
                                    </Form.Group>
                                </div>
                                <div className="mb-3">
                                    <Form.Group controlId="registerForm.ctrlPhone">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control type="text"
                                                    value={this.state.phone}
                                                    required
                                                    placeholder="xxxx-xxx-xxx or (xx)-xxxx-xxxx"
                                                    isInvalid={!this.state.phone}
                                                    onChange={e => this.setField('phone', e.target.value)} />
                                    </Form.Group>
                                </div>
                                <button className="btn btn-secondary btn-clear float-right"
                                        onClick={this.clearForm.bind(this)}>Clear</button>
                                <Button id="btn-register"
                                        variant="primary float-right"
                                        className="btn-register"
                                        type="submit">Send</Button>
                            </Form>
                        </div>
                        <div className="col-md-6 order-md-2 lucky-draw-poster-container">
                            <h4 className="mb-3 text-center poster-title">
                                11-th Lucky Draw Event
                            </h4>
                            <div className="poset-body">
                                Event image or message should be placed here.
                            </div>
                        </div>
                    </div>
                </main>
            </>
        )
    }
}