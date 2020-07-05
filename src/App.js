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
    todoList: preparedTodos,
    tempTodo: '',
    tempUser: {},
    initIndex: '0',
    isTitleValid: true,
    isUserSelected: true,
  }

  handleInput = (event) => {
    this.setState({
      tempTodo: event.target.value.replace(/[^\w\s]/g, ''),
      isTitleValid: true,
    });
  };

  handleUserAdd = (event) => {
    const { value } = event.target.options[event.target.selectedIndex];
    const currentUser = users.find(user => user.name === value);

    this.setState({
      tempUser: currentUser,
      initIndex: value,
      isUserSelected: currentUser !== undefined,
    });
  };

  handleNewTodo = (event) => {
    event.preventDefault();

    this.setState((prevState) => {
      let items = prevState.todoList;

      if (prevState.tempTodo.length === 0) {
        return {
          isTitleValid: false,
        };
      }

      if ((typeof prevState.tempUser === 'object'
      && Object.keys(prevState.tempUser).length === 0)
      || prevState.tempUser === undefined) {
        return {
          isUserSelected: false,
        };
      }

      const newItem = {
        userId: prevState.tempUser.id,
        id: prevState.todoList.length + 1,
        title: prevState.tempTodo,
        completed: false,
        user: prevState.tempUser,
      };

      items = [...items, newItem];

      return {
        todoList: items,
        tempTodo: '',
        initIndex: '',
        tempUser: {},
        isUserSelected: true,
        isTitleValid: true,
      };
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
            handleInput={this.handleInput}
            handleNewTodo={this.handleNewTodo}
            handleUserAdd={this.handleUserAdd}
            value={this.state.tempTodo}
            index={this.state.initIndex}
            isTitleValid={this.state.isTitleValid}
            isUserSelected={this.state.isUserSelected}
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
