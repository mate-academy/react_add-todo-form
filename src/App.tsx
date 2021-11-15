import React, { ChangeEvent } from 'react';
import './App.css';

import users from './api/users';
import todo from './api/todos';
import { TodoList } from './api/TodoList';
import { State } from './api/type';

class App extends React.Component<{}, State> {
  state = {
    userId: 0,
    title: '',
    todos: todo,
    userName: '',
    validationTitle: false,
    validationUserName: false,
  };

  handlerOnChange = (event:ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({ title: value, validationTitle: false });
  };

  handlerOnUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    const findUser = users.find(user => user.name === value);

    this.setState({
      userId: findUser?.id,
      userName: findUser?.name,
      validationUserName: false,
    });
  };

  handlerOnSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState((prevState):any => {
      if (!prevState.title || !prevState.userId) {
        return {
          ...prevState,
          validationTitle: !prevState.title,
          validationUserName: !prevState.userId,
        };
      }

      const newTodo = {
        userName: prevState.userName,
        userId: prevState.userId,
        id: prevState.todos.length + 1,
        title: prevState.title,
      };

      return { title: '', userId: 0, todos: [...prevState.todos, newTodo] };
    });
  };

  render() {
    const {
      title, todos, validationTitle, validationUserName, userId,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form
          onSubmit={this.handlerOnSubmit}
        >
          <select
            name="users"
            value={userId}
            onChange={this.handlerOnUserChange}
          >
            <option
              value=""
            >
              {' '}
              Choose User
              {' '}
            </option>
            {users.map(personItem => (
              <option
                key={personItem.id}
              >
                {personItem.name}
              </option>
            ))}
          </select>
          {validationUserName && <div style={{ color: 'red' }}>Please choose a user</div>}
          <div>
            <input
              type="text"
              value={title}
              onChange={this.handlerOnChange}
            />
            {validationTitle && <div style={{ color: 'red' }}>Please enter the title</div>}
          </div>
          <div>
            <button
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
