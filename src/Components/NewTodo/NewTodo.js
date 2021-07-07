import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ShapeNewTodo, ShapeNewTodoDefault } from '../Shapes/ShapeNewTodo';

export class NewTodo extends React.Component {
  state = {
    currentUserId: '',
    currentTodo: '',
    wrongInput: false,
    errorMessage: '',
  }

  onChangeUser = (event) => {
    this.setState({
      currentUserId: Number(event.target.value),
      wrongInput: false,
    });
  }

  onChangeNewTodo = (event) => {
    const { value } = event.target;
    const task = value.replace(/[^\wа-яА-ЯёË ]+|^[ ]+$/gi, '');

    this.setState({
      currentTodo: task,
      wrongInput: false,
    });
  }

  onSubmitNewTodo = (event) => {
    event.preventDefault();

    const { currentUserId, currentTodo } = this.state;
    const { addNewTodo, users } = this.props;

    let errorMessage;

    if (!currentUserId && !currentTodo) {
      errorMessage = 'Please type correct data';
    } else if (!currentUserId) {
      errorMessage = 'Please choose a user';
    } else if (!currentTodo) {
      errorMessage = 'Please enter the title';
    }

    if (!currentUserId || !currentTodo) {
      this.setState({
        wrongInput: true,
        errorMessage,
      });

      return;
    }

    const todo = {
      id: uuidv4(),
      userId: currentUserId,
      title: currentTodo,
      completed: false,
      user: users.find(user => user.id === currentUserId),
    };

    addNewTodo(todo);

    this.setState({
      currentTodo: '',
    });

    event.target.reset();
  };

  render() {
    const {
      wrongInput,
      errorMessage,
      currentTodo,
    } = this.state;

    const { users } = this.props;

    return (
      <div>
        <form onSubmit={this.onSubmitNewTodo}>
          {wrongInput && (
            <div
              className="alert alert-danger"
              role="alert"
            >
              <strong>
                Oh snap!
              </strong>
              {errorMessage}
            </div>
          )}
          <select onChange={this.onChangeUser}>
            <option>Choose a user</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={currentTodo}
            maxLength="25"
            placeholder="Type todo"
            onChange={this.onChangeNewTodo}
          />
          <button
            type="submit"
          >
            Add
          </button>
        </form>

      </div>
    );
  }
}

NewTodo.defaultProps = ShapeNewTodoDefault;

NewTodo.propTypes = ShapeNewTodo.isRequired;
