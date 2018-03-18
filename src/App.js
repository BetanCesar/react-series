import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home/index'
import SerieDetail from './components/SerieDetail/index'

class App extends Component {

    render() {
        return (
            <div className="main">
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/serie/:id" component={SerieDetail} />
                        {/*<Route path="/serie/:serieId/actor/:id" component={} />*/}
                        <Redirect from='*' to='/' />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
