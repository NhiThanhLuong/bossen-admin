import { findObjInArrByKey, formatDateToString } from '@/utils';
import { Card, Descriptions, Typography } from 'antd';
import { FC } from 'react';
import { MEMBER_LEVEL_LIST } from '../constant';
import { DataMember } from '../services/type';

const { Text } = Typography;

type Props = {
  data?: DataMember['memberCard'];
  isLoading: boolean;
};

const ScoreInfo: FC<Props> = ({ data, isLoading }) => {
  return (
    <Card title="Thông tin điểm và hạng thẻ" loading={isLoading}>
      <Descriptions bordered column={1} labelStyle={{ width: 180 }}>
        <Descriptions.Item label={<Text>Điểm tích lũy</Text>}>
          <Text>{data?.point ?? 0}</Text>
        </Descriptions.Item>

        <Descriptions.Item label={<Text>Hạng thẻ</Text>}>
          <Text>
            {findObjInArrByKey(MEMBER_LEVEL_LIST, data?.level)?.label}
          </Text>
        </Descriptions.Item>

        <Descriptions.Item label={<Text>Cập nhật đến ngày</Text>}>
          <Text>{formatDateToString(data?.updatedAt, 'DD/MM/YYYY')}</Text>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default ScoreInfo;
