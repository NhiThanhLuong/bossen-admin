import { Card, Descriptions, List, Typography } from 'antd';
import { FC } from 'react';
import { DataMember } from '../services/type';

const { Text } = Typography;

type Props = {
  data?: DataMember['loginHistories'];
  isLoading: boolean;
};

const LoginHistory: FC<Props> = ({ data, isLoading }) => {
  return (
    <Card title="Lịch sử đăng nhập" loading={isLoading}>
      <List
        grid={{ column: 1 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Descriptions column={2}>
              <Descriptions.Item label={<Text>Thời gian</Text>}>
                {item.createdAt}
              </Descriptions.Item>

              <Descriptions.Item label={<Text>Thiết bị</Text>}>
                {item.device}
              </Descriptions.Item>
            </Descriptions>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default LoginHistory;
