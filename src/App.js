import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import { TodosList } from './TodosList';
import { Tasks } from './components/Tasks';
import { UsersSelect } from './components/UsersSelect';

const allTodos = todos.map(el => ({
  ...el,
  name: users.find(user => user.id === el.userId).name,
}));

class App extends React.Component {
  state = {
    title: '',
    allTodos: [...allTodos],
    user: '',
    hasTitleError: false,
    hasUserError: false,
  };

  addUsers = (event) => {
    event.preventDefault();
    const { user, title } = this.state;

    if (!title) {
      this.setState({
        hasTitleError: true,
      });
    } else {
      this.setState({
        hasTitleError: false,
      });
    }

    if (!user) {
      this.setState({
        hasUserError: true,
      });
    } else {
      this.setState({
        hasUserError: false,
      });
    }

    if (!title || !user) {
      return;
    }

    this.setState((prevState) => {
      const newTodo = {
        userId: users
          .find(person => person.name === user).id,
        id: prevState.allTodos.length + 1,
        name: users
          .find(person => person.name === user).name,
        title,
        completed: false,
      };

      return ({
        allTodos: [...prevState.allTodos, newTodo],
        title: '',
        user: '',
      });
    });
  }

  addTasks = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  deleteTask = (todoId) => {
    this.setState(state => ({
      allTodos: state.allTodos.filter(
        todo => todo.id !== todoId,
      ),
    }));
  }

  renameTask = (todoId, newTitle) => {
    this.setState(state => ({
      allTodos: state.allTodos.map((el) => {
        if (el.id === todoId) {
          return {
            ...el, title: newTitle,
          };
        }

        return el;
      }),
    }));
  }

  render() {
    const { hasTitleError, hasUserError } = this.state;

    return (
      <div className="App">
        <div className="app-inner">
          <h1 className="add-todo">Add todo form</h1>
          <form
            action="./api/todos"
            method="POST"
            onSubmit={this.addUsers}
          >

            <Tasks
              title={this.state.title}
              addTasks={this.addTasks}
              hasTitleError={hasTitleError}
            />

            <UsersSelect
              user={this.state.user}
              addTasks={this.addTasks}
              hasUserError={hasUserError}
            />
            <button type="submit" className="fild">
              Add
            </button>
          </form>
        </div>
        <TodosList
          todos={this.state.allTodos}
          deleteTask={this.deleteTask}
          renameTask={this.renameTask}
        />
      </div>
    );
  }
}

export default App;
