type Props = {
  title: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hasError: boolean;
};

export const InputTitle: React.FC<Props> = ({ title, onChange, hasError }) => {
  return (
    <div className="field">
      <label>
        Title:{' '}
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={onChange}
        />
      </label>
      {hasError && <span className="error">Please enter a title</span>}
    </div>
  );
};
