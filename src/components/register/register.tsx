import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import RepoService from '@service/repo';

interface IProps {
    callback: Function
}

interface IState {
    name: string,
    email: string,
    phone: string
}

export default class RegisterForm extends Component<IProps, IState> {
    isFormValid: boolean;

    constructor (props)
    {
        super(props);

        this.isFormValid = false;
        this.state = {
            name: '',
            email: '',
            phone: ''
        }
    }

    setField (field, value): void
    {
        let tmp = {};
        tmp[field] = value;
        
        this.setState(tmp);
    }

    validateForm (): boolean
    {
        return this.state.name.length > 0 &&
            this.state.email.length > 0 &&
            this.state.phone.length > 0;
    }

    onSubmit (event): void
    {
        event.preventDefault();

        this.isFormValid = this.validateForm();

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
                    this.props.callback.apply(null, []);
                },
                (error) => {
                    console.error(error);
                }
            );
    }

    render () {
        return (
            <>
                <div className="col-md-6 order-md-1">
                    <h4 className="mb-3">
                        Please Join Here
                    </h4>
                    <Form name="registerForm"
                          onSubmit={this.onSubmit.bind(this)}>
                        <div className="mb-3">
                            <Form.Group controlId="registerForm.ctrlName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text"
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
                                              required
                                              placeholder="xxxx-xxx-xxx or (xx)-xxxx-xxxx"
                                              isInvalid={!this.state.phone}
                                              onChange={e => this.setField('phone', e.target.value)} />
                            </Form.Group>
                        </div>
                        <Button variant="secondary float-right"
                                className="btn-cancel">Cancel</Button>
                        <Button variant="primary float-right"
                                className="btn-register"
                                type="submit">Send</Button>
                    </Form>
                </div>
            </>
        )
    }
}