import { useState } from 'react';
import { useEffect } from 'react';
interface User {
  id: number;
  name: string;
  // add other user properties if needed
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [title, setTitle] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<string>('0');
  const [titleError, setTitleError] = useState<string>('');
  const [userError, setUserError] = useState<string>('');

  // Dados iniciais dos todos e usuários
  const todosData: Todo[] = [
    // Exemplo de tarefa inicial
    {
      id: 1,
      title: 'Exemplo de tarefa',
      completed: false,
      userId: 1,
      user: { id: 1, name: 'Usuário Exemplo' },
    },
  ];

  const usersData: User[] = [
    { id: 1, name: 'Usuário Exemplo' },
    { id: 2, name: 'Outro Usuário' },
  ];

  // Carrega os dados iniciais dos arrays definidos diretamente neste arquivo
  useEffect(() => {
    setTodos(todosData);
    setUsers(usersData);
  }, []);

  // Lida com a mudança do input de título e filtro opcional de caracteres
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Opcional: Permite apenas letras (Ucrânia e inglês), dígitos e espaços
    const filteredValue = value.replace(/[^a-zA-Z\u0400-\u04FF0-9\s]/g, '');

    setTitle(filteredValue);
    if (titleError) {
      setTitleError('');
    }
  };

  // Lida com a mudança da seleção de usuário
  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.target.value);
    if (userError) {
      setUserError('');
    }
  };

  // Lida com o envio do formulário
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Previne o envio padrão do formulário

    let isValid = true;

    // Valida o título
    if (!title.trim()) {
      setTitleError('Por favor, insira um título');
      isValid = false;
    } else {
      setTitleError('');
    }

    // Valida a seleção do usuário
    if (selectedUserId === '0') {
      setUserError('Por favor, escolha um usuário');
      isValid = false;
    } else {
      setUserError('');
    }

    if (isValid) {
      // Calcula o novo ID do todo (o maior ID atual + 1, ou 1 se a lista estiver vazia)
      const newTodoId =
        todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
      const selectedUser = users.find(user => user.id === +selectedUserId);

      if (selectedUser) {
        const newTodo: Todo = {
          id: newTodoId,
          title: title.trim(),
          completed: false,
          userId: selectedUser.id,
          user: selectedUser, // Inclui o objeto de usuário para conveniência
        };

        setTodos(prevTodos => [...prevTodos, newTodo]); // Adiciona o novo todo à lista
        setTitle(''); // Limpa o input do título
        setSelectedUserId('0'); // Reseta a seleção de usuário
      } else {
        // Este caso idealmente não deve acontecer se a validação passar, mas é bom para robustez
        setUserError('Usuário selecionado não encontrado.');
      }
    }
  };

  return (
    <div
      className="
        App p-4 md:p-8 lg:p-12 min-h-screen bg-gray-100
        flex flex-col items-center font-sans
      "
    >
      <h1
        className="
          text-4xl font-bold text-gray-800 mb-8 mt-4 rounded-xl
          p-4 shadow-lg bg-white
        "
      >
        Formulário Adicionar Tarefa
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg mb-8 w-full max-w-md"
      >
        <div className="field mb-4">
          <label
            htmlFor="titleInput"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Título da Tarefa:
          </label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            className="
              shadow appearance-none border rounded-xl w-full py-2 px-3
              text-gray-700 leading-tight focus:outline-none
              focus:shadow-outline focus:border-blue-500
            "
            value={title}
            onChange={handleTitleChange}
            placeholder="Digite o título da tarefa"
          />
          {titleError && (
            <span className="error text-red-500 text-xs italic mt-1">
              {titleError}
            </span>
          )}
        </div>

        <div className="field mb-6">
          <label
            htmlFor="userSelect"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Atribuir Usuário:
          </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            className="
              shadow border rounded-xl w-full py-2 px-3 text-gray-700
              leading-tight focus:outline-none focus:shadow-outline
              focus:border-blue-500
            "
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Escolha um usuário
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && (
            <span className="error text-red-500 text-xs italic mt-1">
              {userError}
            </span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="
            bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6
            rounded-xl focus:outline-none focus:shadow-outline w-full
            transform transition duration-300 ease-in-out hover:scale-105
            shadow-md hover:shadow-lg
          "
        >
          Adicionar Tarefa
        </button>
      </form>
    </div>
  );
};
