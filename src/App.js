import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home/index'

class App extends Component {

    render() {
        return (
            <div className="main">
                <BrowserRouter>
                    <Route exact path="/" component={Home} />
                    {/*<Route path="/serie/:id" component={} />
                    <Route path="/serie/:serieId/actor/:id" component={} />*/}
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
