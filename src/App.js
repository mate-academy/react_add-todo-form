import React from 'react';

import TodoList from './component/TodoList/TodoList';
import NewTodo from './component/NewTodo/NewTodo';

import './App.css';

import users from './api/users';
import todos from './api/todos';

const usersMap = users
  .reduce((acum, user) => ({ ...acum, [user.id]: user }), {});

function getTodosWithUsers(todosArray) {
  return todosArray.map(todo => ({
    ...todo,
    user: usersMap[todo.userId],
  }));
}

const preparedTodos = getTodosWithUsers(todos, users);

class App extends React.Component {
  state = {
    listTodos: [...preparedTodos],
    usersApi: [...users],
    selectedUserId: 'Choose a user',
    newTodoText: '',
    todoId: 2,
    errorNewTodo: '',
  }

  setNewTodo = () => (
    this.setState(({
      listTodos,
      newTodoText,
      selectedUserId,
      todoId,
    }) => ({
      listTodos: [...listTodos, {
        userId: selectedUserId,
        id: todoId + 1,
        title: newTodoText,
        completed: false,
      }],
      selectedUserId: 'Choose a user',
      newTodoText: '',
      todoId: todoId + 1,
      errorNewTodo: '',
    }))
  )

  giveError = () => (
    this.setState(({ selectedUserId }) => ({
      errorNewTodo: selectedUserId === 'Choose a user'
        ? 'Please choose a user'
        : 'Please enter the title',
    }))
  );

  setSelectedUser = ({ value }) => (
    this.setState({
      selectedUserId: value,
      errorNewTodo: '',
    })
  );

  setTodoText= ({ value }) => (
    this.setState({
      newTodoText: value.replace(/[^ \w]+/g, ''),
      errorNewTodo: '',
    })
  );

  render() {
    const {
      setSelectedUser,
      setTodoText,
      setNewTodo,
      giveError,
      state: {
        listTodos,
        usersApi,
        selectedUserId,
        newTodoText,
        errorNewTodo,
      },
    } = this;

    return (
      <div className="app">
        <div className="newtodo__wrapper">
          <NewTodo
            users={usersApi}
            setSelectedUser={setSelectedUser}
            setTodoText={setTodoText}
            selectedUserId={selectedUserId}
            newTodoText={newTodoText}
            setNewTodo={setNewTodo}
            giveError={giveError}
            errorNewTodo={errorNewTodo}
          />
        </div>

        <div className="todolist__wrapper">
          <TodoList todos={listTodos} />
        </div>
      </div>
    );
  }
}

export default App;
