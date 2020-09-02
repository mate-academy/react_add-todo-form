import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';

import { Todo } from './components/Todo/Todo';
import { Form } from './components/Form/Form';

class App extends React.Component {
  state = {
    preparedTodos: todos.map(todo => (
      {
        ...users.find(current => current.id === todo.userId),
        ...todo,
      }
    )),
    todosCounts: todos.length,
  }

  todosAdder = (todo) => {
    const newTodo = todo;

    newTodo.id = this.state.todosCounts + 1;

    this.setState(currentState => ({
      todosCounts: currentState.todosCounts + 1,
      preparedTodos: [...currentState.preparedTodos, newTodo],
    }));
  }

  render() {
    return (
      <>
        <h1>List of todos</h1>
        <Form
          users={users}
          clickHandler={this.todosAdder}
        />
        <div className="todolist">
          {this.state.preparedTodos.map(todo => (
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
