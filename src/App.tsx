import React from 'react';
import './App.scss';

import todos from './api/todos';
import { Todo } from './types/TodoType';
import { TodosList } from './components/TodosList';
import { NewTodoForm } from './components/NewTodoForm';

interface State {
  todosList: Todo[];
}

class App extends React.Component<{}, State> {
  state = {
    todosList: [...todos],
  };

  addTodo = (title: string, userId: number) => {
    const { todosList } = this.state;

    const newTodo = {
      id: todosList.length + 1,
      title,
      userId,
      completed: false,
    };

    this.setState({
      todosList: [
        ...todosList,
        newTodo,
      ],
    });
  };

  render() {
    const { todosList } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <NewTodoForm addTodo={this.addTodo} />
        <TodosList todosList={todosList} />
      </div>
    );
  }
}

export default App;
