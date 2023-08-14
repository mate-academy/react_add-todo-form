export const handleChangeInput = (
  event: React.ChangeEvent<HTMLInputElement>,
  setValue: React.Dispatch<React.SetStateAction<string>>,
) => {
  setValue(event.target.value);
};
