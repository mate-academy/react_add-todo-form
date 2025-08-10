import React, { memo } from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
    todos: Todo[]
}

export const TodoList: React.FC<Props> = memo(({todos}) => {
    return(
        <>
        <section className="TodoList">
        {
            todos.map((todo:Todo) => {
                return <TodoInfo todo={todo} key={todo.id}/>
            })
        }
        </section>
        </>
    )
});
