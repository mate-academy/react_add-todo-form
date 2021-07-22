import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Massege from './api/Components/Massege/Massege';
import './App.css';
import TodoList from './api/Components/TodoList/TodoList';
import todos from './api/todos';
import users from './api/users';

class App extends React.PureComponent {
  state = {
    checkedLengthWord: false,
    isChoosen: false,
    newTodos: [...todos].map(item => ({
      ...item,
      name: users.find(value => value.id === item.userId).name,
    }
    )),
    dataFromInput: {
      title: '',
      name: 'Choose name',
      id: todos.length + 1,
    },
  }

  selectChange = ({ target }) => {
    if (target.value !== 'Choose name') {
      this.setState(prev => ({
        ...prev,
        dataFromInput: {
          ...prev.dataFromInput,
          name: target.value,
        },
      }));
    }
  }

  submitIt = () => {
    this.setState(prev => ({
      isChoosen: (prev.dataFromInput.name === 'Choose name') && true,
      checkedLengthWord: (prev.dataFromInput.title.length === 0) && true,
    }));
    const { name, title } = this.state.dataFromInput;

    if (name !== 'Choose name' && title.length) {
      this.setState(prev => ({
        newTodos: [
          ...prev.newTodos,
          prev.dataFromInput,
        ],
        dataFromInput: {
          title: '',
          name: 'Choose name',
          id: prev.dataFromInput.id + 1,
        },
      }));
    }
  };

  inputChange = ({ target }) => {
    this.setState(prev => ({
      dataFromInput: {
        ...prev.dataFromInput,
        title: target.value,
      },
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <TodoList todos={this.state.newTodos} />
        <Form
          className="form"
          onSubmit={event => event.preventDefault()}
        >
          <div>
            <Form.Control
              maxlength="30"
              type="text"
              placeholder="Title (Max length : 30 characters)"
              onChange={this.inputChange}
              value={this.state.dataFromInput.title}
            />
          </div>
          <Form.Select
            onChange={this.selectChange}
            value={this.state.dataFromInput.name}
          >
            <option>Choose name</option>
            {users.map(item => (
              <option
                key={item.id}
              >
                {item.name}
              </option>
            ))}
          </Form.Select>
          <div>
            <Button
              onClick={this.submitIt}
              type="submit"
              variant="info"
              size="md"
              className="button"
            >
              Attempt
            </Button>
          </div>
          <Massege
            checkedLengthWord={this.state.checkedLengthWord}
            isChoosen={this.state.isChoosen}
            titleLength={this.state.dataFromInput.title.length}
          />
        </Form>
      </div>
    );
  }
}

export default App;
