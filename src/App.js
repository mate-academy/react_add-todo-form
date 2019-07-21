import React, { Component } from 'react';

import { getUsers, getTodos } from './api/getData';
import TodosList from './TodosList';
import NewTodo from './NewTodo';

class App extends Component {
  state = {
    users: [],
    copyUsers: [],
    visibleTodos: [],
    copyVisibleTodos: [],
  };

  async componentDidMount() {
    const users = await getUsers();
    const todos = await getTodos();

    this.setState({
      users,
      copyUsers: [...users],
      visibleTodos: todos.map(todo => ({
        ...todo,
        user: users.find(user => todo.userId === user.id),
      })),

      copyVisibleTodos: todos.map(todo => ({
        ...todo,
        user: users.find(user => todo.userId === user.id),
      })),
    });
  }

  handleSearch = (event) => {
    const { copyVisibleTodos } = this.state;
    const { value } = event.target;
    const searchVal = value.toLowerCase();

    this.setState({
      visibleTodos: copyVisibleTodos.filter(todo => [...todo.title]
        .join('')
        .toLowerCase()
        .includes(searchVal)),
    });
  };

  onSortByName = (event) => {
    event.preventDefault();
    const { value } = event.target;

    value !== 'All' ? (
      this.setState(prevState => ({
        visibleTodos: prevState.copyVisibleTodos.filter(
          todo => todo.user.name === value
        ),
        copyUsers: prevState.users.filter(user => user.name === value),
      }))
    ) : (
      this.setState(prevState => ({
        visibleTodos: prevState.copyVisibleTodos,
      }))
    );
  }

  handleFormSubmit = (valuesMap) => {
    this.setState(prevState => ({
      visibleTodos: [...prevState.visibleTodos, valuesMap],
    }));
  };

  render() {
    const { copyUsers, users, visibleTodos } = this.state;

    return (
      <div className="App">
        <h1>TODO LIST</h1>
        <div className="search">
          <input
            className="search-field "
            type="input"
            placeholder="search tasks..."
            onChange={this.handleSearch}
          />
        </div>
        <NewTodo
          data={visibleTodos}
          onFormSubmit={this.handleFormSubmit}
          users={users}
          // key={visibleTodos.map(todo => todo.id)}
        />
        <span>Users:</span>
        {copyUsers.length}
        {', '}
        <span>Todos:</span>
        {visibleTodos.length}
        {' '}
        <p>
          <span>completed todos: </span>
          {visibleTodos.filter(todo => todo.completed === true).length}

          <br />
          <span>todos in progres: </span>
          {visibleTodos.filter(todo => todo.completed === false).length}
        </p>
        <div className="table-box">
          <table className="">
            <thead>
              <tr>
                <td>№</td>
                <td>Status</td>
                <td>Task</td>
                <td>
                  <select
                    className="form-control"
                    onChange={this.onSortByName}
                  >
                    {users.map(user => (
                      <option value={user.name} key={user.id}>
                        {user.name}
                      </option>
                    ))}

                    <option value="All" name="All">
                      Names...↴
                    </option>

                  </select>
                </td>
              </tr>
            </thead>

            {visibleTodos.map(todo => (
              <TodosList todo={todo} key={todo.id} />
            ))}
          </table>
        </div>
      </div>
    );
  }
}

export default App;
