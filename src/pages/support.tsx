import { BreadcrumbsWrapper, MainAction } from '@/components';
import {
  FaqList,
  ReceptionInformation,
  ReceptionTime,
  SUPPORT_BREADCRUMBS,
  useSupportQuery,
  useUpdateSupportMutation,
} from '@/features/support';
import { differentObject } from '@/utils';
import { Col, Form, Row } from 'antd';
import dayjs from 'dayjs';
import { FC, useEffect, useMemo } from 'react';
import { useBoolean } from 'usehooks-ts';

const Support: FC = () => {
  const [form] = Form.useForm();
  const { value: isChanged, setTrue, setFalse } = useBoolean(false);
  const { data, isFetching, isLoading } = useSupportQuery();
  const { mutate, isLoading: isUpdating } = useUpdateSupportMutation();

  const initialValues = useMemo(
    () =>
      data && {
        ...data,
        startTime: data.startTime && dayjs(data.startTime, 'HH:mm'),
        endTime: data.endTime && dayjs(data.endTime, 'HH:mm'),
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

  const handleFinish = (values: NonNullable<typeof initialValues>) => {
    const dataChanged = differentObject(values, initialValues);

    mutate(
      {
        ...dataChanged,
        startTime: dataChanged.startTime
          ? dayjs(dataChanged.startTime).format('HH:mm')
          : undefined,

        endTime: dataChanged.endTime
          ? dayjs(dataChanged.endTime).format('HH:mm')
          : undefined,

        FAQs: dataChanged.FAQs?.map(({ title, answer }) => ({
          title,
          answer,
        })),
      },
      {
        onSuccess: () => {
          setFalse();
        },
      }
    );
  };

  return (
    <BreadcrumbsWrapper
      breadcrumbs={SUPPORT_BREADCRUMBS}
      isLoading={isFetching}
    >
      <Form
        form={form}
        initialValues={initialValues}
        onFinish={handleFinish}
        onValuesChange={setTrue}
        disabled={isUpdating}
      >
        <Row gutter={[16, 16]} className="w-full">
          <Col sm={24} xxl={16}>
            <ReceptionInformation isLoading={isLoading} />
          </Col>
          <Col sm={24} xxl={8}>
            <ReceptionTime isLoading={isLoading} />
          </Col>
          <Col span={24}>
            <FaqList isLoading={isLoading} />
          </Col>
        </Row>
        <MainAction
          onOk={form.submit}
          onCancel={handleReset}
          cancelText="Hủy bỏ thay đổi"
          isCancelDisabled={!isChanged}
          // isOkLoading={isUpdating}
          isOkDisabled={!isChanged}
        />
      </Form>
    </BreadcrumbsWrapper>
  );
};

export default Support;
