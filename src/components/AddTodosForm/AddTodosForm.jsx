import React from 'react';
import './AddTodosForm.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class CreateTodo {
  constructor(id, title, user) {
    this.userId = user.id;
    this.user = user;
    this.id = id;
    this.title = title;
    this.completed = false;
  }
}

class AddTodosForm extends React.Component {
  state = {
    isErrorTittle: false,
    isErrorUser: false,
    titleValue: '',
    userValue: '',
  };

  addTodoHandler = (event) => {
    event.preventDefault();

    const { users, todos, addTodo } = this.props;
    const { title: titleForm, user: userForm } = event.target.elements;
    const titleValue = titleForm.value;
    const userValue = userForm.value;

    if (titleValue === '' || userValue === '') {
      this.setState({
        isErrorTittle: titleValue === '',
        isErrorUser: userValue === '',
      });

      return;
    }

    this.setState({
      isErrorTittle: false,
      isErrorUser: false,
      titleValue: '',
      userValue: '',
    });

    const userId = +userValue;
    const user = users.find(man => man.id === userId);
    const newTodoId = Math.max(...todos.map(todo => todo.id)) + 1;

    addTodo(new CreateTodo(newTodoId, titleValue, user));
  };

  titleHandler = (event) => {
    const { value } = event.target;
    const sym = value.length
      ? value[value.length - 1]
      : '';

    if (value.length > 48) {
      return;
    }

    if (/[^\sA-Za-zА-Яа-я0-9]/i.test(sym)) {
      return;
    }

    this.setState({
      titleValue: value,
      isErrorTittle: false,
    });
  };

  userHandler = (event) => {
    this.setState({
      isErrorUser: false,
      userValue: event.target.value,
    });
  }

  render() {
    const { isErrorTittle, isErrorUser, titleValue, userValue } = this.state;
    const { users } = this.props;

    return (
      <form
        onSubmit={event => this.addTodoHandler(event)}
        className="form"
      >
        <textarea
          value={titleValue}
          type="text"
          name="title"
          placeholder="Title"
          className={classNames(
            'title', { redBorder: isErrorTittle },
          )}
          onChange={event => this.titleHandler(event)}
        />
        <p
          className={classNames(
            'errorMes', { visible: isErrorTittle },
          )}
        >
          * please enter the title
        </p>
        <select
          name="user"
          className={classNames(
            'user', { redBorder: isErrorUser },
          )}
          onChange={event => this.userHandler(event)}
          value={userValue}
        >
          <option value="">Choose a user</option>
          {users.map(({ name, id }) => (
            <option value={id} key={id}>{name}</option>
          ))}
        </select>
        <p
          className={classNames(
            'errorMes', { visible: isErrorUser },
          )}
        >
          * Choose a user
        </p>
        <button
          type="submit"
          className="btn"
        >
          Add
        </button>
      </form>
    );
  }
}

AddTodosForm.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default AddTodosForm;
