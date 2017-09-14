import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Middleware
import promise from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';
import PostsIndex from './containers/posts_index';
import PostsNew from './containers/posts_new';
import PostsShow from './containers/posts_show';

const createStoreWithMiddleware = applyMiddleware(promise, ReduxThunk)(createStore);

const store = createStoreWithMiddleware(reducers);

// The ***Switch*** component will prevent the routes with less especification to match anyway.
// We have to put in the top of the switch component the most specific route

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path='/posts/new' component={PostsNew} />
          <Route path='/posts/:id' component={PostsShow} />
          <Route path='/' component={PostsIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
