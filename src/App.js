import React from 'react';
import './App.css';
import todosFromServer from './api/todos';
import users from './api/users';
import TodoList from './components/TodoList/TodoList';
import TodoItem from './components/TodoItem/TodoItem';

class App extends React.Component {
  state = {
    todos: [...todosFromServer],
    inputValue: '',
    selectedValue: '',
    titleError: '',
    userError: '',
  }

  addTodo = () => {
    if (!this.state.inputValue) {
      this.setState({ titleError: 'Please enter the title!' });

      return;
    }

    if (!this.state.selectedValue) {
      this.setState({ userError: 'Please choose a user!' });

      return;
    }

    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          userId: prevState.selectedValue,
          id: prevState.todos.length + 1,
          title: prevState.inputValue,
          completed: false,
        },
      ],
      inputValue: '',
      selectedValue: '',
    }));
  }

  handleInputChange = (event) => {
    this.setState({
      inputValue: event.target.value,
      titleError: '',
    });
  }

  handleSelectChange = (event) => {
    this.setState({
      selectedValue: +event.target.value,
      userError: '',
    });
  }

  render() {
    const {
      todos,
      inputValue,
      selectedValue,
      titleError,
      userError,
    } = this.state;

    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <TodoItem
          users={users}
          addTodo={this.addTodo}
          inputValue={inputValue}
          selectedValue={selectedValue}
          inputChange={this.handleInputChange}
          selectChange={this.handleSelectChange}
          titleError={titleError}
          userError={userError}
        />
        <TodoList todos={todos} />
        <p>
          <span>Todos in list: </span>
          {todos.length}
        </p>
      </div>
    );
  }
}

export default App;
