import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { uuid } from 'uuidv4';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

const findUserById = (userId: number) => {
  return users.find((user) => user.id === userId) || null;
};

const todosWithUser: Todo[] = todos.map((todo) => ({
  ...todo,
  uuid: uuid(),
  user: findUserById(todo.userId),
}));

interface State {
  userList: User[];
  todoList: Todo[];
}

export class App extends React.Component<{}, State> {
  state: State = {
    userList: users,
    todoList: todosWithUser,
  };

  addTodo = (newTodo: Todo) => {
    this.setState((currentState: State) => {
      return {
        todoList: [...currentState.todoList, newTodo],
      };
    });
  };

  render() {
    const { userList, todoList } = this.state;

    return (
      <div className="App">
        <h1 className="display-3">Add todo form</h1>
        <TodoList
          addTodo={this.addTodo}
          todos={todoList}
          users={userList}
        />
      </div>
    );
  }
}

export default App;
