import {
  App,
  Button,
  Card,
  Checkbox,
  ConfigProvider,
  Form,
  Image,
  Input,
  Row,
  Typography,
  theme,
} from 'antd';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReadLocalStorage, useSessionStorage } from 'usehooks-ts';

import { COLOR, DASHBOARD_PATH } from '@/data/constant';
import { LoginValues, useAuthStore, useLoginMutation } from '@/features/auth';
import { validator, validatorFn } from '@/utils';
import { AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import styled from 'styled-components';

type Values = LoginValues & {
  isSaved?: boolean;
};

const Login: FC = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const login = useAuthStore((state) => state.login);
  const tokenLocal = useReadLocalStorage('token');

  const [savedData, setSavedData] = useSessionStorage<
    Partial<Values> | undefined
  >('savedData', {
    isSaved: false,
  });

  const { mutate, isLoading } = useLoginMutation();

  useEffect(() => {
    if (token || tokenLocal) {
      navigate(DASHBOARD_PATH, { replace: true });
    }
  }, [navigate, token, tokenLocal]);

  const handleFinish = (values: Values) => {
    const { isSaved, ...formValues } = values;
    setSavedData(
      isSaved
        ? values
        : {
            isSaved: false,
          }
    );
    mutate(formValues, {
      onSuccess: ({ token }) => {
        login(token);
      },
      onError: () => {
        void message.error('Email hoặc mật khẩu không đúng');
      },
    });
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: COLOR.LIGHT_PRIMARY,
          colorTextPlaceholder: COLOR.LIGHT_PRIMARY,
          colorText: COLOR.LIGHT_PRIMARY,
        },
      }}
    >
      <div
        className="grid h-full w-full justify-end"
        style={{
          background: 'url(/bg-login.png) no-repeat center/cover',
        }}
      >
        <StyledCard>
          <Image
            src="/logo.svg"
            alt="Brand logo"
            preview={false}
            width="30vh"
            className="mb-8"
          />
          <Typography.Text className="slogan">
            We care your pets
          </Typography.Text>
          <Form
            initialValues={savedData}
            onFinish={handleFinish}
            disabled={isLoading}
          >
            <Form.Item
              name="email"
              rules={validator(['email', 'required'])}
              className="mb-[2vh]"
            >
              <Input
                prefix={<AiOutlineUser />}
                size="large"
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={validator(['required', 'noWhiteSpace']).concat(
                validatorFn('minAndMax')(8, 16)
              )}
              className="mb-[2vh]"
            >
              <Input.Password
                prefix={<AiOutlineLock />}
                placeholder="Mật khẩu"
                size="large"
              />
            </Form.Item>
            <Row className="items-center justify-between">
              <Form.Item
                name="isSaved"
                valuePropName="checked"
                className="mb-0"
              >
                <Checkbox>
                  <span className="text-black">Ghi nhớ</span>
                </Checkbox>
              </Form.Item>
              <span>Quên mật khẩu</span>
            </Row>

            <Button htmlType="submit" type="primary">
              <span className="text-xl font-bold">Đăng nhập</span>
            </Button>
          </Form>
          <div className="mt-4 text-black">
            <span className="block">Version 1.0.0</span>
            <span className="">Copyright &copy; 2023 BOSSEN</span>
          </div>
        </StyledCard>
      </div>
    </ConfigProvider>
  );
};

const StyledCard = styled(Card)`
  width: 40vw;
  min-width: 58vh;
  max-height: 90vh;
  text-align: center;
  margin: 4vh 2rem 2vh;
  border: 1px solid ${COLOR.LIGHT_PRIMARY};
  border-radius: 32px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

  .slogan {
    display: block;
    margin-bottom: 2vh;

    font-family: 'Arial';
    font-style: italic;
    font-weight: 700;
    font-size: 6vh;
    line-height: 1;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  button {
    width: 327px;
    height: 48px;
    border-radius: 36px;
  }

  input {
    font-weight: 700;
  }
`;

export default Login;
