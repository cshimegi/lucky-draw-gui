import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            phone: ''
        };
    }

    setField (field, value) {
        let tmp = {};
        tmp[field] = value;

        this.setState(tmp);
    }

    onSubmit (event) {
        event.preventDefault();
        console.log(this.state)
    }

    render () {
        return (
            <>
                <div className="col-md-8 order-md-1">
                    <h4 className="mb-3">
                        Please register here
                    </h4>
                    <Form name="registerForm"
                          onSubmit={this.onSubmit.bind(this)}>
                        <div className="mb-3">
                            <Form.Group controlId="registerForm.ctrlName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text"
                                              placeholder="Your name"
                                              onChange={e => this.setField('name', e.target.value)}/>
                            </Form.Group>
                        </div>
                        <div className="mb-3">
                            <Form.Group controlId="registerForm.ctrlEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email"
                                              placeholder="example@example.domain"
                                              onChange={e => this.setField('email', e.target.value)} />
                            </Form.Group>
                        </div>
                        <div className="mb-3">
                            <Form.Group controlId="registerForm.ctrlPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text"
                                              placeholder="xxxx-xxx-xxx or (xx)-xxxx-xxxx"
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