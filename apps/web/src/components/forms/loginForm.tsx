'use client';
// hooks
import { useLoginMutation } from '../../hooks/useLoginMutation';

// react-hook-form
import { useForm } from 'react-hook-form';
import {
  LoginUserDtoType,
  LoginUserSchema,
} from 'packages/validation/dist/auth';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }, // 유효성 검사 에러 객체
  } = useForm<LoginUserDtoType>({
    resolver: zodResolver(LoginUserSchema),
  });
  const { mutate: login, isPending } = useLoginMutation();

  // 유효성 검사 통과 시 호출되는 함수
  const onSubmit = (formData: LoginUserDtoType) => {
    login(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* ... (이메일, 패스워드 input 및 에러 메시지) ... */}
      <input type="email" placeholder="이메일" {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}
      <input type="password" placeholder="비밀번호" {...register('password')} />
      {errors.password && <p>{errors.password.message}</p>}
      {/* 4. isPending으로 로딩 상태를 쉽게 처리합니다. */}
      <button type="submit" disabled={isPending}>
        {isPending ? '로그인 중...' : '로그인'}
      </button>
    </form>
  );
}
