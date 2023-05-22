import CustomFormInput from '../CustomFormInput';

const FormPhoneInput = ({
  type,
  id,
  label,
  placeholder,
  withAsterisk = false,
  setValue,
  trigger,
  register,
  formState,
}) => {
  const addHypen = withoutHypenPhoneNumber => {
    const phoneNumber = withoutHypenPhoneNumber;
    const formattedPhoneNumber = phoneNumber.replace(/\D/g, '').replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');

    setValue('phone', formattedPhoneNumber);
    trigger(id);
  };

  return (
    <CustomFormInput
      autoComplete="off"
      label={label}
      placeholder={placeholder}
      type={type}
      withAsterisk={withAsterisk}
      {...register(id)}
      error={formState?.errors[id]?.message}
      onBlur={e => addHypen(e.target.value)}
    />
  );
};
export default FormPhoneInput;
