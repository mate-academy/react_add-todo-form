import React from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';

import NewTodo from './NewTodo';
import TodoList from './TodoList';

const defaultUserSelector = {
  id: 0,
  name: 'Executor',
};

class App extends React.PureComponent {
  state = {
    todo: [...todos],
    user: [defaultUserSelector, ...users],
  }

  newTodo = (el) => {
    this.setState(({ todo }) => ({
      todo: [...todo, el],
    }));
  }

  render() {
    return (
      <div className="app">
        <h1 className="app__header">Add todo form</h1>
        <div className="wrapper">
          <div className="form">
            <NewTodo
              user={this.state.user}
              todo={this.state.todo}
              addItem={this.newTodo}
            />
          </div>
          <div className="list">
            {this.state.todo
              .map(el => (
                <TodoList todo={el} user={this.state.user} />))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
