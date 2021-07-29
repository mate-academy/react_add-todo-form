import React from 'react';
import PropTypes from 'prop-types';
import { User, TypeUser } from '../User';
import './Todo.css';

export const Todo = ({ title, completed, user }) => (
  <>
    <p className="title">{title}</p>
    {`completed: `}
    {completed ? 'yes' : 'no'}
    <User user={user} />
  </>
);

export const TypeTodo = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: TypeUser.isRequired,
};

Todo.propTypes = TypeTodo;
