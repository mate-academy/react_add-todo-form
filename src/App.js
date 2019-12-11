import React from 'react';
import cn from 'classnames';
import './App.scss';

import users from './api/users';
import todosData from './api/todos';
import NewTodo from './NewTodo';
import TodoTable from './TodoTable';

const getTodosWithUsers = (todoList, userList) => todoList.map(
  todo => (
    {
      ...todo,
      user: userList.find(user => user.id === todo.userId),
    }
  )
);

class App extends React.Component {
  state = {
    todos: getTodosWithUsers(todosData, users),
  };

  addTodo = (inputValue, selectedUser) => this.setState(prevState => ({
    todos: [
      ...prevState.todos,
      {
        id: prevState.todos.length + 1,
        title: inputValue,
        completed: 'false',
        user: users.find(user => user.id === selectedUser),
      },
    ],
  }));

  render() {
    const { todos } = this.state;

    return (
      <div className={cn('App')}>
        <h1 className={cn('App__title')}>
          List of todos
        </h1>
        <NewTodo
          users={users}
          addTodo={this.addTodo}
        />
        <TodoTable todos={todos} />
      </div>
    );
  }
}

export default App;
