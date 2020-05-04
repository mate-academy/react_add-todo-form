import React from 'react';
import './App.css';

import users from './api/users';
import todoss from './api/todos';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

const preparedTodos = todoss.map((todo) => {
  const user = users.find(curUser => curUser.id === todo.userId);

  return {
    ...todo,
    name: user.name,
  };
});

const lastId = (preparedTodos[preparedTodos.length - 1].id + 1);

class App extends React.Component {
  state = {
    todos: [...preparedTodos],
  }

  addTodos = (newTodo) => {
    this.setState(prev => (
      { todos: [...prev.todos, newTodo] }
    ));
  }

  render() {
    const { todos } = this.state;

    return (
      <>
        <div className="form__container">
          <NewTodo
            users={users}
            addTodos={this.addTodos}
            todos={todos}
            lastId={lastId}
          />
        </div>
        <div className="todo__container">
          <TodoList todos={todos} />
        </div>

      </>
    );
  }
}

export default App;
