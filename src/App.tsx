import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/ToDoList';

const preparedTodos: Todo[] = todos.map(todo => ({
  ...todo,
  user: users.find((user: User) => user.id === todo.userId) || null,
}));

interface State {
  todoList: Todo[];
  userList: User[];
}

class App extends React.Component<{}, State> {
  state: State = {
    todoList: [...preparedTodos],
    userList: users,
  };

  addTodo = (todo: Todo) => {
    this.setState((state: State) => {
      return {
        todoList: [...state.todoList, todo],
      };
    });
  };

  render() {
    const { userList, todoList } = this.state;

    return (
      <div className="App">
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
