import { ColorSelect, LoadingImage, RequiredLabel } from '@/components';
import { GENDER_LIST } from '@/data/constant';
import { DataMember, MEMBER_STATUS_LIST } from '@/features/member';
import { formatDateToString, validator } from '@/utils';
import {
  Card,
  DatePicker,
  Descriptions,
  Form,
  Input,
  Radio,
  Typography,
} from 'antd';
import { FC } from 'react';

const { Text } = Typography;

type Props = {
  data?: DataMember;
  isLoading: boolean;
};

const GeneralInfo: FC<Props> = ({ data, isLoading }) => {
  return (
    <Card title="Thông tin chung" loading={isLoading}>
      <Descriptions bordered column={1} labelStyle={{ width: 200 }}>
        <Descriptions.Item label={<Text>Ảnh đại diện</Text>}>
          <LoadingImage
            height={200}
            alt="Ảnh đại diện của thành viên"
            src={data?.avatar as string}
          />
        </Descriptions.Item>

        <Descriptions.Item label={<Text>ID</Text>}>
          <Text>{data?.id}</Text>
        </Descriptions.Item>

        <Descriptions.Item label={<RequiredLabel label="Họ và tên" />}>
          <Form.Item
            className="mb-0"
            name="name"
            rules={validator(['required', 'name'])}
          >
            <Input placeholder="Họ và tên" />
          </Form.Item>
        </Descriptions.Item>

        <Descriptions.Item label={<Text>CMND/ CCCD</Text>}>
          <Text>Chưa rõ fieldname</Text>
        </Descriptions.Item>

        <Descriptions.Item label={<Text>Mã thành viên </Text>}>
          <Text>{data?.stringId}</Text>
        </Descriptions.Item>

        <Descriptions.Item label={<Text>Chọn giới tính</Text>}>
          <Form.Item name="gender" className="mb-0">
            <Radio.Group options={GENDER_LIST} />
          </Form.Item>
        </Descriptions.Item>

        <Descriptions.Item label={<RequiredLabel label="Chọn ngày sinh" />}>
          <Form.Item
            name="dateOfBirth"
            className="mb-0"
            rules={validator('required')}
          >
            <DatePicker
              format="DD/MM/YYYY"
              placeholder="Chọn ngày sinh"
              className="w-40"
              allowClear={false}
            />
          </Form.Item>
        </Descriptions.Item>

        <Descriptions.Item label={<Text>Trạng thái</Text>}>
          <Form.Item name="status" className="mb-0">
            <ColorSelect options={MEMBER_STATUS_LIST} className="!w-40" />
          </Form.Item>
        </Descriptions.Item>

        <Descriptions.Item label={<Text>Thời gian tạo</Text>}>
          <Text>
            {formatDateToString(data?.createdAt, 'DD/MM/YYYY HH:mm:ss')}
          </Text>
        </Descriptions.Item>

        <Descriptions.Item label={<Text>Hệ máy (lần đầu)</Text>}>
          <Text>{data?.firstLogin?.device}</Text>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default GeneralInfo;
