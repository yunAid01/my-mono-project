import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { setCredentials } from '../store/features/authSlice'; // 👈 RTK 슬라이스 액션
import { userLogin } from '../api/auth'; // 👈 1단계에서 만든 API 함수
import { useRouter } from 'next/navigation';

/** 🚀 로그인 전용 커스텀 Mutation 훅 */
export const useLoginMutation = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient(); // 👈 캐시 관리를 위한 클라이언트

  return useMutation({
    // 1. (mutationFn): 1단계에서 만든 API 호출 함수를 지정합니다.
    mutationFn: userLogin,
    onSuccess: (data) => {
      // 2-1. 🚀 [RTK 연동] Redux 스토어에 유저 정보와 토큰을 저장합니다.
      dispatch(
        setCredentials({
          user: { id: data.user.id, email: data.user.email },
          token: data.access_token,
        }),
      );
      // 2-2. 🚀 [RQ 연동] 로그인 성공 시,
      //      '내 정보' 쿼리(예: 'me')를 무효화시켜서
      //      다른 페이지에서 최신 유저 정보를 다시 불러오게 만듭니다.
      queryClient.invalidateQueries({ queryKey: ['me'] });
      router.push('/'); // 로그인 후 홈으로 리다이렉트
      console.log('로그인 성공 및 RTK 저장 완료!');
    },

    // 3. (onError): API 호출이 실패하면 실행됩니다.
    onError: (error) => {
      // (예: 토스트 알림 라이브러리로 에러 메시지 표시)
      console.error('로그인 실패:', error.message);
    },
  });
};
