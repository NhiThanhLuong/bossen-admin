import axiosClient from '@/apis/axios-client';
import {
  DataMember,
  DataMemberListQuery,
  MemberListParams,
  MemberUpdateData,
} from './type';

const baseUrl = 'members';

const memberApi = {
  getList: (params: MemberListParams): Promise<DataMemberListQuery> =>
    axiosClient.get(baseUrl, { params }),

  getDetail: (id: number): Promise<{ member: DataMember }> =>
    axiosClient.get(`${baseUrl}/${id}`),

  update:
    (id: number) =>
    (data: MemberUpdateData): Promise<DataMember> =>
      axiosClient.patch(`${baseUrl}/${id}`, data),
};

export default memberApi;
