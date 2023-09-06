import { InboxOutlined } from '@ant-design/icons';
import { Modal, message, Divider, Button, Upload } from 'antd';
import { useEffect, useState } from 'react';
import EditorModal from './editorModal';
import { postHomeworkUrl } from '../../../service';
import { useModel } from 'umi';

const { Dragger } = Upload;

interface modalCtrl {
  syllabusID: string;
}

const HomeworkModal: React.FC<modalCtrl> = ({ syllabusID }) => {
  const [visiable, setVisiable] = useState(false);
  const [currentSyllabusID, setCurrentSyllabusID] = useState<string>('');
  const [fileUrl, setFileUrl] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const { initialState } = useModel('@@initialState');

  useEffect(() => {
    if (syllabusID !== '') setCurrentSyllabusID(syllabusID);
  }, [syllabusID]);

  async function postHomeworkUrlAdaptor() {
    setLoading(true);
    if (initialState && initialState.currentUser)
      try {
        const result = await postHomeworkUrl(
          currentSyllabusID,
          initialState.currentUser.id,
          fileName,
          fileUrl,
        );
        if (result.code == 0) {
          message.success('作业上传成功');
        }
      } catch {}
    setLoading(false);
  }

  return (
    <>
      <Button
        style={{ marginRight: '5px' }}
        type="text"
        onClick={() => {
          setVisiable(true);
        }}
      >
        查看作业
      </Button>
      <Modal
        title={'作业提交'}
        width={600}
        open={visiable}
        okButtonProps={{ loading: loading }}
        onOk={postHomeworkUrlAdaptor}
        onCancel={() => {
          setVisiable(false);
          return true;
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <EditorModal syllabusID={currentSyllabusID} />
          <Divider dashed>或者</Divider>
          <Dragger
            style={{}}
            name="file"
            multiple={false}
            action="/api/upload/file"
            onChange={(info) => {
              const { status } = info.file;
              if (status === 'done') {
                if (info.file.response && info.file.response.code == 0) {
                  setFileName(info.file.fileName ? info.file.fileName : '');
                  setFileUrl(info.file.response.data);
                }
              } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text" style={{ marginLeft: '20px', marginRight: '20px' }}>
              点击或拖拽文件到此区域以上传
            </p>
            <p className="ant-upload-hint">多个课件请多次上传</p>
          </Dragger>
        </div>
      </Modal>
    </>
  );
};
export default HomeworkModal;
