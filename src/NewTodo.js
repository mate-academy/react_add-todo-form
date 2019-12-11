import PropTypes from 'prop-types';
import React from 'react';
import users from './api/users';
import todos from './api/todos';

class NewTodo extends React.Component {
  state = {
    todoTitle: '',
    ButtonWasClicked: false,
    personId: 1,
    todosId: todos.length,
    isDone: true,
    userIsNotSelected: true,
  }

  addToList = () => {
    const { todoTitle, userIsNotSelected } = this.state;

    if (todoTitle && !userIsNotSelected) {
      const { personId, isDone, todosId } = this.state;

      const newDo = {
        userId: personId,
        id: todosId + 1,
        title: todoTitle,
        completed: isDone,
      };

      this.setState(state => ({
        todosId: state.todosId + 1,
        todoTitle: '',
        ButtonWasClicked: false,
      }));

      this.props.addTodo(newDo);
    } else {
      this.setState({ ButtonWasClicked: true });
    }
  }

  inputTitle = (e) => {
    this.setState({
      todoTitle: e.target.value,
      ButtonWasClicked: false,
    });
  }

  personSelect = (e) => {
    if (e.target.value !== 'Choose a user') {
      const userId = users.find(user => user.name === e.target.value).id;

      this.setState({
        personId: userId,
        userIsNotSelected: false,
      });
    } else {
      this.setState({ userIsNotSelected: true });
    }
  }

  inProgress = () => {
    this.setState({ isDone: false });
  }

  done = () => {
    this.setState({ isDone: true });
  }

  render() {
    const {
      inputTitle,
      personSelect,
      addToList,
    } = this;
    const {
      todoTitle,
      userIsNotSelected,
      ButtonWasClicked,
      isDone,
    } = this.state;

    return (
      <>
        <form className="form">
          <label htmlFor="inputId" className="formField">
            <input
              id="inputId"
              type="text"
              name="title"
              placeholder="title"
              onChange={inputTitle}
              value={todoTitle}
              className="inputTypes"
            />
            {
              (!todoTitle && ButtonWasClicked)
                ? (
                  <p className="error">
                    Please enter the title
                  </p>
                )
                : ''
            }
          </label>
          <label htmlFor="selectUser" className="formField">
            <select
              id="selectUser"
              onChange={personSelect}
              className="inputTypes"
            >
              <option>
                Choose a user
              </option>
              {
                users.map(user => (
                  <option key={user.id}>
                    {
                      user.name
                    }
                  </option>
                ))
              }
            </select>
            {
              (userIsNotSelected && ButtonWasClicked)
                ? (
                  <p className="error">
                    Please choose a user
                  </p>
                )
                : ''
            }
          </label>
          <label className="radioZone" htmlFor="isDone">
            is done
            <input
              type="radio"
              name="checkDone"
              id="isDone"
              checked={isDone}
              onChange={this.done}
            />
          </label>
          <label className="radioZone" htmlFor="inProgress">
            in progress
            <input
              type="radio"
              name="checkDone"
              id="inProgress"
              onChange={this.inProgress}
            />
          </label>
          <button
            type="button"
            onClick={addToList}
            className="inputTypes"
          >
            Add to the list
          </button>
        </form>
      </>
    );
  }
}

NewTodo.propTypes = { addTodo: PropTypes.func.isRequired };

export default NewTodo;
