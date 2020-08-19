import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'
import Topbar from './layout/topbar'
import Body from './layout/body'
import Footer from './layout/footer'
import GoogleMap from './component/GoogleMap'
import Sequence from './component/Sequence';
import Equation from './component/Equation';
import Cv from './component/Cv';
import LineBot from './component/LineBot';
import Home from './component/Home';
function App() {

    return (
        <Router>
            <Topbar />
            <Body>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/sequence" component={Sequence} />
                    <Route exact path="/equation" component={Equation} />
                    <Route exact path="/location" component={GoogleMap} />
                    <Route exact path="/cv" component={Cv} />
                    <Route exact path="/notify" component={LineBot} />
                </Switch>
            </Body>
            <Footer />
        </Router>
    );
}

export default App;
