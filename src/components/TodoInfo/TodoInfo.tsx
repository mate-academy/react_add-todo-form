import cn from 'classnames';
import { Todo } from '../../types/types';
import { UserInfo } from '../UserInfo';

type Props = {
    todo: Todo;
}

export const TodoInfo = ({ todo }: Props) => {

    return (
        <article 
            data-id={todo.id}
            key={todo.id} 
            className={cn ('TodoInfo', { 'TodoInfo--completed': todo.completed === true})}
        >
            <h2 className="TodoInfo__title">{todo.title}</h2>

            < UserInfo todoUserId={todo.userId}/>
        </article>
    )
};
