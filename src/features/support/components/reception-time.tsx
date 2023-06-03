import { TypoTextStrong } from '@/components';
import { DAY_OF_WEEEK_LIST } from '@/data/constant';
import { Card, Descriptions, Form, Select, TimePicker } from 'antd';
import { FC } from 'react';

type Props = {
  isLoading: boolean;
};

const ReceptionTime: FC<Props> = ({ isLoading }) => {
  return (
    <Card title="Thời gian tiếp nhận hỗ trợ" loading={isLoading}>
      <Descriptions
        bordered
        column={1}
        labelStyle={{
          width: 200,
        }}
      >
        <Descriptions.Item
          label={<TypoTextStrong>Ngày bắt đầu trong tuần</TypoTextStrong>}
        >
          <Form.Item name="startDate" className="mb-0">
            <Select
              placeholder="Chọn ngày"
              options={DAY_OF_WEEEK_LIST}
              className="!w-32"
            />
          </Form.Item>
        </Descriptions.Item>

        <Descriptions.Item
          label={<TypoTextStrong>Ngày kết thúc trong tuần</TypoTextStrong>}
        >
          <Form.Item name="endDate" className="mb-0">
            <Select
              placeholder="Chọn ngày"
              options={DAY_OF_WEEEK_LIST}
              className="!w-32"
            />
          </Form.Item>
        </Descriptions.Item>

        <Descriptions.Item
          label={<TypoTextStrong>Giờ bắt đầu trong ngày</TypoTextStrong>}
        >
          <Form.Item name="startTime" className="mb-0">
            <TimePicker format="HH:mm" placeholder="Chọn giờ" />
          </Form.Item>
        </Descriptions.Item>

        <Descriptions.Item
          label={<TypoTextStrong>Giờ kết thúc trong ngày</TypoTextStrong>}
        >
          <Form.Item name="endTime" className="mb-0">
            <TimePicker format="HH:mm" placeholder="Chọn giờ" />
          </Form.Item>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default ReceptionTime;
