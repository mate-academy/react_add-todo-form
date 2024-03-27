export type Todo = {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
}

// export type NewTodo = {
//     id: number;
//     title: string;
//     completed: boolean;
//     userId: number;
//     user: (
//         id: number,
//         name: string,
//         username: string,
//         email: string,
//     ) => void;
// }

export type User = {
    email: string;
    id: number;
    name: string;
}
