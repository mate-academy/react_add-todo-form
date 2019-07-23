/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setTodos } from './redux/todos';
import { setLoaded } from './redux/loading';
import TodoList from './components/TodoList/TodoList';

import todos from './api/todos';
import users from './api/users';
import './App.css';

class App extends Component {
  componentDidMount() {
    const { setTodos, setLoaded } = this.props;
    const todosWithUser = todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));

    setTodos(todosWithUser);
    setLoaded();
  }

  render() {
    const { isLoaded } = this.props;

    return <>{isLoaded && <TodoList />}</>;
  }
}

App.propTypes = {
  setTodos: PropTypes.func.isRequired,
  setLoaded: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

const mapState = ({ isLoaded }) => ({ isLoaded });
const mapDispatch = { setTodos, setLoaded };

export default connect(
  mapState,
  mapDispatch
)(App);
