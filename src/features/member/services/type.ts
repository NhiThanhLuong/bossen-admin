import { DateRangeParams, PageParams } from '@/ts/types';
import { LinkedAccount } from './enums';

export type DataMember = {
  id: number;
  stringId: string;
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: number;
  address: string;
  status: number;
  firstLogin?: {
    device: string;
    createdAt: string;
  };
  createdAt: string;
  updatedAt: string;
  memberCard?: {
    id: string;
    idMember: number;
    level: number;
    point: number;
    idMemberCard: string;
    createdAt: string;
    updatedAt: string;
  };
  avatar: string;
  meta: unknown;
  oAuthInfor?: {
    id: string;
    provider: (typeof LinkedAccount)[keyof typeof LinkedAccount];
  };
  loginHistories: Array<{
    id: number;
    device: string;
    memberId: number;
    createdAt: string;
    updatedAt: string;
  }>;
};

export type MemberListParams = PageParams &
  DateRangeParams &
  Partial<
    Pick<
      DataMember,
      'id' | 'name' | 'status' | 'email' | 'phoneNumber' | 'stringId'
    > &
      Pick<NonNullable<DataMember['memberCard']>, 'level' | 'idMemberCard'>
  >;

export type MemberUpdateData = Partial<
  Pick<DataMember, 'name' | 'gender' | 'dateOfBirth' | 'phoneNumber' | 'email'>
>;

export type DataMemberListQuery = {
  count: number;
  members: DataMember[];
};
