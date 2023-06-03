import { BreadcrumbsWrapper, CustomTable, FilterWrapper } from '@/components';
import { FILTER_SCHEMA_PAGE_LIST, STORE_PATH } from '@/data/constant';
import {
  DataStore,
  STORE_BREADCRUMBS,
  STORE_NAME,
  STORE_STATUS_LIST,
  StoreListParams,
  useStoreListQuery,
} from '@/features/store';
import { useFilter } from '@/hooks';
import { TFilterSchema } from '@/ts/types';
import {
  columnAction,
  columnCreateAt,
  columnId,
  columnStatus,
  filterId,
} from '@/utils';
import { Card } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FC } from 'react';

const filtersChema: TFilterSchema<StoreListParams>[] = [
  filterId,
  {
    name: 'storeId',
    type: 'string',
    element: 'input',
    placeholder: 'Mã cửa hàng',
  },
  {
    name: 'name',
    type: 'string',
    element: 'input',
    placeholder: 'Tên cửa hàng',
  },
  {
    name: 'status',
    type: 'number',
    element: 'select',
    placeholder: 'Trạng thái',
    fieldProps: {
      options: STORE_STATUS_LIST,
    },
  },
  {
    name: 'manager',
    type: 'string',
    element: 'input',
    placeholder: 'Cửa hàng trưởng',
  },
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
    name: 'cityCode',
    type: 'string',
    element: 'input',
    placeholder: 'Tỉnh/ Thành',
  },
  ...FILTER_SCHEMA_PAGE_LIST,
];

const columns: ColumnsType<DataStore> = [
  columnId(),
  {
    title: 'Tên cửa hàng',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: 'Mã cửa hàng',
    dataIndex: 'storeId',
    align: 'center',
  },
  {
    title: 'Cửa hàng trưởng',
    dataIndex: 'manager',
    align: 'center',
  },
  {
    title: 'Tỉnh / Thành',
    dataIndex: 'cityCode',
    align: 'center',
  },
  columnStatus(STORE_STATUS_LIST),
  columnCreateAt(),
  columnAction(STORE_PATH),
];

const Stores: FC = () => {
  const {
    filter,
    apiFilter,
    schemaList,
    onPageChange,
    onFilterChange,
    onResetFilter,
  } = useFilter(filtersChema);

  const { data, isLoading, isFetching } = useStoreListQuery(apiFilter);

  return (
    <BreadcrumbsWrapper breadcrumbs={STORE_BREADCRUMBS.list}>
      <FilterWrapper
        className="mb-4"
        onReset={onResetFilter}
        onChange={onFilterChange}
        schemaList={schemaList}
        filter={filter}
      />
      <Card title={`Danh sách ${STORE_NAME}`} loading={isLoading}>
        <CustomTable<DataStore>
          name={STORE_NAME}
          isLoading={isFetching}
          columns={columns}
          dataSource={data?.stores}
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

export default Stores;
