import React from 'react';
import './App.css';
import './Todo.css';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';

import todosFromServer from './api/todos';

type State = {
  todosList: Todo[]
};

class App extends React.Component<{}, State> {
  state = {
    todosList: todosFromServer,
  };

  completeToggle = (todoId:number) => {
    this.setState(state => ({
      todosList: state.todosList.map(todo => {
        if (todoId !== todo.id) {
          return todo;
        }

        return { ...todo, completed: !todo.completed };
      }),
    }));
  };

  addTodo = (userId: number, title: string) => {
    const newTodo = {
      userId,
      id: this.state.todosList.length + 1,
      title,
      completed: false,
    };

    this.setState(state => ({
      todosList: [...state.todosList, newTodo],
    }));
  };

  render() {
    const { todosList } = this.state;

    return (
      <div className="App">
        <h1 className="App__caption">Add todo form</h1>

        <TodoForm
          addTodo={this.addTodo}
        />

        <TodoList
          todoList={todosList}
          completeToggle={this.completeToggle}
        />
      </div>
    );
  }
}

export default App;
