import CustomFormInput from '../CustomFormInput';

const FormInput = ({ type, id, label, placeholder, withAsterisk = false, register, formState, description }) => (
  <CustomFormInput
    autoComplete="off"
    description={description}
    label={label}
    placeholder={placeholder}
    type={type}
    withAsterisk={withAsterisk}
    {...register(id)}
    error={formState?.errors[id]?.message}
  />
);
export default FormInput;
