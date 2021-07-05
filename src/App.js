import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

const preparedTodos = todos.map((todo) => {
  const user = users.find(curUser => curUser.id === todo.userId);

  return {
    ...todo,
    name: user.name,
  };
});

const lastId = (preparedTodos[preparedTodos.length - 1].id + 1);

class App extends React.Component {
  state = {
    todosList: preparedTodos,
  }

  addTodos = (newTodo) => {
    this.setState(prev => (
      { todosList: [...prev.todosList, newTodo] }
    ));
  }

  render() {
    const { todosList } = this.state;

    return (
      <>
        <div className="form__container">
          <NewTodo
            users={users}
            addTodos={this.addTodos}
            todos={todosList}
            lastId={lastId}
          />
        </div>
        <div className="todo__container">
          <TodoList todos={todosList} />
        </div>

      </>
    );
  }
}

export default App;
