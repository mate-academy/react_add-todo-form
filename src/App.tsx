import React from 'react';
import './App.scss';
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from './components/TodosList';
import { AddTodoForm } from './components/AddTodoForm';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const prepearedTodo = todosFromServer.map(todo => ({
  ...todo,
  id: uuidv4(),
  user: usersFromServer.find(user => user.id === todo.userId),
}
));

interface State {
  todos: Todo[];
  newTodo: string;
  selectedUser: string;
  titleError: boolean;
  userError: boolean;
}
class App extends React.Component {
  state: State = {
    todos: prepearedTodo,
    newTodo: '',
    selectedUser: '0',
    titleError: false,
    userError: false,
  };

  handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUser: event.target.value,
      userError: false,
    });
  };

  handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTodo: event.target.value,
      titleError: false,
    });
  };

  addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (this.state.newTodo === '') {
      this.setState({
        titleError: true,
      });

      return;
    }

    if (this.state.selectedUser === '0') {
      this.setState({
        titleError: false,
        userError: true,
      });

      return;
    }

    this.setState((prevState: State) => ({
      titleError: false,
      userError: false,
      newTodo: '',
      selectedUser: '0',
      todos: [
        ...prevState.todos,
        {
          title: prevState.newTodo,
          id: uuidv4(),
          user: usersFromServer.find((user) => user.name === prevState.selectedUser),
        },
      ],
    }));
  };

  render() {
    const {
      todos,
      newTodo,
      selectedUser,
      titleError,
      userError,
    } = this.state;

    /* eslint-disable-next-line  */
    console.log(todos);

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <AddTodoForm
          addTodo={this.addTodo}
          handleChangeSelect={this.handleChangeSelect}
          handleChangeInput={this.handleChangeInput}
          newTodo={newTodo}
          selectedUser={selectedUser}
          titleError={titleError}
          userError={userError}
          usersFromServer={usersFromServer}
        />
        <div className="Todolist">
          <TodoList todos={todos} />
        </div>
      </div>
    );
  }
}

export default App;
