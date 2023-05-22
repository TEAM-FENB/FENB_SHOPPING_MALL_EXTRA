import CustomFormInput from '../CustomFormInput';

const FormMainAddressInput = ({ type, id, label, placeholder, withAsterisk = false, register, formState }) => (
  <CustomFormInput
    autoComplete="off"
    label={label}
    placeholder={placeholder}
    type={type}
    withAsterisk={withAsterisk}
    {...register(id)}
    error={formState?.errors[id]?.message}
    readOnly
  />
);

export default FormMainAddressInput;
