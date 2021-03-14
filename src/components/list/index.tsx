import React, { Component } from 'react';


export default class List extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <>
                {/* <ul className="list-group">
                {
                    this.props.items.map((value, index) => {
                        return <li className="list-group-item"
                                   key={index}>{value.a}
                               </li>
                    })
                }
                </ul> */}
            </>
        )
    }
}