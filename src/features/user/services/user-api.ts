import axiosClient from '@/apis/axios-client';
import {
  BodyUpdateUser,
  DataUser,
  DataUserListQuery,
  UserListParams,
} from './type';

const baseUrl = 'user';

const userApi = {
  getList: (params: UserListParams): Promise<DataUserListQuery> =>
    axiosClient.get(baseUrl, { params }),

  getDetail: (id: number): Promise<DataUser> =>
    axiosClient.get(`${baseUrl}/${id}`),

  update: (id: number) => (data: BodyUpdateUser) =>
    axiosClient.patch(`${baseUrl}/${id}`, data),

  add: (data: Partial<DataUser>) => axiosClient.post(baseUrl, data),
};

export default userApi;
