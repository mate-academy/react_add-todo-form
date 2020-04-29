import React from 'react';
import './App.scss';
import TodoForm from './TodoForm';
import TodoList from './TodosList';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    todos: todos.map(todo => ({
      ...todo,
      executant: users.find(user => user.id === todo.userId),
    })),

    currentValue: '',
    currentChooseUserValue: '',
    currentStatus: '',
    hiddenHint: false,
  }

  changeStatusComplete = (todoId) => {
    const whoWillBeChange = this.state.todos
      .find(todo => todo.id === todoId);

    whoWillBeChange.completed = !whoWillBeChange.completed;
    const prevTodos = this.state.todos.slice(0, todoId - 1);
    const nextTodos = this.state.todos.slice(todoId);
    const newTodosList = [];

    if (prevTodos.length >= 1) {
      newTodosList.push(...prevTodos);
    }

    newTodosList.push(whoWillBeChange);

    if (nextTodos.length >= 1) {
      newTodosList.push(...nextTodos);
    }

    this.setState(() => ({
      todos: newTodosList,
    }));
  }

  newTask = (event) => {
    this.setState({ currentValue: event.target.value });
  }

  chooseUserName = (event) => {
    const selectUser = users
      .find(user => user.id === +event.target.value);

    this.setState({ currentChooseUserValue: selectUser.id });
  }

  chooseStatusTodo = (event) => {
    if (event.target.value === 'true') {
      this.setState({ currentStatus: true });
    } else {
      this.setState({ currentStatus: false });
    }
  }

  addNewTodo = () => {
    const {
      currentValue, currentChooseUserValue,
      currentStatus, todos,
    } = this.state;
    const idForTask = todos.length + 1;
    let newCreateTask;

    if ((typeof currentValue === 'string'
      && currentValue.length >= 4)
      && (typeof currentChooseUserValue === 'number')
      && (typeof currentStatus === 'boolean')) {
      newCreateTask = {
        userId: currentChooseUserValue,
        id: idForTask,
        title: currentValue,
        completed: currentStatus,
        executant: users
          .find(user => user.id === currentChooseUserValue),
      };
    } else {
      this.setState(state => ({
        hiddenHint: true,
      }));
    }

    if (newCreateTask) {
      this.setState(state => ({
        todos: [...state.todos, newCreateTask],
        currentValue: '',
        currentChooseUserValue: '',
        currentStatus: '',
        hiddenHint: false,
      }));
    }
  }

  render() {
    const { todos,
      currentValue, currentChooseUserValue,
      currentStatus, hiddenHint } = this.state;

    return (
      <div className="App todo">
        <TodoForm
          currentValue={currentValue}
          newTask={this.newTask}
          currentChooseUserValue={currentChooseUserValue}
          chooseUserName={this.chooseUserName}
          users={users}
          currentStatus={currentStatus}
          chooseStatusTodo={this.chooseStatusTodo}
          hiddenHint={hiddenHint}
          addNewTodo={this.addNewTodo}
        />
        <TodoList
          todos={todos}
          changeStatusComplete={this.changeStatusComplete}
        />
      </div>
    );
  }
}

export default App;
