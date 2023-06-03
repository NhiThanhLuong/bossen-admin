import { CommonButton } from '@/components';
import { Card, Divider, Form, List } from 'antd';
import { FC } from 'react';
import FaqItem from './faq-item';

type Props = {
  isLoading: boolean;
};

const FaqList: FC<Props> = ({ isLoading }) => {
  return (
    <Form.List name="FAQs">
      {(fields, { add, remove }) => (
        <Card
          title="Danh sách câu hỏi thường gặp FAQ"
          loading={isLoading}
          extra={
            <CommonButton action="add" onClick={add} className="flex">
              Thêm câu hỏi
            </CommonButton>
          }
        >
          <List
            dataSource={fields}
            grid={{ column: 1 }}
            renderItem={(field) => (
              <List.Item key={field.key}>
                <div className="flex justify-between gap-2 items-center">
                  <FaqItem field={field} />

                  <CommonButton
                    action="delete"
                    onClick={() => remove(field.name)}
                    className="flex"
                  >
                    Xóa câu hỏi
                  </CommonButton>
                </div>
                <Divider />
              </List.Item>
            )}
          />
        </Card>
      )}
    </Form.List>
  );
};

export default FaqList;
