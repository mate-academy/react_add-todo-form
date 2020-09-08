import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';
import { Todo } from '../Todo/Todo';

export const TodoList = ({ list }) => (
  <section className="list">
    {list.map(elem => <Todo {...elem} key={elem.id} />)}
  </section>
);

TodoList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};
