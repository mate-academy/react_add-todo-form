import React from 'react';

class TodoForm extends React.Component {
  state = {
    currentValue: '',
    currentChooseUserValue: '',
    currentStatus: '',
    errorInput: false,
    errorSelect: false,
  }

  newTask = (event) => {
    const { errorInput, currentValue } = this.state;

    this.setState({ currentValue: event.target.value });

    if (errorInput && currentValue.length >= 3) {
      this.setState({ errorInput: false });
    }
  }

  chooseStatusTodo = (event) => {
    if (event.target.value === 'true') {
      this.setState({ currentStatus: true });
    } else {
      this.setState({ currentStatus: false });
    }
  }

  chooseUserName = (event) => {
    const selectUser = this.props.users
      .find(user => user.id === +event.target.value);

    this.setState({ currentChooseUserValue: selectUser.id });
  }

  resetState = () => {
    this.setState(() => ({
      currentValue: '',
      currentChooseUserValue: '',
      currentStatus: '',
      hiddenHint: false,
    }));
  }

  validation = () => {
    const {
      currentValue, currentChooseUserValue,
      currentStatus,
    } = this.state;
    let newCreateTask;

    if ((typeof currentValue === 'string'
      && currentValue.length >= 4)
      && (typeof currentChooseUserValue === 'number')
      && (typeof currentStatus === 'boolean')) {
      this.addNewTodo()
    }

    if (!newCreateTask && (typeof currentValue !== 'string'
      || currentValue.length <= 3)) {
      this.setState(() => ({ errorInput: true }));
    }

    if (!newCreateTask && (typeof currentChooseUserValue !== 'number'
      || (typeof currentStatus !== 'boolean'))) {
      this.setState(() => ({ errorSelect: true }));
    }
  }

  addNewTodo = () => {
    const {
      currentValue, currentChooseUserValue,
      currentStatus,
    } = this.state;
    const { users, changeTodo, nextId } = this.props;
    let newCreateTask = {
      userId: currentChooseUserValue,
      id: nextId,
      title: currentValue,
      completed: currentStatus,
      executant: users
        .find(user => user.id === currentChooseUserValue),
    };

    this.resetState();
    changeTodo(newCreateTask);
  }

  checkSelectError = () => {
    const { currentChooseUserValue, currentStatus, errorSelect } = this.state;

    if (errorSelect && currentChooseUserValue !== ''
      && currentStatus !== '') {
      this.setState(() => ({ errorSelect: false }));
    }
  }

  render() {
    const { users } = this.props;
    const {
      currentValue, currentChooseUserValue, currentStatus, errorSelect, errorInput,
    } = this.state;

    this.checkSelectError();

    return (
      <form
        className="todo__form form"
        onSubmit={e => e.preventDefault()}
      >
        <div className="form__wrap">
          <label htmlFor="newTask">Write a new task: </label>
          <input
            type="text"
            id="newTask"
            value={currentValue}
            onChange={this.newTask}
          />
        </div>
        <div className="form__wrap">
          <label htmlFor="chooseUser">Choose a user: </label>
          <select
            id="chooseUser"
            value={currentChooseUserValue}
            onChange={this.chooseUserName}
          >
            <option value="" hidden>
              Choose here
            </option>
            {users.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form__wrap">
          <label htmlFor="chooseStatus">Select status for new todo: </label>
          <select
            id="chooseStatus"
            value={`${currentStatus}`}
            onChange={this.chooseStatusTodo}
          >
            <option value="" hidden>Choose here</option>
            <option value="true">Done</option>
            <option value="false">In process</option>
          </select>
        </div>
        <button
          type="button"
          onClick={this.validation}
        >
          Add todo
        </button>
        {errorInput
          ? (
            <p className="form__hint">
              Please, write 4 or more symbols
            </p>
          )
          : <p />}
        {errorSelect
          ? (
            <p className="form__hint2">
              Please, select both field
            </p>
          )
          : <p />}
      </form>
    );
  }
}

export default TodoForm;
