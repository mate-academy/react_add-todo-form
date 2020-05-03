import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import TodoList from './components/TodoList';
import NewToDo from './components/NewToDo';

class App extends React.Component {
  state = {
    todos: todos.map(todo => ({
      ...todo,
      person: users.find(user => user.id === todo.userId),
    })),
    errorTitle: false,
    errorUser: false,
    // errorTitle: '',
    // errorUser: '',
    // message: '',
  }

  toggleComplete = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  }

  handleTitleNewTodo = (event) => {
    this.setState({
      newTodoTitle: event.target.value,
      errorTitle: false,
      // errorTitle: '',
    });
  };

  handleChangeUser = (event) => {
    this.setState({
      userId: event.target.value,
      errorUser: false,
      // errorUser: '',
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { newTodoTitle, userId, errorTitle, errorUser } = this.state;

    if (!newTodoTitle) {
      this.setState({
        errorTitle: true,
        // errorTitle: 'Please type your task',
      });

      return;
    }

    if (!userId) {
      this.setState({
        // errorUser: true,
        errorUser: 'Please choose the user',
      });

      return;
    }

    // if (!errorUser || !errorTitle) {
    //   this.setState({
    //     message: `Please choose the user`,
    //   });

    //   return;
    // }

    this.setState(state => ({
      todos: [
        ...state.todos,
        {
          id: state.todos.length + 1,
          title: newTodoTitle,
          completed: false,
          person: users.find(user => user.id === +userId),
        },
      ],
      errorTitle: !errorTitle ? 'Please type your task' : '',
      errorUser: !errorUser ? 'Please choose the user' : '',
      // errorTitle: false,
      // errorUser: false,
      // message: '',
    }));
  }

  render() {
    return (
      <div>
        <NewToDo
          users={users}
          userId={this.state.userId}
          newTodoTitle={this.state.newTodoTitle}
          handleTitleNewTodo={this.handleTitleNewTodo}
          handleChangeUser={this.handleChangeUser}
          handleSubmit={this.handleSubmit}
          isTitle={this.isTitle}
          errorTitle={this.errorTitle}
          errorUser={this.errorUser}
          // message={this.message}
        />
        <TodoList
          todos={this.state.todos}
          user={this.state.user}
          toggleComplete={this.toggleComplete}
          handleCompletedNewToDo={this.handleCompletedNewToDo}
        />
      </div>
    );
  }
}

export default App;
