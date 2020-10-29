import React from 'react';
import './App.css';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { Form } from './components/Form';

const preparedTodos = todosFromServer.map((todo) => {
  const user = usersFromServer.find(person => person.id === todo.userId);

  return {
    ...todo,
    user,
  };
});

class App extends React.PureComponent {
  state = {
    todos: preparedTodos,
  }

  addTodo = (title, username) => {
    const user = usersFromServer.find(person => (
      person.name === username
    ));

    const newTodo = {
      userId: user.id,
      id: this.state.todos.length + 1,
      title: title.replace(/[^\w ]+/, ''),
      completed: false,
      user,
    };

    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo],
    }));
  };

  render() {
    const { todos } = this.state;

    return (
      <div className="app">
        <div className="app__todos">
          <h1>List of todos</h1>
          <TodoList todos={todos} />
        </div>

        <div className="app__form">
          <h2>Add todo</h2>
          <Form
            users={usersFromServer}
            addTodo={this.addTodo}
          />
        </div>
      </div>
    );
  }
}

export default App;
