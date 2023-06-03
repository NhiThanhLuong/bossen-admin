import { TypoTextStrong } from '@/components';
import { validator } from '@/utils';
import { Card, Descriptions, Form, Input } from 'antd';
import { FC } from 'react';

type Props = {
  isLoading: boolean;
};

const ReceptionInformation: FC<Props> = ({ isLoading }) => {
  return (
    <Card title="Thông tin tiếp nhận hỗ trợ" loading={isLoading}>
      <Descriptions
        bordered
        column={1}
        labelStyle={{
          width: 200,
        }}
      >
        <Descriptions.Item label={<TypoTextStrong>Tổng đài</TypoTextStrong>}>
          <Form.Item name="phoneNumber" className="mb-0">
            <Input placeholder="Nhập SDT tổng đài" />
          </Form.Item>
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <TypoTextStrong>
              Trò chuyện trực tuyến trên Messenger
            </TypoTextStrong>
          }
        >
          <Form.Item name="chat" className="mb-0">
            <Input placeholder="Trò chuyện trực tuyến" />
          </Form.Item>
        </Descriptions.Item>

        <Descriptions.Item
          label={<TypoTextStrong>Email hỗ trợ</TypoTextStrong>}
        >
          <Form.Item name="email" className="mb-0" rules={validator('email')}>
            <Input placeholder="Nhập email tại đây" />
          </Form.Item>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default ReceptionInformation;
