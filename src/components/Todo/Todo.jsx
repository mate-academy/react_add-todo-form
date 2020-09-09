import React from 'react';
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
  };

  render() {
    const {isCompleted} = this.state;
    const {todo} = this.props;
  
    return (
        <div>
          <li
            key={todo.id}
            className={classNames("todo__item", {completed: isCompleted})}
          >
            {todo.title}
            <span>
              {` id:(${todo.id})`}
            </span>
              <input
                type="checkbox"
                name="task__todo"
                id="task__todo"
                onChange={this.handleChange}
              />
              <label htmlFor="task__todo"></label>
          </li>
      </div>
    );
  };
};

