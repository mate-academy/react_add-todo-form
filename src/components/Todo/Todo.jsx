import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '../Todo/Todo.css';

export class Todo extends React.Component {
  state = {
    isCompleted: false,
  }

  handleChange = () => {
    this.setState(state => ({
      isCompleted: !state.isCompleted, 
    }));
  }

  render() {
    const {isCompleted} = this.state;
    const {todo} = this.props;
  
    return (
        <>
        <li
          key={todo.id}
          className={classNames("todo", {completed: isCompleted})}
        >
          {todo.title}
          <span>
            {` id:(${todo.id})`}
          </span>
          <input
            type="checkbox"
            name="checkbox"
            onChange={this.handleChange}
          />
        </li>
      </>
    );
  };
};

Todo.propTypes = {

}