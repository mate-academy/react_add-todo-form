import React from 'react';
import './App.css';
import users from './api/users';
import todos from './api/todos';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

class App extends React.Component {
  state = {
    selectedUser: 'Choose a user',
    newTaskName: '',
    currentTodos: todos,
    showSelectError: false,
    showInputError: false,
    taskNameMaxLength: 40,
  };

  selectUser = (event) => {
    this.setState({ selectedUser: event.target.value });
    this.setState({ showSelectError: false });
  }

  setTaskName = (event) => {
    this.setState({ newTaskName: event.target.value });
    this.setState({ showInputError: false });
  }

  addTodo = () => {
    const {
      selectedUser,
      newTaskName,
      currentTodos,
    } = this.state;
    const newTodoUser = users.find(user => user.name === selectedUser);

    if (newTodoUser === undefined && newTaskName.length === 0) {
      this.setState({ showSelectError: true });
      this.setState({ showInputError: true });

      return;
    }

    if (newTodoUser === undefined) {
      this.setState({ showSelectError: true });

      return;
    }

    if (newTaskName.length === 0) {
      this.setState({ showInputError: true });

      return;
    }

    const newTodoId = currentTodos[currentTodos.length - 1].id + 1;
    const newTodo = {
      userId: newTodoUser.id,
      id: newTodoId,
      title: newTaskName,
      completed: false,
    };

    this.setState(prevState => ({
      selectedUser: 'Choose a user',
      newTaskName: '',
      currentTodos: [...prevState.currentTodos, newTodo],
    }));
  }

  render() {
    const {
      selectedUser,
      newTaskName,
      currentTodos,
      showSelectError,
      showInputError,
      taskNameMaxLength,
    } = this.state;

    const preparedTodos = currentTodos.map(todo => ({
      ...todo,
      user: users.find(person => (
        person.id === todo.userId
      )),
    }));

    return (
      <div className="App">
        <TodoList todos={preparedTodos} />
        <h1>Add some Tasks</h1>
        <TodoForm
          taskNameMaxLength={taskNameMaxLength}
          newTaskName={newTaskName}
          inputAction={this.setTaskName}
          showInputError={showInputError}
          selectedUser={selectedUser}
          selectAction={this.selectUser}
          users={users}
          showSelectError={showSelectError}
          addButtonAction={this.addTodo}
        />
      </div>
    );
  }
}

export default App;
