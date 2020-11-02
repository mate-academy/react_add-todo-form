import React from 'react';
import { FormShape } from '../../shapes/FormShape';
import { Title } from './Title';
import { Select } from './Select';

export class Form extends React.PureComponent {
  state = {
    username: '',
    title: '',
    usernameError: false,
    titleError: false,
  }

  onChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      [`${name}Error`]: false,
    });
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { title, username } = this.state;
    const { addTodo } = this.props;

    if (!title.trim()) {
      this.setState({
        titleError: true,
      });

      return;
    }

    if (!username) {
      this.setState({
        usernameError: true,
      });

      return;
    }

    addTodo(title, username);

    this.setState({
      title: '',
      username: '',
    });
  }

  render() {
    return (
      <form
        className="ui form inverted grey segment"
        onSubmit={this.onSubmit}
      >
        <Title
          value={this.state.title}
          titleError={this.state.titleError}
          onChange={this.onChange}
        />

        <Select
          value={this.state.username}
          usernameError={this.state.usernameError}
          onChange={this.onChange}
          users={this.props.users}
        />

        <button
          type="submit"
          className="ui large green button"
        >
          Add task
        </button>
      </form>
    );
  }
}

Form.propTypes = FormShape;
