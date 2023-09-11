import { Modal, Form, message, Button, Rate, Card } from 'antd';
import { useEffect, useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { request } from 'umi';

interface modalInterface {
  title: string;
  body: string;
}

const HomeworkPreviewModal: React.FC<modalInterface> = ({ title,body }) => {
  const [currentTitle, setCurrentTitleID] = useState<string>('');
  const [currentBody, setCurrentBodyID] = useState<string>('');
  const [visiable, setVisiable] = useState(false);

  useEffect(() => {
    if (title !== '') setCurrentTitleID(title);
  }, [title]);

  useEffect(() => {
    if (body !== '') setCurrentBodyID(body);
  }, [body]);

  return (
    <>
      <Button onClick={() => setVisiable(true)} type="text">
        作业预览
      </Button>
      <Modal
        title={currentTitle}
        width={500}
        open={visiable}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={() => {
          setVisiable(false);
          return true;
        }}
      >
      <div dangerouslySetInnerHTML={{ __html: currentBody }} />
  
      </Modal>
    </>
  );
};
export default HomeworkPreviewModal;
