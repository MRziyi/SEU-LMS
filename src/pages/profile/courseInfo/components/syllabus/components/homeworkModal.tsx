import { UploadOutlined } from '@ant-design/icons';
import { Modal, message, Divider, Button, Upload, Space, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import EditorModal from './editorModal';
import { getHomeworkIntro, postHomeworkUrl } from '../../../service';
import { HomeworkData } from '../../../data';
import moment from 'moment';

const { Countdown } = Statistic;
interface modalCtrl {
  syllabusID: string;
  parentRefresh:()=>void;
}

const HomeworkModal: React.FC<modalCtrl> = ({ syllabusID, parentRefresh }) => {
  const [visiable, setVisiable] = useState(false);
  const [currentSyllabusID, setCurrentSyllabusID] = useState<string>('');
  const [fileUrl, setFileUrl] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [homeworkData, setHomeworkData] = useState<HomeworkData>({} as HomeworkData);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingIntro, setLoadingIntro] = useState(false);

  const [historyHWStatus, setHistoryHWStatus] = useState<number>(0);//默认提交状态是0，未提交

  useEffect(() => {
    if (syllabusID !== '') {
      setCurrentSyllabusID(syllabusID);
    }
  }, [syllabusID]);

  async function postHomeworkUrlAdaptor() {
    if (fileUrl === '') {
      message.warning('请先选择文件再上传');
      return;
    }
    setLoadingUpload(true);
    try {
      const result = await postHomeworkUrl(currentSyllabusID, fileName, fileUrl);
      if (result.code == 0) {
        message.success('作业上传成功');
        setVisiable(false);
      }
    } catch {}
    setLoadingUpload(false);
    parentRefresh();



  }

  async function getHomeworkIntroAdaptor() {
    setLoadingIntro(true);
    try {
      const result = await getHomeworkIntro(currentSyllabusID);
      if (result.data) {
        setHomeworkData(result.data.homeworkData);
        if (result.data.homeworkData.homeworkHistory.name !== '') {
          setHistoryHWStatus(1);
          if (result.data.homeworkData.homeworkHistory.isText) {
            setHistoryHWStatus(1);
          }
        }
        message.success('作业信息获取成功');
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
          getHomeworkIntroAdaptor();
          setVisiable(true);
        }}
      >
        查看作业
      </Button>
      {homeworkData ? (
        <Modal
          title={'作业提交'}
          width={600}
          open={visiable}
          okButtonProps={{ style: { display: 'none' } }}
          onCancel={() => {
            setVisiable(false);
          }}
        >
          <Space
            direction="vertical"
            size="large"
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div style={{ display: 'flex' }}>
              <div style={{ flex: '1', marginRight: '20px' }}>
                <div
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: '18px',
                  }}
                >
                  <strong>作业名：</strong>
                  {homeworkData?.homeworkName}
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
                  {homeworkData?.homeworkDescription}
                </div>
                <div
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: '18px',
                  }}
                >
                  <strong style={{ color: historyHWStatus == 0 ? 'red' : 'green' }}>
                    {historyHWStatus == 0 ? '提交状态：未提交' : '提交状态：已提交'}
                  </strong>
                </div>
              </div>
              <div>
                <div
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: '18px',
                  }}
                >
                  <Countdown
                    title="DDL"
                    value={moment(homeworkData?.deadline).toDate().getTime()}
                    format="HH:mm:ss:SSS"
                  />
                </div>
              </div>
            </div>
            <Divider type="horizontal" dashed style={{ marginTop: '-5px', marginBottom: '-5px' }}>
              作业上传
            </Divider>
            <Space
              direction="horizontal"
              size="large"
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <EditorModal
                disabled={moment(homeworkData?.deadline).toDate().getTime() - Date.now() < 0}
                syllabusID={currentSyllabusID}
                haveHistory={historyHWStatus == 1}
                title={homeworkData?.homeworkHistory?.name}
                body={homeworkData?.homeworkHistory?.body}
              />
              <Divider type="vertical" />

              <>
                <Upload
                  multiple={false}
                  maxCount={1}
                  action="/api/upload/file"
                  onChange={(info) => {
                    const { status } = info.file;
                    if (status === 'done') {
                      if (info.file.response && info.file.response.code == 0) {
                        console.log("作业url",info.file.name)
                        setFileName(info.file.name ? info.file.name : '');
                        setFileUrl(info.file.response.data);
                      }
                    } else if (status === 'error') {
                      message.error(`${info.file.name} file upload failed.`);
                    }
                  }}
                >
                  <Button
                    disabled={moment(homeworkData?.deadline).toDate().getTime() - Date.now() < 0}
                    icon={<UploadOutlined />}
                    size="large"
                    style={{ marginRight: '-10px' }}
                  >
                    {historyHWStatus == 0 ? '上传作业' : '重新上传作业'}
                  </Button>
                </Upload>
                <Button
                  type="primary"
                  size="large"
                  loading={loadingUpload}
                  style={{ marginLeft: '-10px' }}
                  onClick={postHomeworkUrlAdaptor}
                >
                  提交
                </Button>
              </>
            </Space>
          </Space>
        </Modal>
      ) : (
        ''
      )}
    </>
  );
};
export default HomeworkModal;
