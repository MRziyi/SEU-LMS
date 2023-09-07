import { InboxOutlined } from '@ant-design/icons';
import { Modal, message, Divider, Button, Upload, Space } from 'antd';
import { useEffect, useState } from 'react';
import EditorModal from './editorModal';
import { getHomeworkIntro, postHomeworkUrl } from '../../../service';
import { useModel } from 'umi';
import { HomeworkData } from '../../../data';

const { Dragger } = Upload;

interface modalCtrl {
  syllabusID: string;
}

const HomeworkModal: React.FC<modalCtrl> = ({ syllabusID }) => {
  const [visiable, setVisiable] = useState(false);
  const [currentSyllabusID, setCurrentSyllabusID] = useState<string>('');
  const [fileUrl, setFileUrl] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [homeworkData, setHomeworkData] = useState<HomeworkData>();
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingIntro, setLoadingIntro] = useState(false);

  useEffect(() => {
    if (syllabusID !== '') setCurrentSyllabusID(syllabusID);
  }, [syllabusID]);

  async function postHomeworkUrlAdaptor() {
    setLoadingUpload(true);
    try {
      const result = await postHomeworkUrl(currentSyllabusID, fileName, fileUrl);
      if (result.code == 0) {
        message.success('作业上传成功');
        setVisiable(false);
      }
    } catch {}
    setLoadingUpload(false);
  }

  async function getHomeworkIntroAdaptor() {
    setLoadingIntro(true);
    try {
      const result = await getHomeworkIntro(currentSyllabusID);
      if (result.data) {
        setHomeworkData(result.data.homeworkData);
        message.success('作业信息获取成功');
        setVisiable(false);
      }
    } catch {}
    setLoadingIntro(false);
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
        okButtonProps={{ loading: loadingUpload }}
        onOk={postHomeworkUrlAdaptor}
        onCancel={() => {
          setVisiable(false);
          return true;
        }}
      >
        <Space
          direction="horizontal"
          size="large"
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <>
            <div
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: '18px',
              }}
            >
              <strong>作业名：</strong>
              {/* {homeworkInfoData?.homeworkName} */}
            </div>
            <div
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: '18px',
              }}
            >
              <strong>描述：</strong>
              {/* {homeworkInfoData?.homeworkDescription} */}
            </div>
          </>
          <Divider type="vertical" dashed>
            作业上传
          </Divider>
          <Space
            direction="vertical"
            size="large"
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <EditorModal syllabusID={currentSyllabusID} />
            <Divider type="vertical" dashed>
              或者
            </Divider>
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
          </Space>
        </Space>
      </Modal>
    </>
  );
};
export default HomeworkModal;
