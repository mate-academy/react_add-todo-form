import { Todo } from '../../types';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

// Exibe um TODO individual com título e informações do usuário
// data-id é usado nos testes Cypress para identificar cada item
// Classe TodoInfo--completed é adicionada condicionalmente (muda cor do título via SCSS)
export const TodoInfo = ({ todo }: Props) => (
  <article
    data-id={todo.id}
    className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    <UserInfo user={todo.user} />
  </article>
);
