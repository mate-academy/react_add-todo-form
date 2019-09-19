import React from 'react';
import classNames from 'classnames';

class NewTodo extends React.Component {
  state = {
    selectedUser: 0,
    inputTodoValue: '',
    inputTodoError: false,
    selectUserError: false,
  }

  onChangeSelectOfUser = ({ target: { value } }) => {
    if (value !== 0) {
      this.setState({
        selectedUser: Number(value),
        selectUserError: false,
      });
    } else {
      this.setState({
        selectedUser: Number(value),
      });
    }
  }

  onChangeInputOfTodo = ({ target: { value } }) => {
    if (value !== '') {
      this.setState({
        inputTodoValue: value,
        inputTodoError: false,
      });
    } else {
      this.setState({
        inputTodoValue: value,
      });
    }
  }

  addTodo = (event) => {
    event.preventDefault();
    const { inputTodoValue, selectedUser } = this.state;
    const { updatedTodosList } = this.props;

    if (inputTodoValue && selectedUser !== 0) {
      const newTodo = {
        userId: Number(selectedUser),
        title: inputTodoValue,
        completed: false,
      };
      this.setState({
        selectedUser: 0,
        inputTodoValue: '',
      });
      updatedTodosList(newTodo);
    } else {
      this.setState({
        selectUserError: selectedUser === 0,
        inputTodoError: !inputTodoValue,
      });
    }
  }

  render() {
    const {
      usersList,
    } = this.props;
    const {
      selectedUser,
      inputTodoValue,
      inputTodoError,
      selectUserError,
    } = this.state;
    const inputTodoClass = classNames(
      'form-control',
      {
        'is-invalid': inputTodoError,
      }
    );
    const selectUserClass = classNames(
      'form-control',
      {
        'is-invalid': selectUserError,
      }
    );

    return (
      <div className="container mb-5">
        <div className="row">
          <form className="col-lg-6 mx-auto" onSubmit={this.addTodo}>
            <div className="form-group row">
              <label
                className="col-sm-3 col-form-label"
                htmlFor="todo-text"
              >
                Todo text:
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  value={inputTodoValue}
                  onChange={this.onChangeInputOfTodo}
                  id="todo-text"
                  className={inputTodoClass}
                />
                <div className="invalid-feedback">
                  Please enter the title
                </div>
              </div>
            </div>
            <div className="form-group row">
              <label
                className="col-sm-3 col-form-label"
                htmlFor="todo-user"
              >
                User:
              </label>
              <div className="col-sm-9">
                <select
                  value={selectedUser}
                  onChange={this.onChangeSelectOfUser}
                  className={selectUserClass}
                  id="todo-user"
                >
                  <option key="Choose a user" value={0}>Choose a user</option>
                  {usersList.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
                <div className="invalid-feedback">
                  Please choose a user
                </div>
              </div>
            </div>
            <div className="form-group row justify-content-end">
              <div className="col-sm-9 text-right">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default NewTodo;
