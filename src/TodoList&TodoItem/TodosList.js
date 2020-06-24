import React from 'react';
import { TodoItem } from './TodoItem';
import { ShapeTodosList } from '../Shapes/Shapes';
import './TodoList.css';

export const TodosList = props => (
  <ul className="TodoList">
    {
      props.todos.map(
        (item, index) => (
          <TodoItem
            key={item + Math.random()}
            item={item}
            index={index}
            state={props.states[index]}
            flag={props.flag}
            required
          />
        ),
      )
    }
  </ul>
);

TodosList.propTypes = ShapeTodosList.isRequired;
