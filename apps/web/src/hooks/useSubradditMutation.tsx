import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { setCredentials } from '../store/features/authSlice'; // 👈 RTK 슬라이스 액션
import { createSubreddit } from '../api/subraddit'; // 👈 1단계에서 만든 API 함수
import { useRouter } from 'next/navigation';
import { create } from 'domain';

/** 🚀 로그인 전용 커스텀 Mutation 훅 */
export const useSubredditMutation = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient(); // 👈 캐시 관리를 위한 클라이언트

  return useMutation({
    // 1. (mutationFn): 1단계에서 만든 API 호출 함수를 지정합니다.
    mutationFn: createSubreddit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subreddits'] });
      router.push('/subreddits');
      console.log('서브레딧 생성 성공');
    },
    onError: (error) => {
      console.error('서브레딧 생성 실패:', error.message);
    },
  });
};
