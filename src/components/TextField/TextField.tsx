interface Props {
  title: string;
  name: string;
  value?: string;
  label: string;
  placeholder: string;
  hasError?: boolean;
  required?: boolean;
  onChange: (newValue: string) => void;
}

export const TextField: React.FC<Props> = ({
  title,
  name,
  value = title,
  label,
  placeholder,
  hasError = false,
  required = true,
  onChange,
}) => {
  return (
    <div className="field">
      <label className="label" htmlFor="title">
        {label}
      </label>
      <input
        id={name}
        type="text"
        data-cy="titleInput"
        placeholder={placeholder}
        value={value}
        onChange={event => onChange(event.target.value)}
      />
      {hasError && required && (
        <span className="error">Please enter a title</span>
      )}
    </div>
  );
};
