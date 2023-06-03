import {
  BreadcrumbsWrapper,
  CommonButton,
  CustomTable,
  FilterWrapper,
} from '@/components';
import { FILTER_SCHEMA_PAGE_LIST, MEMBER_PATH } from '@/data/constant';
import {
  DataMember,
  MEMBER_BREADCRUMBS,
  MEMBER_LEVEL_LIST,
  MEMBER_NAME,
  MEMBER_STATUS_LIST,
  MemberListParams,
  useMemberListQuery,
} from '@/features/member';
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
  formatNumber,
  validator,
} from '@/utils';
import { Card } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FC } from 'react';

const filtersChema: TFilterSchema<MemberListParams>[] = [
  filterId,
  {
    name: 'idMemberCard',
    type: 'string',
    element: 'input',
    placeholder: 'Mã thẻ Minh Long',
  },
  {
    name: 'name',
    type: 'string',
    element: 'input',
    placeholder: 'Tên thành viên',
    formItemProps: {
      rules: validator('name'),
    },
  },
  {
    name: 'status',
    type: 'number',
    element: 'select',
    placeholder: 'Trạng thái',
    fieldProps: {
      options: MEMBER_STATUS_LIST,
    },
  },
  filterPhoneNumber,
  {
    name: 'startDate',
    type: 'date',
    element: 'date',
    placeholder: 'Thời gian tạo từ',
    toDateName: 'endDate',
  },
  {
    name: 'endDate',
    type: 'date',
    element: 'date',
    placeholder: 'Thời gian tạo đến',
    fromDateName: 'startDate',
  },
  {
    name: 'level',
    type: 'number',
    element: 'select',
    placeholder: 'Hạng thẻ',
    fieldProps: {
      options: MEMBER_LEVEL_LIST,
    },
  },
  ...FILTER_SCHEMA_PAGE_LIST,
];

const columns: ColumnsType<DataMember> = [
  columnId(),
  {
    title: 'Họ và tên',
    dataIndex: 'name',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phoneNumber',
    align: 'center',
  },
  {
    title: 'Mã thẻ Minh Long',
    dataIndex: ['memberCard', 'idMemberCard'],
    align: 'center',
  },
  {
    title: 'Điểm tích lũy',
    dataIndex: ['memberCard', 'point'],
    align: 'right',
    render: (value: number) => formatNumber(value),
  },
  {
    title: 'Hạng thẻ',
    dataIndex: ['memberCard', 'level'],
    align: 'center',
    render: (value: number) =>
      findObjInArrByKey(MEMBER_LEVEL_LIST, value)?.label,
  },
  columnStatus(MEMBER_STATUS_LIST),
  columnCreateAt(),
  columnAction(MEMBER_PATH),
];

const Members: FC = () => {
  const {
    filter,
    apiFilter,
    schemaList,
    onPageChange,
    onFilterChange,
    onResetFilter,
  } = useFilter(filtersChema);
  const { data, isLoading, isFetching } = useMemberListQuery(apiFilter);

  return (
    <BreadcrumbsWrapper breadcrumbs={MEMBER_BREADCRUMBS.list}>
      <FilterWrapper
        className="mb-4"
        onReset={onResetFilter}
        onChange={onFilterChange}
        schemaList={schemaList}
        filter={filter}
      />
      <Card
        title={`Danh sách ${MEMBER_NAME}`}
        extra={
          <CommonButton
            action="add"
            href={`${MEMBER_PATH}/add`}
            className="flex"
          >
            Thêm {MEMBER_NAME}
          </CommonButton>
        }
        loading={isLoading}
      >
        <CustomTable
          name={MEMBER_NAME}
          isLoading={isFetching}
          columns={columns}
          dataSource={data?.members}
          onChange={onPageChange}
          pagination={{
            current: filter.page as number,
            pageSize: filter.limit as number,
            total: data?.count,
          }}
        />
      </Card>
    </BreadcrumbsWrapper>
  );
};

export default Members;
