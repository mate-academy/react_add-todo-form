import PropTypes from 'prop-types';
import React from 'react';
import users from './api/users';
import todos from './api/todos';

class NewTodo extends React.Component {
  state = {
    todoTitle: '',
    buttonClickWithError: false,
    personId: 1,
    errorUser: true,
    todosId: todos.length,
    isDone: true,
  }

  addToList = () => {
    const { errorUser, todoTitle } = this.state;

    if (!errorUser && todoTitle) {
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
      }));

      this.props.addTodo(newDo);
    } else {
      this.setState({ buttonClickWithError: true });
    }
  }

  checkdone = (e) => {
    const bool = e.target.value === 'true';

    this.setState({ isDone: bool });
  }

  inputTitle = (e) => {
    this.setState({
      todoTitle: e.target.value,
      buttonClickWithError: false,
      personId: 1,
    });
  }

  personSelect = (e) => {
    if (e.target.value !== 'Choose a user') {
      const userId = users.find(user => user.name === e.target.value).id;

      this.setState({
        personId: userId,
        errorUser: false,
        buttonClickWithError: false,
      });
    } else {
      this.setState({ errorUser: true });
    }
  }

  render() {
    const { inputTitle, personSelect, checkdone, addToList } = this;
    const { todoTitle, buttonClickWithError, errorUser } = this.state;

    return (
      <>
        <form className="form">
          <input
            type="text"
            name="title"
            placeholder="title"
            onChange={inputTitle}
            value={todoTitle}
          />
          <select onChange={personSelect}>
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
      Is done:
          <select onChange={checkdone}>
            <option>true</option>
            <option>false</option>
          </select>
          <button type="button" onClick={addToList}>
      Add to the list
          </button>
        </form>
        {
          (errorUser && buttonClickWithError)
            ? (
              <p className="error">
        Please choose a user
              </p>
            )
            : <p />
        }
        {
          (!todoTitle && buttonClickWithError)
            ? (
              <p className="error">
        Please enter the title
              </p>
            )
            : <p />
        }
      </>
    );
  }
}

NewTodo.propTypes = { addTodo: PropTypes.func.isRequired };

export default NewTodo;
