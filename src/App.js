import React, {Component} from 'react';
import {Route,} from 'react-router-dom'

import Dashboard from './screen/Dashboard'
import Login from './screen/Login'

class App extends Component {
    render() {
        return ( <div className="App">
                <Route
                    path={'/'}
                    exact={true}
                    component={Login}/>
                <Route
                    path={'/dashboard'}
                    component={Dashboard}/>
            </div>
        );
    }
}

export default App;
