import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import './App.css';

import Users from './components/Users.js';
import Signin from './components/Signin.js';
import SignUp from './components/SignUp.js';

class App extends Component {

  logout = ev => {
    ev.preventDefault();
    console.log('logout logged');
    localStorage.removeItem('jwt');
    window.location.reload();
  }

  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <NavLink to="/signup">SignUp</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/signin">Signin</NavLink>
            &nbsp;|&nbsp;
						<NavLink to="/users">Users</NavLink>
            <button onClick={this.logout}>Logout</button>
          </nav>
        </header>
        <div className='main'>
          <Route path="/signup" render={props => (<SignUp {...props} />)} />
          <Route path="/signin" render={props => (<Signin {...props} />)} />
          <Route path="/users" component={Users} />
        </div>
      </div>
    );
  }
}

export default App;
