import { Modal, message, Upload } from 'antd';
import { useEffect, useState } from 'react';
import type { UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

interface modalCtrl {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  syllabusID: string;
}

const { Dragger } = Upload;

const props: UploadProps = {
    style: { },
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

const UploadFileModal: React.FC<modalCtrl> = ({ open, setOpen, syllabusID }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(open);
  }, [open]);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <Modal
      title={'课件资料'}
      width={700}
      open={open}
      okButtonProps={{ style: { display: 'none' } }}
      onCancel={() => {
        setShow(false);
        return true;
      }}
    >
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text" style={{ marginLeft: '20px', marginRight: '20px' }}>
          点击或拖拽文件到此区域以上传
        </p>
        <p className="ant-upload-hint">支持单选和多选文件</p>
      </Dragger>
      
    </Modal>
  );
};
export default UploadFileModal;
