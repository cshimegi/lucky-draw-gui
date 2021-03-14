import React from 'react';
import Head from 'next/head';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Home from '@app/home';
import Register from '@app/register';
import Navbar from '@app/navbar';
import Footer from '@app/footer';

export default function LuckyDrawApp () {
    return (
        <div>
            <Head>
                <title>Lucky Draw</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BrowserRouter>
                <Navbar></Navbar>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/register" component={Register} />
                </Switch>
            </BrowserRouter>
            <Footer></Footer>
        </div>
    );
};