import React from 'react';
import './App.scss';
import { v4 } from 'uuid';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './TodoList';
import { TodoForm } from './TodoForm';

const todosWithUsers = todos.map(todo => (
  {
    ...todo,
    id: v4(),
    user: users.find(user => (user.id === todo.userId)) || null,
  }
));

type State = {
  todoListWithUsers: Todo[];
};

class App extends React.Component<{}, State> {
  state = {
    todoListWithUsers: todosWithUsers,
  };

  addTodoItem = (item: Todo) => {
    this.setState((state) => (
      {
        todoListWithUsers: [...state.todoListWithUsers, item],
      }
    ));
  };

  render() {
    const { todoListWithUsers } = this.state;

    return (
      <div className="App">
        <h1 className="App__title">
          Add todo
        </h1>
        <TodoForm
          addTodoItem={this.addTodoItem}
        />
        <TodoList todoList={todoListWithUsers} />
      </div>
    );
  }
}

export default App;
