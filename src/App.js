import React from 'react';
import './App.css';
import TodoList from './component/Todolist';
import getSort from './component/getSort';
import AddTodo from './component/AddTodo';
import todos from './api/todos';
import users from './api/users';

const todosData = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    visibleTodos: [],
    isLoaded: false,
    isLoading: false,
    sortField: 'id',
    isAddButton: false,
  };

  sortBy = (sortField) => {
    this.setState(prevState => ({
      visibleTodos: getSort(prevState.visibleTodos,
        sortField, prevState.sortField === sortField),
      sortField,
    }));
  }

  handleClick = () => {
    this.setState({
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        visibleTodos: todosData,
        isLoaded: true,
        isLoading: false,
      });
    }, 1000);
  }

  newTodo = (todo) => {
    this.setState(prevState => ({
      visibleTodos: [...prevState.visibleTodos, todo],
    }));
  };

  viewFormButton = () => {
    this.setState({
      isAddButton: true,
    });
  };

  render() {
    const { visibleTodos, isAddButton } = this.state;

    return (
      <main>
        {this.state.isLoaded ? (
          <div className="App">
            <h1>React add TODO form</h1>
            { isAddButton ? (
              <AddTodo
                newTodo={this.newTodo}
                users={users}
                todos={visibleTodos}
              />
            ) : (
              <button
                type="button"
                onClick={this.viewFormButton}
                className="formToAdd"
              >
                Add new todo
              </button>
            )
            }
            <h3>
              try to sort
              {this.state.sortField}
            </h3>
            <button
              type="button"
              onClick={() => this.sortBy('id')}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => this.sortBy('user')}
            >
              USER
            </button>
            <button
              type="button"
              onClick={() => this.sortBy('completed')}
            >
              DONE
            </button>
            <button
              type="button"
              onClick={() => this.sortBy('title')}
            >
              TASK
            </button>
            <TodoList todos={visibleTodos} />
          </div>
        ) : (
          <button type="button" className="load" onClick={this.handleClick}>
            {this.state.isLoading ? 'Loading...' : 'Load' }
          </button>
        )}
      </main>
    );
  }
}

export default App;
