/* eslint-disable consistent-return */
import React from 'react';
import PropTypes from 'prop-types';
import TodoList from './TodosList';

class NewTodo extends React.Component {
  state = {
    people: [...this.props.users],
    todosWithUsers: [...this.props.todosWithUsers],
    newTodos: '',
    selectPerson: 0,
    errorEnterTodos: '',
    errorSelectName: '',
  }

  selectTask = (event) => {
    this.setState({
      newTodos: event.target.value,
      errorEnterTodos: '',
    });
  }

  selectPerson = (event) => {
    this.setState({
      selectPerson: +event.target.value,
      errorSelectName: '',
    });
  }

  selectAddTask = (event) => {
    event.preventDefault();

    this.setState((state) => {
      const { todosWithUsers, newTodos, selectPerson, people } = state;

      if (!newTodos || !selectPerson) {
        this.setState({
          errorEnterTodos: !newTodos,
          errorSelectName: !selectPerson,
        });

        return;
      }

      const task = {
        completed: false,
        id: todosWithUsers.length + 1,
        title: newTodos,
        userId: selectPerson,
        user: people.find(person => person.id === selectPerson),
      };

      return {
        todosWithUsers: [...todosWithUsers, task],
        newTodos: '',
        selectPerson: 0,
      };
    });
  }

  render() {
    const { people,
      todosWithUsers,
      newTodos,
      selectPerson,
      errorEnterTodos,
      errorSelectName } = this.state;

    return (
      <>
        <form onSubmit={this.selectAddTask} className="form">
          <input
            type="text"
            className="form__input"
            placeholder="enter new todos"
            value={newTodos}
            onChange={this.selectTask}
          />
          <br />
          {errorEnterTodos
          && <span className="form__error">Please enter a new todos </span>}
          <br />
          <select
            className="form__select"
            value={selectPerson}
            onChange={this.selectPerson}
          >
            <option value="0">select an user</option>
            {people.map(item => (
              <option key={item.name} value={item.id}>{item.name}</option>
            ))}
          </select>
          <br />
          {errorSelectName
          && <span className="form__error">Please select a name</span>}
          <br />
          <button type="submit" className="form__button">
            Add todos to list
          </button>
        </form>

        <section className="sectionTodos">
          <TodoList todosWithUsers={todosWithUsers} />
        </section>
      </>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  todosWithUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NewTodo;
