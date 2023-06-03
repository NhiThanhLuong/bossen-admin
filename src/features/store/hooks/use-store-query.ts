import { useApp } from '@/hooks';
import { QueryOptions } from '@/ts/types';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import storeApi from '../services/store-api';
import {
  DataStore,
  DataStoreListQuery,
  StoreListParams,
} from '../services/type';

const stores = createQueryKeys('stores', {
  list: (params: StoreListParams) => ({
    queryKey: [params],
    queryFn: () => storeApi.getList(params),
  }),
  detail: (id: number) => ({
    queryKey: [id],
    queryFn: () => storeApi.getDetail(id),
  }),
});

export const useStoreListQuery = (
  params: StoreListParams = {},
  options: QueryOptions<DataStoreListQuery> = {}
) => {
  return useQuery({
    ...stores.list(params),
    keepPreviousData: true,
    ...options,
  });
};

export const useStoreDetailQuery = (
  id: number,
  options: QueryOptions<DataStore, { store: DataStore }> = {}
) => {
  return useQuery({
    ...stores.detail(id),
    select: (data) => data.store,
    ...options,
  });
};

export const useUpdateStoreQuery = (id: number) => {
  const { message } = useApp();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: storeApi.update(id),
    onSuccess: () => {
      void message.success('Cập nhật thành công');
      void queryClient.invalidateQueries(stores.detail(id).queryKey);
    },
    onError: () => {
      void message.error(`Cập nhật không thành công, hệ thống bị trục trặc`);
    },
  });
};
