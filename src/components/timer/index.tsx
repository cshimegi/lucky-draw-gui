import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { createStore } from 'redux';
import Home from '@app/home';
import { timer } from './reducer';

const store = createStore(timer);

render(
    <Provider store={store}>
        <Home />
    </Provider>,
    null
)