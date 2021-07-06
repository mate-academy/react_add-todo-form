import React from 'react';
import classNames from 'classnames';
import { FormProps } from '../../props/FormProps';
import './Form.css';

export class Form extends React.PureComponent {
  state = {
    title: '',
    user: '',
    hasuser: true,
    hastitle: true,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value.trim(),
      [`has${name}`]: true,
    });
  }

  handleSubmit = (event) => {
    const { user, title } = this.state;

    event.preventDefault();

    if (!user) {
      this.setState({
        hasuser: false,
      });
    }

    if (!title) {
      this.setState({
        hastitle: false,
      });
    }

    if (user && title) {
      this.props.addTodo(this.findUser(user), title);

      this.setState({
        title: '',
        user: '',
      });
    }
  }

  findUser = userName => this.props.users.find(user => user.name === userName)

  render() {
    const {
      state: { hastitle, title, user, hasuser },
      handleChange,
      handleSubmit,
    } = this;

    const { users } = this.props;

    return (
      <form onSubmit={handleSubmit} className="form-row">
        <label className="col-md-6 mb-3">
          <input
            type="text"
            name="title"
            id="title"
            className={classNames('form-control', {
              'is-invalid': !hastitle,
            })}
            placeholder="Enter title"
            value={title}
            onChange={handleChange}
          />
          <div id="title" className="invalid-feedback">
            Please enter the title
          </div>
        </label>

        <div className="col-md-3 mb-3">
          <select
            name="user"
            id="user"
            className={classNames('form-control', {
              'is-invalid': !hasuser,
            })}
            value={user}
            onChange={handleChange}
          >
            <option value="">Choose a user</option>

            {users.map(({ name, id }) => (
              <option value={name} key={id}>{name}</option>
            ))}
          </select>
          <div id="user" className="invalid-feedback">
            Please choose a user
          </div>
        </div>

        <button
          type="submit"
          className="button col-md-3 mb-3 btn btn-primary"
        >
          Add
        </button>
      </form>
    );
  }
}

Form.propTypes = FormProps;
