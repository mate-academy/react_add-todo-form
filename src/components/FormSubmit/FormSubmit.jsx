import React from 'react';
import './FormSubmit.scss';

const initialState = {
  title: {
    value: '',
    error: '',
  },
  selectedUser: {
    value: '',
    error: '',
  },
};

class FormSubmit extends React.Component {
  state = initialState

  getFormValue() {
    return (
      Object.entries(this.state)
        .reduce((acc, name) => ({
          ...acc,
          [name[0]]: name[1].value,
        }), {}));
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState(prevState => ({
      [name]: {
        value,
      },
    }));
  };

  handleValidate = () => {
    const { selectedUser, title } = this.state;

    let titleError = '';
    let selectedUserError = '';

    if (!title.value) {
      titleError = 'title is empty';
    }

    if (!selectedUser.value) {
      selectedUserError = 'user is not selected';
    }

    if (titleError || selectedUserError) {
      this.setState((prevState) => {
        if (titleError) {
          return {
            ...prevState,
            title: {
              error: titleError,
            },
          };
        }

        if (selectedUserError) {
          return {
            ...prevState,
            selectedUser: {
              error: selectedUserError,
            },
          };
        }

        return true;
      });

      return false;
    }

    return true;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { onAdd } = this.props;
    const formValue = this.getFormValue();
    const isValid = this.handleValidate();

    if (isValid) {
      this.setState(prevState => initialState);
      onAdd(formValue);
    }
  }

  render() {
    const { title, selectedUser } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
      >
        Todos:
        <div>
          <input
            placeholder="Todo Name"
            name="title"
            type="text"
            value={title.value}
            onChange={this.handleChange}
          />
          <div className="error-name">{title.error}</div>
        </div>

        <div>
          <select
            name="selectedUser"
            value={selectedUser.value}
            onChange={this.handleChange}
            id="pet-select"
          >
            <option value="" selected disabled hidden>Select User</option>
            {this.props.users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          <div className="error-select">{selectedUser.error}</div>
        </div>
        <button type="submit" value="Submit">Submit</button>

      </form>
    );
  }
}

export default FormSubmit;
