import React from 'react';
import { Todo } from '../type'; 


interface TodoInfoProps {
    todo: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
    return (
        <article data-id={todo.id}
         className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}>
            <h2 className="TodoInfo__title">{todo.title}</h2>
            <a className="UserInfo" href={`mailto:${todo.user.email}`}>
                {todo.user.name}
            </a>
        </article>  
)};
