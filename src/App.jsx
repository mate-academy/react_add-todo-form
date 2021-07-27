import React from 'react';
import './App.scss';
import TodoList from './components/TodoList/TodoList';
import AddTodoForm from './components/AddTodoForm/AddTodoForm';

import users from './api/users';
import todos from './api/todos';

const getUserById = userId => users.find(user => user.id === userId);

const preparedTodos = [...todos].map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

class App extends React.Component {
  state = {
    todosList: preparedTodos,
  }

  addTask = (newUserId, newTask) => {
    const setId = this.state.todosList.length + 1;

    const newTodo = {
      id: setId,
      title: newTask,
      completed: false,
      userId: newUserId,
      user: getUserById(newUserId),
    };

    this.setState(state => ({
      todosList: [...state.todosList, newTodo],
    }));
  }

  render() {
    const { todosList } = this.state;

    return (
      <div className="App">
        <AddTodoForm onAdd={this.addTask} />
        <TodoList todos={todosList} />
      </div>
    );
  }
}

export default App;
