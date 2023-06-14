import { useFilter } from '@/hooks';
import { BreadcrumbsType, TFilterSchema } from '@/ts/types';
import { UseQueryResult } from '@tanstack/react-query';
import { Card } from 'antd';
import CommonButton from '../common/common-button';
import CustomTable from '../custom/custom-table';
import FilterWrapper from '../filter/filter-wrapper';
import BreadcrumbsWrapper from './breadcrumbs-wrapper';
import { ColumnsType } from 'antd/es/table';

type UseQueryFunction<T extends Record<string, unknown>> = (
  apiFilter: Record<string, unknown>
) => UseQueryResult<T, unknown>;

type Props<
  TypeListParams extends Record<string, unknown>,
  DataRecord extends Record<string, unknown>
> = {
  listBreadcrumbs: BreadcrumbsType[];
  scrollX?: number;
  name: string;
  path?: string;
  filterSchema: TFilterSchema<TypeListParams>[];
  useQueryFn: UseQueryFunction<{
    total: number;
    data: DataRecord[];
  }>;
  columns: ColumnsType<DataRecord>;
};

const ListManagementWrapper = <
  TypeListParams extends Record<string, unknown>,
  DataRecord extends Record<string, unknown>
>({
  name,
  path,
  listBreadcrumbs,
  filterSchema,
  columns,
  useQueryFn,
  scrollX,
}: Props<TypeListParams, DataRecord>) => {
  const {
    filter,
    apiFilter,
    schemaList,
    onPageChange,
    onFilterChange,
    onResetFilter,
  } = useFilter(filterSchema);

  const { data, isLoading, isFetching } = useQueryFn(apiFilter);

  return (
    <BreadcrumbsWrapper breadcrumbs={listBreadcrumbs}>
      <FilterWrapper
        className="mb-4"
        onReset={onResetFilter}
        onChange={onFilterChange}
        schemaList={schemaList}
        filter={filter}
      />
      <Card
        title={`Danh sách ${name}`}
        extra={
          path && (
            <CommonButton action="add" href={`${path}/add`} className="flex">
              Tạo mới {name}
            </CommonButton>
          )
        }
        loading={isLoading}
      >
        <CustomTable
          isLoading={isFetching}
          dataSource={data?.data}
          onChange={onPageChange}
          pagination={{
            current: filter.page as number,
            pageSize: filter.limit as number,
            total: data?.total,
          }}
          {...{
            name,
            columns,
            scrollX,
          }}
        />
      </Card>
    </BreadcrumbsWrapper>
  );
};

export default ListManagementWrapper;
