import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/TodoList';
import { Form } from './components/Form';

const preparedTodos = [...todos].map(todo => ({
  ...todo,
  user: users.find(person => person.id === todo.userId),
}));

export class App extends React.Component {
  state ={
    visibleList: preparedTodos,
    valueSelector: 'Choose user',
    valueText: '',
    error1: '',
    error2: '',
  }

  handleChangeSelector = (e) => {
    const newValue = e.target.value;

    this.setState({
      valueSelector: newValue,
      error1: '',
    });
  }

  handleChangeText = (e) => {
    const newValue = e.target.value;

    this.setState({
      valueText: newValue,
      error2: '',
    });
  }

  add = (e) => {
    const { valueText, valueSelector, visibleList } = this.state;
    const newVisiblelist = [...visibleList];

    e.preventDefault();

    if (valueSelector === 'Choose user') {
      this.setState({
        error1: 'Please choose a user',
      });
    }

    if (valueText === '') {
      this.setState({
        error2: 'Please enter the title',
      });
    }

    if ((valueSelector !== 'Choose user') && (valueText !== '')) {
      newVisiblelist.push({
        user: users.find(person => person.name === valueSelector),
        title: valueText,
        completed: false,
        id: visibleList[visibleList.length - 1].id + 1,
      });

      this.setState({
        visibleList: newVisiblelist,
        valueSelector: 'Choose user',
        valueText: '',
      });
    }
  }

  render() {
    const { valueSelector, valueText,
      visibleList, error1, error2 } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <Form
          users={users}
          valueSelector={valueSelector}
          handleChangeSelector={this.handleChangeSelector}
          handleChangeText={this.handleChangeText}
          add={this.add}
          valueText={valueText}
        />
        <div className="error1">{error1}</div>
        <div className="error2">{error2}</div>
        <TodoList visibleList={visibleList} />
      </div>
    );
  }
}

export default App;
