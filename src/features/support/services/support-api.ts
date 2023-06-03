import axiosClient from '@/apis/axios-client';
import { DataSupportQuery, RecordSupport } from './types';

const baseUrl = 'support';

const supportApi = {
  get: (): Promise<DataSupportQuery> => axiosClient.get(baseUrl),
  update: (data: Partial<RecordSupport>): Promise<DataSupportQuery> =>
    axiosClient.patch(baseUrl, data),
};

export default supportApi;
