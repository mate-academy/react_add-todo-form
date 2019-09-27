import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import TodoList from './components/TodoList/TodoList';
import NewTodo from './components/NewTodo/NewTodo';

class App extends React.Component {
  state = {
    todosWithUsers: todos.map(todo => (
      {
        ...todo,
        user: users.find(user => user.id === todo.userId),
      })),
    showAddDialog: false,
  };

  componentDidMount() {
    document.addEventListener('click', this.closeForm);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeForm);
  }

  handleShowAddDialog = () => {
    this.setState(prevState => ({
      showAddDialog: !prevState.showAddDialog,
    }));
  };

  submitNewTodo = ({ title, userId }) => {
    this.setState(prevState => ({
      todosWithUsers: [...prevState.todosWithUsers,
        {
          title,
          userId,
          user: users.find(user => user.id === +userId),
          completed: false,
          id: prevState.todosWithUsers.length + 1,
        }],
      showAddDialog: false,
    }));
  };

  closeForm = ({ target }) => {
    if (!target.closest('.add-button') && !target.closest('.addDialog')) {
      this.setState({ showAddDialog: false });
    }
  };

  render() {
    const { todosWithUsers } = this.state;
    const { showAddDialog } = this.state;

    return (
      <div className="App">
        <div
          className={`container ${showAddDialog && 'blur'}`}
        >
          <div className="header">
            <button
              className="add-button"
              type="button"
              onClick={this.handleShowAddDialog}
            >
              Add ToDo
            </button>
          </div>
          <TodoList todos={todosWithUsers} />
        </div>
        {showAddDialog
        && (
          <div className="addDialog modal">
            <NewTodo users={users} addTodo={this.submitNewTodo} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
