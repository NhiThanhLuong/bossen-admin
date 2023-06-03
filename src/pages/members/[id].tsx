import { BreadcrumbsWrapper, MainAction } from '@/components';
import {
  ContactInfo,
  GeneralInfo,
  LoginHistory,
  MEMBER_BREADCRUMBS,
  MemberUpdateData,
  ScoreInfo,
  useMemberDetailQuery,
  useUpdateMemberMutation,
} from '@/features/member';
import { differentObject } from '@/utils';
import { Col, Form, Row, Space } from 'antd';
import dayjs from 'dayjs';
import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useBoolean } from 'usehooks-ts';

const MemberDetail: FC = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const { value: isChanged, setTrue, setFalse } = useBoolean(false);
  const { data, isLoading, isFetching } = useMemberDetailQuery(+id!);
  const { mutate, isLoading: isUpdating } = useUpdateMemberMutation(+id!);

  const initialValues = useMemo(
    () =>
      data && {
        ...data,
        dateOfBirth: data.dateOfBirth && dayjs(data.dateOfBirth),
      },
    [data]
  );

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  const handleReset = () => {
    form.resetFields();
    setFalse();
  };

  const handleFinish = (values: MemberUpdateData) => {
    const dataChanged = differentObject(
      values,
      initialValues as MemberUpdateData
    );
    if (values.dateOfBirth) {
      dataChanged.dateOfBirth = dayjs(values.dateOfBirth).format('YYYY-MM-DD');
    }

    mutate(dataChanged, {
      onSuccess: () => {
        setFalse();
      },
    });
  };

  return (
    <BreadcrumbsWrapper
      breadcrumbs={MEMBER_BREADCRUMBS.detail()}
      isLoading={isFetching}
    >
      <Form
        form={form}
        initialValues={initialValues}
        onValuesChange={setTrue}
        onReset={handleReset}
        onFinish={handleFinish}
      >
        <Row gutter={[16, 16]} className="w-full">
          <Col sm={24} xl={12}>
            <GeneralInfo data={data} isLoading={isLoading} />
          </Col>
          <Col sm={24} xl={12}>
            <Space className="w-full" direction="vertical" size={16}>
              <ContactInfo data={data?.oAuthInfor} isLoading={isLoading} />
              <ScoreInfo data={data?.memberCard} isLoading={isLoading} />
            </Space>
          </Col>
          <Col span={24}>
            <MainAction
              onOk={form.submit}
              onCancel={handleReset}
              isCancelDisabled={!isChanged}
              isOkLoading={isUpdating}
              isOkDisabled={!isChanged}
            />
          </Col>
          <Col span={24}>
            <LoginHistory data={data?.loginHistories} isLoading={isLoading} />
          </Col>
        </Row>
      </Form>
    </BreadcrumbsWrapper>
  );
};

export default MemberDetail;
