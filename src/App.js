import React from 'react';
import './App.scss';
import todos from './api/todos';
import users from './api/users';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

class App extends React.Component {
  state = { todos: [...todos] }

  addNew = (userId, title, completed) => {
    this.setState(state => ({
      todos: [
        ...state.todos,
        {
          userId,
          id: state.todos.length + 1,
          title,
          completed,
        },
      ],
    }));
  }

  render() {
    return (
      <>
        <h1>List of todos</h1>
        <article className="todos">
          <TodoList todos={this.state.todos} />
          <NewTodo users={users} addNew={this.addNew} />
        </article>
      </>
    );
  }
}

export default App;
