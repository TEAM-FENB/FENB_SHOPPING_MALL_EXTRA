import { useDaumPostcodePopup } from 'react-daum-postcode';

import { useMantineColorScheme, Button } from '@mantine/core';

import CustomFormInput from '../CustomFormInput';

const FormZoneCodeInput = ({ type, id, label, placeholder, withAsterisk = false, setValue, register, formState }) => {
  const width = 500;
  const height = 600;
  const { colorScheme } = useMantineColorScheme();

  const open = useDaumPostcodePopup();

  const handleComplete = data => {
    let addr = '';
    let extraAddr = '';

    if (data.userSelectedType === 'R') {
      addr = data.roadAddress;
    } else {
      addr = data.jibunAddress;
    }

    if (data.userSelectedType === 'R') {
      if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
        extraAddr += data.bname;
      }

      if (data.buildingName !== '') {
        extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
      }

      addr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }

    setValue('mainAddress', addr);
    setValue('postcode', data.zonecode);
  };

  const handleClick = () => {
    open({
      onComplete: handleComplete,
      left: window.screen.width / 2 - width / 2,
      top: window.screen.height / 2 - height / 2,
    });
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
      rightSection={
        <Button
          color={colorScheme === 'dark' ? 'gray.6' : 'gray'}
          m="-0.5rem 6rem 0 0"
          variant="outline"
          sx={{
            width: '12rem',
            height: '3rem',
            borderRadius: '3rem',
            ':hover': { border: '1px solid #228be6', color: '#228be6' },
            '.mantine-Button-inner': { fontSize: '1.4rem' },
          }}
          onClick={handleClick}>
          주소찾기
        </Button>
      }
      readOnly
    />
  );
};
export default FormZoneCodeInput;
