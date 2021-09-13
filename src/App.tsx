import React from 'react';
import './App.css';
import { TodoList } from './TodoList';

import todos from './api/todos';
import users from './api/users';

const todosWithUser: Todo[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

interface State {
  todoList: Todo[];
  userList : User[];
}

class App extends React.Component<{}, State> {
  state: State = {
    todoList: [...todosWithUser],
    userList: users,
  };

  addTodo = (todo: Todo) => {
    this.setState((currState: State) => {
      return {
        todoList: [...currState.todoList, todo],
      };
    });
  };

  render() {
    const { userList, todoList } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        Todos:
        <TodoList
          todos={todoList}
          addTodo={this.addTodo}
          users={userList}
        />
      </div>
    );
  }
}

export default App;
