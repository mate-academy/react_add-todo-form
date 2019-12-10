import React from 'react';
import NewTodo from './NewTodo';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import TodoList from './TodoList';

const getTodosWithUsers = (todosArr, usersArr) => (
  todosArr.map((todo) => {
    const user = usersArr.find(person => person.id === todo.userId);

    return { ...todo, user };
  })
);

const preparedTodos = getTodosWithUsers(todos, users);

class App extends React.Component {
  state = { todoList: [...preparedTodos] };

  handleAddingTodo = (newTodo) => {
    this
      .setState(prevState => ({ todoList: [...prevState.todoList, newTodo] }));
  };

  render() {
    const { todoList } = this.state;

    return (
      <div className="App">
        <h1 className="App__header">My to-do list:</h1>
        <NewTodo
          userList={users}
          addTodo={this.handleAddingTodo}
        />
        <TodoList todos={todoList} />
      </div>
    );
  }
}

export default App;
