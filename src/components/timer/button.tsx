import React, { Component, MouseEventHandler } from 'react'
import Button from 'react-bootstrap/Button';

interface IProps {
    text: string;
    handleClick?: MouseEventHandler;
}


export default class TimerButton extends Component<IProps, {}> {
    render () {
        return (
            <Button className='timer-button float-right'
                    variant="primary"
                    type='button'
                    name='button'
                    onClick={this.props.handleClick}>
                {this.props.text}
            </Button>
        )
    }
}