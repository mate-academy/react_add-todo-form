import React from 'react';
import PropTypes from 'prop-types';
import users from '../api/users';
import Form from './Form';

export class NewTodo extends React.Component {
  state = {
    userId: 0,
    title: '',
    id: 0,
    user: '',
  }

  selectUser = (event) => {
    this.setState({
      userId: Number(event.target.value),
      user: users.find(
        person => (
          person.id === Number(event.target.value)
        ),
      ),
    });
  }

  todosTitle = (title) => {
    this.setState({ title });
  }

  getId = () => {
    this.setState({
      id: this.props.list.length + 1,
    });
  }

  saveTodos = (event) => {
    event.preventDefault();
    this.getId();
    this.props.addToList(
      this.state.id,
      this.state.userId,
      this.state.title,
      this.state.user,
    );

    const form = [...event.target];

    form[0].value = 0;
    form[1].value = '';
  }

  render() {
    return (
      <section>
        <Form
          selectUser={event => this.selectUser(event)}
          users={this.props.users}
          todosTitle={() => this.todosTitle}
          getId={event => this.getId(event)}
          saveTodos={event => this.saveTodos(event)}
        />
      </section>
    );
  }
}

NewTodo.propTypes = {
  addToList: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};
