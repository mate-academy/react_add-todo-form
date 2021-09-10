import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { TodoList } from './components/TodoList';
import { Form } from './components/Form';

import users from './api/users';
import todos from './api/todos';

const preparedTasks = todos.map(task => ({
  ...task,
  user: users.find(person => person.id === task.userId) || null,
}));

const RegEx = /^[a-zA-Zа-яґєіїА-ЯҐЄІЇ 0-9 ]+$/g;

class App extends React.Component<{}, State> {
  state: State = {
    title: '',
    taskId: preparedTasks[preparedTasks.length - 1].id + 1,
    userId: 0,
    tasks: preparedTasks,
    noTitleError: '',
    nonValidTitle: '',
    noUserError: '',
  };

  userIdChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userId: +event.target.value,
    });
  };

  titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(state => ({
      title: event.target.value,
      noTitleError: event.target.value.trim() ? '' : state.noTitleError,
      nonValidTitle: event.target.value.match(RegEx) ? '' : state.nonValidTitle,
    }));
  };

  resetState = () => {
    this.setState({
      title: '',
      userId: 0,
      noTitleError: '',
      nonValidTitle: '',
      noUserError: '',
    });
  };

  validate = () => {
    const { title, userId } = this.state;
    let validFlag = true;

    if (!title.trim()) {
      this.setState({ noTitleError: 'Please enter the title' });
      validFlag = false;
    }

    if (!title.match(RegEx)) {
      this.setState({ nonValidTitle: 'Please use letters, digits and spaces only' });
      validFlag = false;
    }

    if (!userId) {
      this.setState({ noUserError: 'Please choose a user' });
      validFlag = false;
    }

    return validFlag;
  };

  addTask = (event: React.FormEvent<EventTarget>): void => {
    event.preventDefault();
    const isValid = this.validate();

    if (isValid) {
      const newTask = {
        userId: this.state.userId,
        id: this.state.taskId,
        title: this.state.title,
        completed: false,
        user: users.find(person => person.id === this.state.userId) || null,
      };

      this.setState((state) => ({
        taskId: state.taskId + 1,
        tasks: [...state.tasks, newTask],
      }));

      this.resetState();
    }
  };

  render() {
    const {
      title,
      userId,
      tasks,
      noTitleError,
      nonValidTitle,
      noUserError,
    } = this.state;

    return (
      <div className="App container vh-100 d-flex flex-column justify-content-between">
        <Form
          addTask={this.addTask}
          userId={userId}
          userIdChanger={this.userIdChangeHandler}
          users={users}
          noUserError={noUserError}
          noTitleError={noTitleError}
          nonValidTitle={nonValidTitle}
          title={title}
          titleChanger={this.titleChangeHandler}
        />
        <TodoList tasks={tasks} />
      </div>
    );
  }
}

export default App;
