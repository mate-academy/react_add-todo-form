import React from 'react';
import './App.css';

import users from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './Components/Todo/TodoList';
import { AddNewTodo } from './Components/Form/AddNewTodo';

const preparedTodos = todosFromServer.map(todo => {
  const user = users.find(({ id }) => id === todo.userId)
    || null;

  return { ...todo, user };
});

type State = {
  todos: Todo[];
};

class App extends React.Component<{}, State> {
  state: State = {
    todos: preparedTodos as Todo[],
  };

  addNewTask = (todo: Todo) => {
    this.setState(currentState => ({
      todos: [...currentState.todos, todo],
    }));
  };

  render() {
    const { todos } = this.state;

    return (
      <>
        <div className="App">
          <h1>Add todo form</h1>
        </div>
        <AddNewTodo
          addTodo={this.addNewTask}
          users={users}
          tasks={todos}
        />
        <TodoList tasks={todos} />
      </>
    );
  }
}

export default App;
