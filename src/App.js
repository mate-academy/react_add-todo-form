import React from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';

import NewTodo from './NewTodo';
import List from './List';

class App extends React.PureComponent {
  state = {
    todo: [...todos],
    user: [{
      id: 0,
      name: '--Choose a user--',
    }, ...users],
  }

  newTodo = (el) => {
    this.setState(({ todo }) => ({
      todo: [...todo, el],
    }));
  }

  render() {
    return (
      <div className="App">
        <h1 className="App__header">Add todo form</h1>
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
                <List todo={el} user={this.state.user} />))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
