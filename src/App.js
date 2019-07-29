import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import TodoItem from './components/TodoItem';
import User from './components/User';
import NewTodo from './components/NewTodo';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: todos.map(todo => ({
        ...todo,
        user: users.find(user => user.id === todo.id),
      })),
      counterId: 10,
      errorTitle: '',
      errorUser: '',
    };
  }

  addTodo = (title, user) => {
    if (title.length < 1) {
      this.setState({
        errorTitle: 'please, enter a todo',
      });

      return false;
    }

    if (!user) {
      this.setState({
        errorUser: 'please, enter a user',
      });

      return false;
    }

    return this.setState(prevState => ({
      todos: [...prevState.todos, {
        id: prevState.counterId,
        title,
        completed: false,
        user,
      }],
      counterId: prevState.counterId + 1,
      errorTitle: '',
      errorUser: '',
    }));
  };

  render() {
    const { errorTitle, errorUser } = this.state;
    const result = this.state.todos.map(todo => (
      <tr key={todo.id}>
        <User user={todo.user} />
        <TodoItem items={todo} />
      </tr>
    ));

    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <span>Users: </span>
        <p style={{ color: 'red' }}>{errorTitle}</p>
        <p style={{ color: 'red' }}>{errorUser}</p>
        <NewTodo addTodo={this.addTodo} users={users} />
        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>username</th>
              <th>title</th>
              <th>completed</th>
            </tr>
          </thead>
          <tbody>
            {result}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
