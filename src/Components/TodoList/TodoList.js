import React from 'react';
import { Todos } from '../Todos/Todos';
import { NamesShape } from '../../shapes/Shapes';
import styles from './TodoList.module.css';

export const TodoList = ({ list }) => (
  <div className={styles.list}>
    <h1>Todos</h1>
    <Todos todos={list} />
  </div>
);

TodoList.propTypes = NamesShape.isRequired;
