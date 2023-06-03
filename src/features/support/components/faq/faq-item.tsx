import { TypoTextStrong } from '@/components';
import { validator } from '@/utils';
import { Descriptions, Form, FormListFieldData, Input } from 'antd';
import { FC } from 'react';

type Props = {
  field: FormListFieldData;
};

const FaqItem: FC<Props> = ({ field }) => {
  return (
    <Descriptions
      column={1}
      labelStyle={{
        width: 80,
        display: 'flex',
        alignItems: 'center',
      }}
      contentStyle={{
        marginLeft: 12,
      }}
    >
      <Descriptions.Item
        label={<TypoTextStrong>Câu hỏi {field.name + 1}</TypoTextStrong>}
      >
        <Form.Item
          {...field}
          name={[field.name, 'title']}
          className="mb-0 w-full"
          rules={validator('required')}
        >
          <Input placeholder="Nhập câu hỏi" />
        </Form.Item>
      </Descriptions.Item>

      <Descriptions.Item label={<TypoTextStrong>Câu trả lời</TypoTextStrong>}>
        <Form.Item
          {...field}
          name={[field.name, 'answer']}
          className="mb-0 w-full"
          rules={validator('required')}
        >
          <Input.TextArea
            placeholder="Nhập câu trả lời"
            autoSize={{ maxRows: 6 }}
          />
        </Form.Item>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default FaqItem;
