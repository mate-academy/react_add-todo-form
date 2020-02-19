import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';

import users from './api/users';
import todos from './api/todos';

const todosWithUsers = todos.map(todo => ({
  ...todo, user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todoList: [...todosWithUsers],
    id: todos.length + 1,
    selectedOption: 'Choose a user',
    title: '',
    errorMessage: false,
  }

  handleSelectChange = ({ target }) => {
    this.setState({
      selectedOption: target.value,
      errorMessage: false,
    });
  }

  handleInputChange = ({ target }) => {
    this.setState({
      title: target.value,
      errorMessage: false,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    if (this.state.title.trim() === '') {
      this.setState({
        errorMessage: 'Todo field is empty',
      });

      return;
    }

    if (this.state.selectedOption === 'Choose a user') {
      this.setState({
        errorMessage: 'You should choose a user',
      });

      return;
    }

    const userName = {
      name: this.state.selectedOption,
    };

    const newTodo = {
      id: this.state.id,
      title: this.state.title,
      user: userName,
    };

    this.setState(prevState => ({
      ...prevState,
      id: prevState.id + 1,
      todoList: [...prevState.todoList, newTodo],
      title: '',
      selectedOption: 'Choose a user',
      errorMessage: false,
    }));
  }

  render() {
    const { handleFormSubmit, handleInputChange, handleSelectChange } = this;
    const { title, selectedOption, todoList, errorMessage } = this.state;

    return (
      <div className="todo-list">
        <h2 className="todo-list__title">Todo list</h2>
        <img
          className="todo-list__icon"
          src="https://img.icons8.com/dusk/64/000000/pencil.png"
          alt="pencil"
        />
        <NewTodo
          handleFormSubmit={handleFormSubmit}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          users={users}
          selectedUser={selectedOption}
          title={title}
        />
        {errorMessage && <div className="error">{errorMessage}</div>}
        <TodoList todos={todoList} />
      </div>
    );
  }
}

export default App;
