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
      // isTitle: event.target.value !== '',
    });
  };

  handleChangeUser = (event) => {
    this.setState({
      userId: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { newTodoTitle, userId } = this.state;

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
      // newTodoTitle: '',
      // userId: '',
      // isTitle: true,
      // userSelected: true,
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
