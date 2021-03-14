import React, { Component } from 'react';
import List from '@app/list';

export default class Home extends Component {
    render () {
        return (
            <>
                <main role="main" className="container">
                    <div>
                        home works
                        <List {...this.props}></List>
                    </div>
                </main>
            </>
        )
    }
}