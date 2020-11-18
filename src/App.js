import React, { Fragment } from 'react';
import Form from './components/Form/Form';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { createGlobalStyle } from 'styled-components';
import ToDoTasks from './components/ToDoTasks/ToDoTasks';
import { useSelector } from 'react-redux';
import ToDoAppointments from './components/ToDoAppointments/ToDoAppointments';

const Global = createGlobalStyle`
  *,
  *::after,
  *::before {
    margin    : 0;
    padding   : 0;
    box-sizing: inherit;
  }
  html {
    font-size: 62.5%;
    overflow-x: hidden;
  }
  body {
    font-family   : 'Inter', sans-serif;
    font-weight   : 500;
    box-sizing: border-box;
    color: #808080;
    line-height: 1.7;
    overflow-x: hidden;
  }
`;

const App = (props) => {
  const token = useSelector((state) => state.home.token);

  return (
    <Fragment>
      <Global />
      <Form />
      <BrowserRouter>
        <Navbar />
        <Switch>
          {token ? (
            <Fragment>
              <Route exact path="/tasks" component={ToDoTasks} />
              <Route exact path="/appointments" component={ToDoAppointments} />
            </Fragment>
          ) : (
            <Route
              exact
              path="/"
              render={() => (
                <h1 style={{ textAlign: 'center' }}>Log in to Start</h1>
              )}
            />
          )}
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
