import { createQueryKeys } from '@lukemorales/query-key-factory';
import {
  DataMember,
  DataMemberListQuery,
  MemberListParams,
} from '../services/type';
import memberApi from '../services/member-api';
import { QueryOptions } from '@/ts/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApp } from '@/hooks';

const members = createQueryKeys('members', {
  list: (params: MemberListParams) => ({
    queryKey: [params],
    queryFn: () => memberApi.getList(params),
  }),
  detail: (id: number) => ({
    queryKey: [id],
    queryFn: () => memberApi.getDetail(id),
  }),
});

export const useMemberListQuery = (
  params: MemberListParams = {},
  options: QueryOptions<DataMemberListQuery> = {}
) => {
  return useQuery({
    ...members.list(params),
    keepPreviousData: true,
    ...options,
  });
};

export const useMemberDetailQuery = (
  id: number,
  options: QueryOptions<DataMember, { member: DataMember }> = {}
) => {
  return useQuery({
    ...members.detail(id),
    select: (data) => data.member,
    ...options,
  });
};

export const useUpdateMemberMutation = (id: number) => {
  const { message } = useApp();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: memberApi.update(id),
    onSuccess: () => {
      void message.success('Cập nhật thành công');
      void queryClient.invalidateQueries(members.detail(id).queryKey);
    },
    onError: () => {
      void message.error('Cập nhật không thành công, hệ thống bị trục trặc');
    },
  });
};
