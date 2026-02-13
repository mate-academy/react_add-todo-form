import { useState, FormEvent, ChangeEvent } from 'react';
import { User } from '../../types';

type Props = {
  users: User[]; // Lista de usuários recebida do App (não importada aqui)
  onAddTodo: (title: string, userId: number) => void; // Callback para adicionar todo
};

// Formulário para criação de novos TODOs
// Gerencia seu próprio estado interno (inputs + erros de validação)
export const TodoForm = ({ users, onAddTodo }: Props) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0); // 0 = nenhum usuário selecionado
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  // Filtra caracteres especiais — permite apenas letras (ua/en), dígitos e espaços
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s]/g, ''));
    setHasTitleError(false); // Oculta erro ao editar o campo
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setHasUserError(false); // Oculta erro ao selecionar usuário
  };

  // Validação acontece apenas no submit (não em tempo real)
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const isTitleEmpty = !trimmedTitle;
    const isUserEmpty = userId === 0;

    setHasTitleError(isTitleEmpty);
    setHasUserError(isUserEmpty);

    // Não adiciona se houver erro — mantém valores preenchidos no form
    if (isTitleEmpty || isUserEmpty) {
      return;
    }

    onAddTodo(trimmedTitle, userId);

    // Limpa o formulário após submit válido
    setTitle('');
    setUserId(0);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="titleInput">Title: </label>
        <input
          type="text"
          id="titleInput"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="userSelect">User: </label>
        <select
          id="userSelect"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasUserError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
