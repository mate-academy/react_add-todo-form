import classNames from 'classnames';

import { capitalize } from '../../services/services';
import { FormField } from '../FormField';

interface Props {
  fieldName: string;
  value: string;
  label?: string;
  placeholder?: string;
  onChange?: (newValue: string) => void;
  hasError?: boolean;
  updateHasError?: (newState: boolean) => void;
}

export const InputField: React.FC<Props> = ({
  fieldName,
  value,
  label = capitalize(fieldName),
  placeholder = `Please enter a ${fieldName}`,
  onChange = () => {},
  hasError = false,
  updateHasError = () => {},
}) => (
  <FormField
    fieldName={fieldName}
    label={label}
    errorMessage={`Please enter a ${fieldName}`}
    hasError={hasError}
  >
    <div className="control">
      <input
        type="text"
        id={fieldName}
        data-cy={`${fieldName}Input`}
        className={classNames('input', {
          'is-danger': hasError,
        })}
        value={value}
        placeholder={placeholder}
        onChange={event => {
          onChange(event.target.value);
          updateHasError(false);
        }}
      />
    </div>
  </FormField>
);
