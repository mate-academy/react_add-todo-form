import React from 'react';
import todos from '../api/todos';
import { TodoList } from '../displayTodo/TodoList';
import users from '../api/users';
import Form from './Form';

const search = (element) => {
  return users.find(person => person.id === Number(element.userId));
};

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: search(todo),
}));

export class NewTodo extends React.Component {
  state = {
    userId: 0,
    title: '',
    lastId: 5,
    id: 5,
  }

  selectUser = (event) => {
    this.setState({
      userId: Number(event.target.value),
    });
  }

  giveNameTodo = (title) => {
    this.setState({ title });
  }

  letId = (event) => {
    event.preventDefault();
    console.log("letId", event.target)
    this.setState(past => ({
      id: past.lastId,
      lastId: Number(past.lastId) + 1,
    }));
  }

  saveTodos = (event) => {
    console.log("saveTodos", event.target)
    this.setState((prev) => {
      preparedTodos[prev.id] = {
        userId: prev.userId,
        id: prev.id,
        title: prev.title,
        completed: false,
        user: search(prev),
      };
    });
  }

  render() {

    return (
      <section>
        <Form
          selectUser={event => this.selectUser(event)}
          users={this.props.users}
          giveNameTodo={() => this.giveNameTodo}
          letId={(event) => this.letId(event)}
          addToList={event => this.saveTodos(event)}
        />
        <TodoList props={preparedTodos} />
      </section>
    );
  }
}
