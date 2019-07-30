import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import TodoItem from './components/TodoItem';
import NewTodo from './components/NewTodo';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      preparedTodos: todos.map(todo => ({
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

    this.setState(prevState => ({
      preparedTodos: [...prevState.preparedTodos, {
        id: prevState.counterId,
        title,
        completed: false,
        user,
      }],
      counterId: prevState.counterId + 1,
      errorTitle: '',
      errorUser: '',
    }));

    return true;
  };

  render() {
    const { errorTitle, errorUser, preparedTodos } = this.state;
    const todoList = preparedTodos.map(todo => (
      <TodoItem
        key={todo.id}
        item={todo}
      />
    ));

    return (
      <div className="App">
        <h1 className="bg-primary">Todos form</h1>
        <span>
          Users:
          { todoList.length }
        </span>
        <p className="App__error--text">{errorTitle}</p>
        <p className="App__error--text">{errorUser}</p>
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
            {todoList}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
