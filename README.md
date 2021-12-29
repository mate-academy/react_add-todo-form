[DEMO LINK](https://dlugash.github.io/react_add-todo-form/)

## Task
Implement ability to add TODOs to the `TodoList` implemented in [Static list of todos](https://github.com/mate-academy/react_static-list-of-todos)

1. Create `App` component storing `todos` array and displaying it using `TodoList`
1. Create a form to add new TODOs
    - DON'T create a separate component for the form (later we will learn how to do it)
    - there should be a text input for the `title`
    - also add a `<select>` with all the users from `./src/api/users.js`
    - add labels and placeholders where they are needed
    - the `TODO` should be added to the list after clicking `Add` button
    - each TODO should have `id`, `title` and `userId`
    - `id` is a maximal `id` in the array + 1
