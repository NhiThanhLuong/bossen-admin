import { COLOR, STORE_PATH } from '@/data/constant';

export const STORE_NAME = 'cửa hàng';
export const STORE_BREADCRUMBS = {
  list: [
    {
      title: `Danh sách ${STORE_NAME}`,
    },
  ],
  listPath: {
    title: `Danh sách ${STORE_NAME}`,
    url: STORE_PATH,
  },
  detail: () => [
    STORE_BREADCRUMBS.listPath,
    {
      title: `Chi tiết ${STORE_NAME}`,
    },
  ],
};

export const STORE_STATUS = {
  ACTIVE: {
    value: 1,
    label: 'Hoạt động',
    color: COLOR.ACTIVE,
  },
  PAUSE: {
    value: -1,
    label: 'Tạm ngưng',
    color: COLOR.PAUSE,
  },
};
export const STORE_STATUS_LIST = Object.values(STORE_STATUS);
