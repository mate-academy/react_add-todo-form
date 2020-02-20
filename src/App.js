import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { NewTaskCreator } from './components/NewTaskCreator/NewTaskCreator';

const prepearedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todosList: [...prepearedTodos],
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todosList: [...prevState.todosList, { ...todo }],
    }));
  }

  render() {
    const { todosList } = this.state;

    return (
      <div className="App">
        <NewTaskCreator
          users={users}
          addTodo={this.addTodo}
        />
        <TodoList todos={todosList} />
      </div>
    );
  }
}

export default App;
