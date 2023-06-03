import { BreadcrumbsWrapper, MainAction } from '@/components';
import { GENDER, USER_PATH } from '@/data/constant';
import {
  DataUser,
  USER_BREADCRUMBS,
  USER_NAME,
  UserForm,
  useAddUserMutation,
} from '@/features/user';
import { Button, Card, Form } from 'antd';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const UserAdd: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate, isLoading } = useAddUserMutation();

  const handleFinish = (values: Partial<DataUser>) => {
    mutate(values);
  };

  const setDefaultPassword = useCallback(() => {
    form.setFieldValue('password', '123456a@');
  }, [form]);

  return (
    <BreadcrumbsWrapper breadcrumbs={USER_BREADCRUMBS.add()}>
      <Card title={`Thêm ${USER_NAME}`}>
        <Form
          form={form}
          onFinish={handleFinish}
          initialValues={{
            gender: GENDER.MALE.value,
          }}
          disabled={isLoading}
        >
          <UserForm />
        </Form>
        <div className="flex justify-end mt-4">
          <Button onClick={setDefaultPassword}>
            Mật khẩu mặc định là:{' '}
            <strong className="text-base"> 123456a@</strong>
          </Button>
        </div>
        <MainAction
          isAddType
          cancelText="Trở về danh sách"
          onOk={form.submit}
          onCancel={() => navigate(USER_PATH)}
          isOkLoading={isLoading}
          isCancelDisabled={isLoading}
        />
      </Card>
    </BreadcrumbsWrapper>
  );
};

export default UserAdd;
