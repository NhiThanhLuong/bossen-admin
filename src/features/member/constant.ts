import { COLOR, MEMBER_PATH } from '@/data/constant';

export const MEMBER_NAME = 'thành viên';
export const MEMBER_BREADCRUMBS = {
  list: [
    {
      title: `Danh sách ${MEMBER_NAME}`,
    },
  ],
  listPath: {
    title: `Danh sách ${MEMBER_NAME}`,
    url: MEMBER_PATH,
  },
  detail: () => [
    MEMBER_BREADCRUMBS.listPath,
    {
      title: `Chi tiết ${MEMBER_NAME}`,
    },
  ],
};

export const MEMBER_STATUS = {
  WAITING: {
    value: 1,
    label: 'Chờ kích hoạt',
    color: COLOR.DISABLED,
  },
  ACTIVE: {
    value: 2,
    label: 'Đang hoạt động',
    color: COLOR.ACTIVE,
  },
  PAUSE: {
    value: 3,
    label: 'Tạm ngưng',
    color: COLOR.PAUSE,
  },
  LOCKED: {
    value: -1,
    label: 'Đã khóa',
    color: COLOR.LOCKED,
  },
};
export const MEMBER_STATUS_LIST = Object.values(MEMBER_STATUS);

const MEMBER_LEVEL = {
  LOYALTY: {
    value: 1,
    label: 'Thân thiết',
  },
  SILVER: {
    value: 2,
    label: 'Bạc',
  },
  GOLD: {
    value: 3,
    label: 'Vàng',
  },
  DIAMOND: {
    value: 4,
    label: 'Kim cương',
  },
};
export const MEMBER_LEVEL_LIST = Object.values(MEMBER_LEVEL);
