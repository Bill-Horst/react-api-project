import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

import Home from '../pages/Home';
import Categories from '../pages/Categories';
import SingleCategory from '../pages/SingleCategory';
import Cart from '../pages/Cart';

import '../style/index.scss';

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="navbar">
          <p className="logo">
            <Link to='/'>Home</Link>
          </p>
          <div className="navlinks">
            <p className="navlink">
              <Link to='/categories'>Categories</Link>
            </p>
            <p className="navlink">
              <Link to='/cart'>Cart</Link>
            </p>
          </div>
        </div>

        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/categories'>
            <Categories />
          </Route>
          <Route exact path='/category/:name'>
            <SingleCategory />
          </Route>
          <Route path='/cart'>
            <Cart />
          </Route>
          <Redirect to='/' />
        </Switch>
      </Router>
    );
  }
}

render(
  <App />,
  document.getElementById('app'),
);
