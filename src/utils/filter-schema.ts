import { TFilterSchema } from '@/ts/types';
import validator from './validate';

export const filterId: TFilterSchema<Record<'id', number>> = {
  name: 'id',
  type: 'number',
  element: 'number',
  placeholder: 'ID',
  fieldProps: {
    controls: false,
  },
};

export const filterPhoneNumber: TFilterSchema<Record<'phone', string>> = {
  name: 'phone',
  type: 'string',
  element: 'input',
  placeholder: 'Số điện thoại',
  formItemProps: {
    rules: validator('number'),
  },
};
