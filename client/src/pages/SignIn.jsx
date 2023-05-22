import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Image, Stack, Center, Title, useMantineTheme } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { CustomButton, CustomLink, FormInput } from 'components';
import { signIn } from 'api/fetch';
import { signinSchema } from 'schema';
import { PATH } from 'constants';
import { userState } from 'recoil/atoms';

const SignIn = () => {
  const { colorScheme, colors } = useMantineTheme();

  const navigate = useNavigate();
  const { state } = useLocation();
  const setUser = useSetRecoilState(userState);
  const { handleSubmit, register, formState } = useForm({
    resolver: zodResolver(signinSchema),
  });

  const handleSignInSubmit = async ({ email, password }) => {
    try {
      const data = await signIn({
        email,
        password,
      });

      setUser(data);
      navigate(state);

      notifications.show({
        color: 'blue',
        autoClose: 2000,
        title: '알림',
        message: `${data.username}님 환영합니다.`,
        sx: { div: { fontSize: '1.5rem' } },
      });
    } catch (error) {
      notifications.show({
        color: 'red',
        autoClose: 2000,
        title: '알림',
        message: '등록되지 않은 사용자입니다.',
        sx: { div: { fontSize: '1.5rem' } },
      });
    }
  };

  return (
    <Stack
      align="center"
      mih="46rem"
      sx={{
        fontSize: '1.6rem',
        input: {
          padding: '0',
          fontSize: '1.6rem',
          border: 'none',
          borderBottom: `1px solid ${colors.gray[6]}`,
        },
        label: {
          fontSize: '1.6rem',
        },
      }}>
      <Title order={2}>
        <Image
          alt="login logo"
          src={`images/logo/${colorScheme === 'dark' ? 'darkLogin' : 'login'}.svg`}
          width="40rem"
        />
      </Title>
      <form noValidate onSubmit={handleSubmit(handleSignInSubmit)}>
        <FormInput
          formState={formState}
          id="email"
          label="이메일 주소"
          placeholder="fenb@fenb.com"
          register={register}
          type="text"
        />
        <FormInput formState={formState} id="password" label="비밀번호" register={register} type="password" />
        <CustomButton color={colorScheme === 'dark' ? 'gray.6' : 'dark'} type="submit" w="40rem">
          로그인
        </CustomButton>
        <Center pt="2rem">
          회원이 아니신가요?
          <CustomLink state={state} to={PATH.SIGNUP}>
            회원가입
          </CustomLink>
        </Center>
      </form>
    </Stack>
  );
};
export default SignIn;
