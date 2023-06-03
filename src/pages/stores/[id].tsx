import { BreadcrumbsWrapper, StatusChange } from '@/components';
import {
  STORE_BREADCRUMBS,
  STORE_STATUS_LIST,
  StoreForm,
  useStoreDetailQuery,
  useUpdateStoreQuery,
} from '@/features/store';
import { Card, Typography } from 'antd';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

const StoreDetail: FC = () => {
  const { id } = useParams();
  const { data, isLoading, isFetching } = useStoreDetailQuery(+id!);
  const { mutate, isLoading: isUpdating } = useUpdateStoreQuery(+id!);

  const handleChangeStatus = (status: number) => {
    mutate({ status });
  };

  return (
    <BreadcrumbsWrapper
      breadcrumbs={STORE_BREADCRUMBS.detail()}
      isLoading={isUpdating || isFetching}
    >
      <Typography.Title level={4} className="m-0">
        Chi tiết cửa hàng #{id}
      </Typography.Title>
      <Card
        title="Thông tin chung"
        extra={
          <StatusChange
            value={data?.status}
            onChange={handleChangeStatus}
            statusList={STORE_STATUS_LIST}
          />
        }
        loading={isLoading}
      >
        <StoreForm data={data} />
      </Card>
    </BreadcrumbsWrapper>
  );
};

export default StoreDetail;
