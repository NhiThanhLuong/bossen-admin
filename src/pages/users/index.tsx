import { Card } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FC } from 'react';

import {
  BreadcrumbsWrapper,
  CommonButton,
  CustomTable,
  FilterWrapper,
} from '@/components';
import { FILTER_SCHEMA_PAGE_LIST, USER_PATH } from '@/data/constant';
import {
  DataUser,
  USER_BREADCRUMBS,
  USER_NAME,
  USER_ROLE_LIST,
  USER_STATUS_LIST,
  UserListParams,
  useUserListQuery,
} from '@/features/user';
import { useFilter } from '@/hooks';
import { TFilterSchema } from '@/ts/types';
import {
  columnAction,
  columnCreateAt,
  columnId,
  columnStatus,
  filterId,
  filterPhoneNumber,
  findObjInArrByKey,
  validator,
} from '@/utils';

const columns: ColumnsType<DataUser> = [
  columnId(),
  {
    title: 'Họ và tên',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    align: 'center',
  },
  {
    title: 'Chức vụ',
    dataIndex: 'type',
    align: 'center',
    render: (value: number) => findObjInArrByKey(USER_ROLE_LIST, value)?.label,
  },
  columnStatus(USER_STATUS_LIST),
  columnCreateAt(),
  columnAction(USER_PATH),
];

const filtersChema: TFilterSchema<UserListParams>[] = [
  filterId,
  {
    name: 'name',
    type: 'string',
    element: 'input',
    placeholder: 'Họ và tên',
    formItemProps: {
      rules: validator('name'),
    },
  },
  {
    name: 'email',
    type: 'string',
    element: 'input',
    placeholder: 'Email',
  },
  filterPhoneNumber,
  {
    name: 'type',
    type: 'number',
    element: 'select',
    placeholder: 'Chức vụ',
    fieldProps: {
      options: [
        {
          value: 1,
          label: 'Admin',
        },
      ],
    },
  },
  {
    name: 'status',
    type: 'number',
    element: 'select',
    placeholder: 'Trạng thái',
    fieldProps: {
      options: USER_STATUS_LIST,
    },
  },
  {
    name: 'createdFrom',
    type: 'date',
    element: 'date',
    placeholder: 'Thời gian tạo từ',
    toDateName: 'createdTo',
  },
  {
    name: 'createdTo',
    type: 'date',
    element: 'date',
    placeholder: 'Thời gian tạo đến',
    fromDateName: 'createdFrom',
  },
  ...FILTER_SCHEMA_PAGE_LIST,
];

const Users: FC = () => {
  const {
    filter,
    apiFilter,
    schemaList,
    onPageChange,
    onFilterChange,
    onResetFilter,
  } = useFilter(filtersChema);

  const { data, isLoading, isFetching } = useUserListQuery(apiFilter);

  return (
    <BreadcrumbsWrapper breadcrumbs={USER_BREADCRUMBS.list}>
      <FilterWrapper
        className="mb-4"
        onReset={onResetFilter}
        onChange={onFilterChange}
        schemaList={schemaList}
        filter={filter}
      />
      <Card
        title={`Danh sách ${USER_NAME}`}
        extra={
          <CommonButton action="add" href={`${USER_PATH}/add`} className="flex">
            Thêm người dùng
          </CommonButton>
        }
        loading={isLoading}
      >
        <CustomTable<DataUser>
          name="người dùng"
          isLoading={isFetching}
          columns={columns}
          dataSource={data?.data}
          onChange={onPageChange}
          pagination={{
            current: filter.page as number,
            pageSize: filter.limit as number,
            total: data?.total,
          }}
        />
      </Card>
    </BreadcrumbsWrapper>
  );
};

export default Users;
