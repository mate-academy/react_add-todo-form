import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';

const TodoList = ({ props }) => (
  <>
    {props.map((item) => (
    <Todo
      key={item.id}
      keyID ={item.id}
      title={item.title}
      user={item.user}
    />
  ))}
  </>
);

TodoList.propTypes = {
  props: PropTypes.array,
}

export default TodoList;