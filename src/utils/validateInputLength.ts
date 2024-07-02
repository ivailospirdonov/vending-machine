export const validateInputLength = (
  insertedInput: React.RefObject<HTMLInputElement>,
  length: number
) => {
  const value = insertedInput.current?.value;
  if (value && value.length > length) {
    insertedInput.current.value = value.slice(0, length);
  }
};
