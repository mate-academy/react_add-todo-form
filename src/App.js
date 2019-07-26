import React from 'react';

import getDataJson from './components/GetDataJson';
import TodoList from './components/TodoList';
import './App.css';
import AddTodoForm from './components/AddTodoForm';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loadBtn: '!!! Load !!!',
      users: [],
      todos: [],
      todosWithUsers: [],
      lastTodoId: null,
      addingComment: false,
      errors: '',
    };
  }

  handleBtnClick = async() => {
    this.setState(() => (
      { loadBtn: 'Loading ...' }
    ));

    const usersJson = await getDataJson('https://jsonplaceholder.typicode.com/users');
    const todosJson = await getDataJson('https://jsonplaceholder.typicode.com/todos');

    this.setState(() => (
      {
        users: [...usersJson],
        todos: [...todosJson],
        lastTodoId: [...todosJson]
          .sort((a, b) => a.id - b.id)[todosJson.length - 1].id,
      }
    ));

    this.createTodosWithUsers();

    this.setState(() => (
      { loadBtn: 'Done' }
    ));
  }

  createTodosWithUsers = () => {
    this.setState({
      todosWithUsers: this.state.todos.map(todo => ({
        ...todo,
        user: this.state.users.find(user => user.id === todo.userId),
      })),
    });
  }

  handleTodoStatusChange = (id) => this.setState(prevState => ({
    todosWithUsers: prevState.todosWithUsers.map((todo) => {
    todo.completed = todo.id === id
      ? !todo.completed
      : todo.completed;

    return todo;
    }),
    todos: prevState.todos.map((todo) => {
      todo.completed = todo.id === id
        ? !todo.completed
        : todo.completed;

      return todo;
    }),
  }))


  handleFormClose = () => {
    this.setState({ addingComment: false });
  }

  handleFormAdd = async(userId, title) => {
    let error = '';

    error += userId === 0 ? 'Choose a user.' : '';
    error += title === '' ? ' Fill out a ToDo field.' : '';

    if (error !== '') {
      this.setState({ errors: error });
    } else {
      await this.setState(prevState => ({
        todos: [
          ...prevState.todos,
          {
            userId,
            id: prevState.lastTodoId + 1,
            title,
            completed: false,
          },
        ],
        lastTodoId: prevState.lastTodoId + 1,
        addingComment: false,
        errors: '',
      }));

      this.createTodosWithUsers();
    }
  }

  render() {
    return (
      <div className="App">
        <h1>
          Dynamic list of&nbsp;
          {this.state.todos[0]
            ? this.state.todos.length
            : null}
          &nbsp;todos&nbsp;
          {this.state.loadBtn === '!!! Load !!!'
            ? null
            : `- ${this.state.loadBtn}`}
        </h1>

        { this.state.loadBtn === 'Done'
          ? (<>
              <button className="addTodoBtn"
                onClick={() => this.setState(prevState => ({
                  addingComment: !prevState.addingComment
                }))}>
                Add ToDo
              </button>

              {this.state.addingComment
                && (<AddTodoForm
                  closing={this.handleFormClose}
                  users={this.state.users}
                  adding={this.handleFormAdd}
                  errors={this.state.errors}
                />)}

              <TodoList
                todos={this.state.todosWithUsers}
                handleFunction={this.handleTodoStatusChange}
              />
            </>)
          : (
              <button onClick={this.handleBtnClick}>
                {this.state.loadBtn}
              </button>
            )
        }
      </div>
    );
  }
}

export default App;
