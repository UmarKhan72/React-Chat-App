import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../Containers/Home';
import Chat from '../Containers/Chat';


class AppRouter extends Component {
    render() {
        return (
            <Router>
                <Route exact path='/' component={Home} />
                <Route exact path='/chat' component={Chat} />
            </Router>
        )
    }
}

export default AppRouter;