import { DateRangeParams, ImageData, PageParams } from '@/ts/types';

export type DataUser = {
  id: number;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  gender: number;
  status: number;
  type: number;
  images: {
    avatar?: ImageData;
  };
};

export type UserListParams = PageParams &
  DateRangeParams &
  Partial<
    Pick<DataUser, 'id' | 'name' | 'status' | 'email' | 'type' | 'phone'>
  >;

export type BodyUpdateUser = Partial<
  Pick<DataUser, 'name' | 'phone' | 'type' | 'email' | 'status' | 'address'> & {
    password: string;
    images: {
      avatar?: string;
    };
  }
>;

// "name": "string",
//   "gender": 1,
//   "phone": "0386516874",
//   "status": 1,
//   "type": 1,
//   "email": "a@gmail.com",
//   "password": "123456a@",
//   "address": "string",
//   "images": {
//     "avatar": "uuid"
//   }

export type DataUserListQuery = {
  data: DataUser[];
  total: number;
};
