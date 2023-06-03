import { useApp } from '@/hooks';
import { UploadProps, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import { FC, useEffect, useState } from 'react';
import { beforeUpload, getBase64 } from './upload';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { localToken } from '@/utils';

type Props = UploadProps & {
  actionAPI?: string;
  //   className: string
  //   initImageURL: string;
  isDisabled?: boolean;
  value?: string;
  onChange?: (_value: unknown) => void;
  //   onChangeCallback: string
  //   height = 128,
  //   isGetLink = false,
};

const UploadImage: FC<Props> = ({
  actionAPI,
  //   initImageURL,
  isDisabled,
  value,
  onChange,
  ...props
}) => {
  const { message } = useApp();
  const imageURL = value;
  //   const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     if (initImageURL) {
  //       setImageURL(initImageURL);
  //     }
  //   }, [initImageURL]);

  const handleChange: UploadProps['onChange'] = (info) => {
    const status = info.file.status;
    //   const imageId = info.file.response?.result?.id || null;
    const imageId = info.file;
    //   const imageLink = info.file.response?.result?.variants[1080]?.link;

    //   const paramsOnChange = isGetLink ? imageLink : imageId;

    if (status === 'uploading') {
      setLoading(true);
      return;
    }

    if (status === 'done') {
      //   getBase64(info.file.originFileObj as RcFile, (imgURL) => {
      //     setImageURL(imgURL as string);
      //   });
      setLoading(false);

      onChange!(
        imageId
        //   onChangeCallback ? onChangeCallback(paramsOnChange) : paramsOnChange
      );
    } else {
      setLoading(false);
      void message.error('Upload hình thất bại');
    }
  };

  const uploadProps: UploadProps = {
    accept: 'image/png, image/jpeg, image/webp',
    action: actionAPI,
    listType: 'picture-card',
    disabled: loading || isDisabled,
    headers: {
      authorization: `Bearer ${localToken as string}`,
    },
    showUploadList: false,
    onChange: handleChange,
    beforeUpload: (file) => beforeUpload(message, file),
    //   height,
  };

  return (
    <Upload {...uploadProps} {...props}>
      {loading ? (
        <LoadingOutlined />
      ) : imageURL ? (
        <img
          className={'w-full h-full object-contain'}
          src={imageURL}
          alt="avatar"
        />
      ) : (
        <PlusOutlined />
      )}
      {!imageURL && <div className="ml-1">Chọn ảnh</div>}
    </Upload>
  );
};

export default UploadImage;
