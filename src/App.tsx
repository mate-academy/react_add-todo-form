import React, { ChangeEvent } from 'react';
import './App.css';

import users from './api/users';
import todo from './api/todos';
import { TodoList } from './api/TodoList';

interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}

interface State {
  selectedUserId: number | undefined,
  title: string,
  todos: Todo[],
  userName: string | undefined,
  validationTitle:boolean,
  validationUserName: boolean,
}

class App extends React.Component<{}, State> {
  state = {
    selectedUserId: 0,
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
      selectedUserId: findUser?.id,
      userName: findUser?.name,
      validationUserName: false,
    });
  };

  handlerOnSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState((prevState):any => {
      if (!prevState.title || !prevState.selectedUserId) {
        return {
          ...prevState,
          validationTitle: !prevState.title,
          validationUserName: !prevState.selectedUserId,
        };
      }

      const newTodo = {
        userName: prevState.userName,
        selectedUserId: prevState.selectedUserId,
        id: prevState.todos.length + 1,
        title: prevState.title,
      };

      return { title: '', selectedUserId: '', todos: [...prevState.todos, newTodo] };
    });
  };

  render() {
    const {
      title, todos, selectedUserId, validationTitle, validationUserName,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form
          onSubmit={this.handlerOnSubmit}
        >
          <select
            name="users"
            value={selectedUserId}
            onChange={this.handlerOnUserChange}
          >
            <option> Choose User </option>
            {users.map(personItem => (
              <option
                value={personItem.name}
                onClick={(event) => event.target}
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
