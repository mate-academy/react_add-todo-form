import React from 'react';
import './App.css';

import users from './api/users';
import defaultTodos from './api/todos';

import TodoList from './components/TodoList/TodoList';
import NewTodo from './components/NewTodo/NewTodo';

class App extends React.Component {
  state = {
    todos: defaultTodos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    })),
  }

  addTodos = (newTodo) => {
    this.setState(prev => (
      { todos: [...prev.todos, newTodo] }
    ));
  }

  render() {
    const { todos } = this.state;
    const nextTodoId = (todos[todos.length - 1].id + 1);

    return (
      <div className="app">
        <h1 className="app__title">Todo form</h1>
        <div className="todo__form">
          <NewTodo
            users={users}
            addTodos={this.addTodos}
            todoId={nextTodoId}
          />
        </div>
        <div className="todo__list">
          <TodoList todos={todos} />
        </div>
      </div>
    );
  }
}

export default App;
