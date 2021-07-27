import React from 'react';
import './App.scss';
import { Form } from './components/Form/Form';
import { List } from './components/List/List';

export class App extends React.Component {
  state = {
    selectedUser: '',
    toDo: '',

    usersArray: [],
    toDoArr: [],
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState(state => ({
      usersArray: [...state.usersArray, state.selectedUser],
      toDoArr: [...state.toDoArr, state.toDo],
    }));
  }

  onChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { selectedUser, usersArray, toDoArr } = this.state;
    const { handleSubmit, onChange } = this;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <Form
          handleSubmit={handleSubmit}
          onChange={onChange}
          selectedUser={selectedUser}
        />

        <List
          usersArray={usersArray}
          toDoArr={toDoArr}
        />
      </div>
    );
  }
}

export default App;
