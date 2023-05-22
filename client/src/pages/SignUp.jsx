import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useMantineColorScheme, Stack, Title, Center } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import {
  FormInput,
  FormMainAddressInput,
  FormZoneCodeInput,
  FormEmailInput,
  FormPhoneInput,
  CustomButton,
  CustomLink,
} from '../components';
import { PATH } from '../constants';
import { signupSchema } from '../schema';

const SignUp = () => {
  const { state } = useLocation();
  const { colorScheme } = useMantineColorScheme();

  const navigate = useNavigate();

  const { handleSubmit, register, formState, trigger, setValue } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const handleSignUp = async data => {
    try {
      const response = await axios.post('/api/auth/signup', {
        email: data.email,
        name: data.name,
        phone: data.phone,
        password: data.password,
        mainAddress: data.mainAddress,
        detailAddress: data.detailAddress,
        postcode: data.postcode,
      });

      notifications.show({
        color: 'blue',
        autoClose: 2000,
        title: '알림',
        message: response.data.message,
        sx: { div: { fontSize: '1.5rem' } },
      });

      navigate(PATH.SIGNIN);
    } catch (error) {
      notifications.show({
        color: 'red',
        autoClose: 2000,
        title: '알림',
        message: error.response.data.message ? error.response.data.message : error.message,
        sx: { div: { fontSize: '1.5rem' } },
      });
    }
  };

  return (
    <Stack
      align="center"
      h="100rem"
      sx={{
        marginLeft: '3rem',
        input: {
          padding: '0',
          fontSize: '1.6rem',
          border: 'none',
          borderBottomStyle: 'solid',
          borderBottomWidth: '0.07rem',
          borderBottomColor: '#ced4da',
        },
        label: {
          fontSize: '1.6rem',
        },
        div: {
          padding: '0',
          fontSize: '1.6rem',
        },
      }}>
      <Title fz="3.2rem" mb="3rem" mt="6rem" order={2}>
        회원 가입
      </Title>
      <form noValidate onSubmit={handleSubmit(handleSignUp)}>
        <FormEmailInput
          formState={formState}
          id="email"
          label="이메일 주소"
          placeholder="fenb@fenb.com"
          register={register}
          type="text"
          withAsterisk
        />
        <FormInput
          formState={formState}
          id="name"
          label="이름"
          placeholder="김펜비"
          register={register}
          type="text"
          withAsterisk
        />
        <FormPhoneInput
          formState={formState}
          id="phone"
          label="휴대전화번호"
          placeholder="'-' 없이 입력"
          register={register}
          setValue={setValue}
          trigger={trigger}
          type="tel"
          withAsterisk
        />
        <FormInput
          formState={formState}
          id="password"
          label="비밀번호"
          placeholder="영문 또는 숫자를 6~12자 입력하세요."
          register={register}
          type="password"
          withAsterisk
        />
        <FormInput
          formState={formState}
          id="confirmPassword"
          label="비밀번호 확인"
          placeholder="영문 또는 숫자를 6~12자 입력하세요."
          register={register}
          type="password"
          withAsterisk
        />
        <FormZoneCodeInput
          formState={formState}
          id="postcode"
          label="우편번호"
          placeholder="주소찾기 버튼을 클릭주세요."
          register={register}
          setValue={setValue}
          type="text"
        />
        <FormMainAddressInput
          formState={formState}
          id="mainAddress"
          label="주소"
          placeholder="주소를 선택하시면 자동으로 입력됩니다."
          register={register}
          type="text"
        />
        <FormInput
          formState={formState}
          id="detailAddress"
          label="상세주소"
          placeholder="상세 주소를 입력하세요."
          register={register}
          type="text"
        />
        <CustomButton
          color={colorScheme === 'dark' ? 'gray.6' : 'dark'}
          type="submit"
          w="40rem"
          sx={{
            '@media (max-width: 765px)': {
              width: '100vw',
            },
          }}>
          가입하기
        </CustomButton>
        <Center mt="2rem">
          회원이신가요?
          <CustomLink state={state} to={PATH.SIGNIN}>
            로그인
          </CustomLink>
        </Center>
      </form>
    </Stack>
  );
};
export default SignUp;
