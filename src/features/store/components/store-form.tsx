import { FC } from 'react';
import { DataStore } from '../services/type';
import { Descriptions, Typography } from 'antd';
import { formatDateToString } from '@/utils';

const { Text } = Typography;

type Props = {
  data?: DataStore;
};

const StoreForm: FC<Props> = ({ data }) => {
  return (
    <Descriptions bordered column={1} labelStyle={{ width: 240 }}>
      <Descriptions.Item label={<Text>ID</Text>}>{data?.id}</Descriptions.Item>

      <Descriptions.Item label={<Text>Tên cửa hàng</Text>}>
        {data?.name}
      </Descriptions.Item>

      <Descriptions.Item label={<Text>Mã cửa hàng</Text>}>
        {data?.storeId}
      </Descriptions.Item>

      <Descriptions.Item label={<Text>Cửa hàng trưởng</Text>}>
        {data?.manager}
      </Descriptions.Item>

      <Descriptions.Item label={<Text>Thời gian tạo</Text>}>
        {formatDateToString(data?.createdAt, 'DD/MM/YYYY HH:mm:ss')}
      </Descriptions.Item>

      <Descriptions.Item label={<Text>Thời gian cập nhật gần nhất</Text>}>
        {formatDateToString(data?.lastUpdate, 'DD/MM/YYYY HH:mm:ss')}
      </Descriptions.Item>

      <Descriptions.Item label={<Text>Giờ hoạt động</Text>}>
        {data?.timeWork}
      </Descriptions.Item>

      <Descriptions.Item label={<Text>Tỉnh/ Thành</Text>}>
        {data?.cityCode}
      </Descriptions.Item>

      <Descriptions.Item label={<Text>Quận/ Huyện</Text>}>
        {data?.districtCode}
      </Descriptions.Item>

      <Descriptions.Item label={<Text>Phường/ Xã</Text>}>
        {data?.wardCode}
      </Descriptions.Item>

      <Descriptions.Item label={<Text>Địa chỉ</Text>}>
        {data?.address}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default StoreForm;
