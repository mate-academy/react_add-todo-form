// Representa um usuário do sistema (baseado na API /api/users)
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

// Representa uma tarefa com o usuário responsável já associado
export interface Todo {
  id: number;
  title: string;
  completed: boolean; // false por padrão ao criar via formulário
  userId: number;
  user: User; // Objeto do usuário resolvido a partir do userId
}
