import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import UserShape from '../../shapes/UserShape';

import Button from './Button/Button';
import TextInp from './TextInp/TextInp';
import Select from './Select/Select';

class Form extends PureComponent {
  state = {
    user: '',
    title: '',
    userError: false,
    titleError: false,
  }

  getValue = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value.trim(),
    });
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { user, title } = this.state;
    const { addTodo, users } = this.props;

    if (!user.length) {
      this.setState({
        userError: true,
      });

      return;
    }

    if (!title.length) {
      this.setState({
        titleError: true,
      });

      return;
    }

    const currentUser = users.find(person => person.name === user);

    addTodo(currentUser, title);

    this.setState({
      user: '',
      title: '',
      userError: false,
      titleError: false,
    });
  }

  render() {
    const { users } = this.props;
    const { user, title, userError, titleError } = this.state;
    const { getValue, onSubmit } = this;

    return (
      <>
        <form
          className="form"
          onSubmit={onSubmit}
        >
          <Select users={users} user={user} getValue={getValue} />
          <div className="form__text-input-container">
            <TextInp getValue={getValue} title={title} />
          </div>
          <Button />
        </form>
        {userError && <p className="error">Please choose a user</p>}
        {titleError && <p className="error">Please enter the title</p>}
      </>
    );
  }
}

Form.propTypes = {
  users: PropTypes.arrayOf(UserShape).isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default Form;
