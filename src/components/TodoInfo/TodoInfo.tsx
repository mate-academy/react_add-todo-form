type Props = {
  title: string;
  setTitle: (s: string) => void;
  errorTitle: boolean;
};

export const TodoInfo: React.FC<Props> = ({ title, setTitle, errorTitle }) => {
  return (
    <div className="field">
      <input
        type="text"
        data-cy="titleInput"
        value={title}
        placeholder="Enter new todo "
        onChange={(e) => setTitle(e.target.value)}
      />

      {errorTitle ? (
        <span className="error">Please enter a title</span>
      ) : null}
    </div>
  );
};
