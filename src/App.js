import React from 'react';
import { connect } from 'react-redux';
import './App.css';

import PropTypes from 'prop-types';

import todos from './api/todos';
import users from './api/users';

import { setTodos } from './redux/todos';
import { setUsers } from './redux/users';

import TodoList from './TodoList';
import AddTodo from './AddTodo';

class App extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { setTodos, setUsers } = this.props;

    setTodos({ todos, users });
    setUsers({ users });
  }

  render() {
    return (
      <main>
        <AddTodo />
        <TodoList />
      </main>
    );
  }
}

App.propTypes = {
  setTodos: PropTypes.func.isRequired,
  setUsers: PropTypes.func.isRequired,
};

const mapActions = {
  setTodos,
  setUsers,
};

export default connect(null, mapActions)(App);
