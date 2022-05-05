import React from 'react';
import { Todo } from './Types/Todo';
import { TodoList } from './Components/TodoList/TodoList';
import allTodos from './api/todos';
import users from './api/users';
import { Form } from './Components/Form/Form';
import './App.scss';

const preparedTodos: Todo [] = allTodos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

interface State {
  todos: Todo[];
}
export class App extends React.Component<{}, State> {
  state: State = {
    todos: preparedTodos,
  };

  addTodo = (todo: Todo) => {
    this.setState((prev) => ({
      todos: [todo, ...prev.todos],
    }));
  };

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <h1 className="App__title">Add todo form</h1>
        <Form onAdd={this.addTodo} />
        <TodoList todos={todos} />
      </div>
    );
  }
}
