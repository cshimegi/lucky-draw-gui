import React, { Component } from 'react';

export default class Footer extends Component {
    render () {
        return (
            <>
                <div className="app-footer">
                    <footer className="bg-light text-center text-lg-start">
                        <p className="mt-5 mb-3 text-muted copyright">
                            &copy; 2021-
                        </p>
                    </footer>
                </div>
            </>
        )
    }
}