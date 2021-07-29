import React from 'react';

import { Button, Alert, Col, Container, Form, Row } from 'react-bootstrap';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';

import './App.css';

const preparedTodos = todosFromServer.map(
  item => ({
    ...item,
    user: usersFromServer.find(person => (person.id === item.userId)),
  }),
);

class App extends React.Component {
  state = {
    todos: preparedTodos,
    isTitleEmpty: false,
    title: '',
    newUser: null,
    selectedUserId: '',
    isSelectedUserEmpty: false,
    wasTodoAdded: false,
  }

  addTodo = (event) => {
    event.preventDefault();

    const { title, newUser } = this.state;

    if (title.trim() && newUser) {
      this.setState(state => (
        {
          todos: [...state.todos, {
            user: newUser,
            userId: newUser.id,
            id: state.todos[state.todos.length - 1].id + 1,
            title,
            completed: false,
          }],
          selectedUserId: '',
          title: '',
          newUser: null,
          isTitleEmpty: false,
          isSelectedUserEmpty: false,
          wasTodoAdded: true,
        }
      ));
    }

    if (!title.trim()) {
      this.setState({
        isTitleEmpty: true,
        wasTodoAdded: false,
      });
    }

    if (!newUser) {
      this.setState({
        isSelectedUserEmpty: true,
        wasTodoAdded: false,
      });
    }
  }

  handleUserChange = (event) => {
    const userId = event.target.value;

    this.setState(
      {
        newUser: usersFromServer.find(user => user.id === +userId),
        selectedUserId: userId,
        isSelectedUserEmpty: false,
      },
    );
  }

  handleChange = (event) => {
    this.setState({
      title: event.target.value,
      isTitleEmpty: false,
    });
  }

  render() {
    const {
      todos,
      isTitleEmpty,
      title,
      selectedUserId,
      isSelectedUserEmpty,
      wasTodoAdded,
    } = this.state;

    return (
      <div className="App">
        <h1 className="App__title">Dynamic list of todos</h1>
        <Container>
          {isSelectedUserEmpty && (
            <Alert variant="danger">Error: user must be selected!</Alert>
          )}
          {isTitleEmpty && (
            <Alert variant="danger">Error: title must be not empty!</Alert>
          )}
          {wasTodoAdded && (
            <Alert variant="success">Todo was successfully added!</Alert>
          )}
          <Form
            className="form"
            onSubmit={this.addTodo}
          >
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="To do..."
                  value={title}
                  onChange={this.handleChange}
                />
              </Col>
              <Col>
                <select
                  value={selectedUserId}
                  onChange={this.handleUserChange}
                  className="select"
                >
                  <option>
                    Choose a User
                  </option>
                  {usersFromServer.map(user => (
                    <option
                      key={user.id}
                      value={user.id}
                    >
                      {user.name}
                    </option>
                  ))
                  }
                </select>
              </Col>
              <Col>
                <Button type="submit">Add</Button>
              </Col>
            </Row>
          </Form>
        </Container>
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
