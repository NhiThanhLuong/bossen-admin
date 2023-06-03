import axiosClient from '@/apis/axios-client';
import { DataStore, DataStoreListQuery, StoreListParams } from './type';

const baseUrl = 'stores';

const storeApi = {
  getList: (params: StoreListParams): Promise<DataStoreListQuery> =>
    axiosClient.get(baseUrl, { params }),
  getDetail: (id: number): Promise<{ store: DataStore }> =>
    axiosClient.get(`${baseUrl}/${id}`),
  update:
    (id: number) =>
    (data: Partial<DataStore>): Promise<DataStore> =>
      axiosClient.patch(`${baseUrl}/${id}`, data),
};

export default storeApi;
