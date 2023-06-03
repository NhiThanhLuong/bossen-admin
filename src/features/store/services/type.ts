import { DateRangeParams, PageParams } from '@/ts/types';

export type DataStore = {
  id: number;
  name: string;
  storeId: string;
  manager: string;
  address: string;
  status: number;
  timeWork: string;
  cityCode: string;
  districtCode: string;
  wardCode: string;
  createdAt: string;
  updatedAt: string;
  lastUpdate: string;
};

export type StoreListParams = PageParams &
  DateRangeParams &
  Partial<
    Pick<
      DataStore,
      'id' | 'storeId' | 'name' | 'status' | 'manager' | 'cityCode'
    >
  >;

export type DataStoreListQuery = {
  count: number;
  stores: DataStore[];
};
