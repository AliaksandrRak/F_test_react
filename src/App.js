import React from 'react';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';


import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import './App.css'

import CalculatiorPage from './components/CalculatorPage'
import ResultPage from './components/ResultPage'
import HistoryPage from './components/HistoryPage'
import Spinner from './components/Spinner'
import Header from './components/Header'

import { Provider } from 'react-redux';
import { AppReduser } from './reducers/AppReduser'

const redux = require('redux');

const reducers = redux.combineReducers({
  AppReduser,
});

const store = redux.createStore(reducers);


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  

  render() {

    return (

      <>
        <Provider store={store}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Spinner />
          <BrowserRouter >
          <Header />
            <Switch>
              <Route exact path='/'  component={CalculatiorPage} />
              <Route path='/result/:gmtOffset&:departData&:arrivalDate'  component={ResultPage} />
              <Route path='/result'  component={ResultPage} />
              <Route path='/history'  component={HistoryPage} />
            </Switch>
          </BrowserRouter>
          </MuiPickersUtilsProvider>
        </Provider>
      </>
    );
  }
}
  

export default App;