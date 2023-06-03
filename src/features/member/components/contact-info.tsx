import { RequiredLabel } from '@/components';
import { validator } from '@/utils';
import { Card, Descriptions, Form, Input, Typography } from 'antd';
import { FC } from 'react';
import { DataMember } from '../services/type';
import { LinkedAccount } from '../services/enums';

const { Text } = Typography;

type Props = {
  data?: DataMember['oAuthInfor'];
  isLoading: boolean;
};

const ContactInfo: FC<Props> = ({ data, isLoading }) => {
  return (
    <Card title="Thông tin liên hệ" loading={isLoading}>
      <Descriptions bordered column={1} labelStyle={{ width: 180 }}>
        <Descriptions.Item label={<RequiredLabel label="Số điện thoại" />}>
          <Form.Item
            className="mb-0"
            name="phoneNumber"
            rules={validator(['required', 'number'])}
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>
        </Descriptions.Item>

        <Descriptions.Item label={<Text>Email</Text>}>
          <Form.Item
            className="mb-0"
            name="email"
            rules={validator(['required', 'email'])}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
        </Descriptions.Item>

        {data?.provider && (
          <Descriptions.Item
            label={<Text>Tài khoản {LinkedAccount[data.provider]}</Text>}
          >
            <Text>{data?.id}</Text>
          </Descriptions.Item>
        )}
      </Descriptions>
    </Card>
  );
};

export default ContactInfo;
