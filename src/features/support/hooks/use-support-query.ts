import { QueryOptions } from '@/ts/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supportApi from '../services/support-api';
import { DataSupportQuery, RecordSupport } from '../services/types';
import { useApp } from '@/hooks';

export const useSupportQuery = (
  options: QueryOptions<RecordSupport, DataSupportQuery> = {}
) => {
  return useQuery({
    queryKey: ['support'],
    queryFn: supportApi.get,
    select: (data) => data.support,
    ...options,
  });
};

export const useUpdateSupportMutation = () => {
  const { message } = useApp();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: supportApi.update,
    onSuccess: () => {
      void message.success('Đã cập nhật quản lý hỗ trơ');
      void queryClient.invalidateQueries(['support']);
    },
    onError: () => {
      void message.error('Cập nhật quản lý hỗ trợ không thành công');
    },
  });
};
