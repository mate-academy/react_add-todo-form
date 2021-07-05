import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';

import { Todo } from './components/Todo/Todo';
import { Form } from './components/Form/Form';

const preparedTodos = todos.map(todo => (
  {
    ...users.find(current => current.id === todo.userId),
    ...todo,
  }
));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    todosCounts: todos.length,
  }

  addTodo = (todo) => {
    const newTodo = todo;

    newTodo.id = this.state.todosCounts + 1;

    this.setState(currentState => ({
      todosCounts: currentState.todosCounts + 1,
      todos: [...currentState.todos, newTodo],
    }));
  }

  render() {
    return (
      <>
        <h1>List of todos</h1>
        <Form
          users={users}
          clickHandler={this.addTodo}
        />
        <div className="todolist">
          {this.state.todos.map(todo => (
            <Todo
              {...todo}
              key={todo.id}
            />
          ))}
        </div>
      </>
    );
  }
}

export default App;
