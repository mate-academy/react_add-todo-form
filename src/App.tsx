import React from 'react';
import './App.css';

import { TodoList } from './components/TodoList';
import { FormAddTodo } from './components/FormAddTodo';

import usersFromServer from './api/users';
import todos from './api/todos';

const users: User[] = usersFromServer.map(user => ({
  ...user,
}));

const findUser = (userId: number) => {
  return users.find(user => userId === user.id) || null;
};

const todosWithUser: Todo[] = todos.map(todo => ({
  ...todo,
  user: findUser(todo.userId),
}));

type State = {
  todos: Todo[];
};

class App extends React.Component<{}, State> {
  state = {
    todos: todosWithUser,
  };

  addTodo = (newTodo: Todo) => {
    this.setState((currentState) => {
      return {
        todos: [...currentState.todos, newTodo],
      };
    });
  };

  render() {
    return (
      <div className="App">
        <div className="todos">
          <FormAddTodo
            addTodo={this.addTodo}
            usersList={users}
            todoList={this.state.todos}
          />
          <TodoList
            todoList={this.state.todos}
          />
        </div>
      </div>
    );
  }
}

export default App;
