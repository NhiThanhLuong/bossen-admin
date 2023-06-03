import { ColorSelect, RequiredLabel, UploadImage } from '@/components';
import { GENDER_LIST } from '@/data/constant';
import { validator, validatorFn } from '@/utils';
import {
  Col,
  DatePicker,
  Descriptions,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import { FC } from 'react';
import { USER_ROLE_LIST, USER_STATUS_LIST } from '../constant';
import { DataUser } from '../services/type';

type Props = {
  data?: DataUser;
};

const UserForm: FC<Props> = ({ data }) => {
  return (
    <Row>
      <Col>
        <Form.Item name={['images', 'avatar']}>
          <UploadImage />
        </Form.Item>
      </Col>
      <Col>
        <Descriptions bordered column={1} labelStyle={{ width: 200 }}>
          <Descriptions.Item label={<RequiredLabel label="Họ và tên" />}>
            <Form.Item
              name="name"
              className="mb-0"
              rules={validator('required')}
            >
              <Input placeholder="Họ và tên" />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label={<RequiredLabel label="Số điện thoại" />}>
            <Form.Item
              name="phone"
              className="mb-0"
              rules={validator(['required', 'number'])}
            >
              <Input placeholder="Nhập số điện thoại" className="w-40" />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label={<RequiredLabel label="Chức vụ" />}>
            <Form.Item
              name="type"
              className="mb-0"
              rules={validator('required')}
            >
              <Select
                options={USER_ROLE_LIST}
                placeholder="Chọn chức vụ"
                className="!w-40"
              />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label={<RequiredLabel label="Email" />}>
            <Form.Item
              name="email"
              className="mb-0"
              rules={validator(['required', 'email'])}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>
          </Descriptions.Item>

          {data ? (
            <>
              <Descriptions.Item
                label={<Typography.Text>Trạng thái</Typography.Text>}
              >
                <Form.Item name="status" className="mb-0">
                  <ColorSelect options={USER_STATUS_LIST} className="!w-40" />
                </Form.Item>
              </Descriptions.Item>

              <Descriptions.Item
                label={<Typography.Text>Thời điểm tạo</Typography.Text>}
              >
                {data.createdAt &&
                  dayjs(data.createdAt).format('DD/MM/YYYY HH:mm:ss')}
              </Descriptions.Item>
            </>
          ) : (
            <Descriptions.Item label={<RequiredLabel label="Mật khẩu" />}>
              <Form.Item
                name="password"
                className="mb-0"
                rules={validator(['required', 'noWhiteSpace']).concat(
                  validatorFn('minAndMax')(8, 16)
                )}
              >
                <Input.Password placeholder="Nhập mật khẩu" className="w-40" />
              </Form.Item>
            </Descriptions.Item>
          )}
        </Descriptions>
      </Col>
    </Row>
  );
};

export default UserForm;
