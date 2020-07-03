import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import TodoList from './components/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';

const searchId = currentTodo => ({
  ...currentTodo,
  user: users.find(user => user.id === currentTodo.userId),
});

const preparedTodos = todos.map(todo => searchId(todo));

class App extends React.Component {
  state = {
    todoList: [...preparedTodos],
    tempTodo: '',
    tempUser: {},
    initIndex: '0',
    titleError: '',
    userError: '',
  }

  handleInput = (event) => {
    this.setState({
      tempTodo: event.target.value.replace(/[^\w\s]/g, ''),
      titleError: '',
    });
  };

  handleNewTodo = (event) => {
    event.preventDefault();

    this.setState((prevState) => {
      const items = prevState.todoList;

      if (prevState.tempTodo.length === 0) {
        return {
          titleError: 'Please enter the title',
        };
      }

      if ((typeof prevState.tempUser === 'object'
          && Object.keys(prevState.tempUser).length === 0)
          || prevState.tempUser === undefined) {
        return {
          userError: 'Please choose a user',
        };
      }

      items.push(
        {
          userId: prevState.tempUser.id,
          id: prevState.todoList.length + 1,
          title: prevState.tempTodo,
          completed: false,
          user: prevState.tempUser,
        },

      );

      return {
        todoList: items,
        tempTodo: '',
        initIndex: '',
        tempUser: {},
      };
    });
  };

  handleUserAdd = (event) => {
    const { value } = event.target.options[event.target.selectedIndex];

    this.setState({
      tempUser: users.find(user => user.name === value),
      initIndex: value,
      userError: '',
    });
  };

  handleStatus = (id) => {
    this.setState((prevState) => {
      const newTodoList = prevState.todoList.map((item) => {
        const currentItem = item;

        if (currentItem.id === +id) {
          currentItem.completed = !item.completed;
        }

        return currentItem;
      });

      return { todoList: newTodoList };
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <p>
          <span>Todos: </span>
          {this.state.todoList.length}
        </p>

        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <div className="content">
          <NewTodo
            onImputChange={this.handleInput}
            onTodoAdd={this.handleNewTodo}
            onUserAdd={this.handleUserAdd}
            value={this.state.tempTodo}
            index={this.state.initIndex}
            error={this.state.titleError}
            errorUser={this.state.userError}
          />
          <br />
          <TodoList
            preparedTodos={this.state.todoList}
            handleStatus={this.handleStatus}
          />
        </div>
      </div>
    );
  }
}

export default App;
