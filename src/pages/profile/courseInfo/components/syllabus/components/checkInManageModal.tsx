import { Modal, Button, Card, Row, Col, Input, Space, message } from 'antd';
import { useEffect, useState } from 'react';
import { CheckInStatus } from '../../../data';
import { createWebSocketConnection, postStartCheckedIn, postStopCheckedIn } from '../../../service';

interface modalCtrl {
  syllabusID: string;
  haveCheckedIn: number;
  onClose:()=>void;
}

const CheckInManageModal: React.FC<modalCtrl> = ({ syllabusID, haveCheckedIn,onClose }) => {
  const [currentSyllabusID, setCurrentSyllabusID] = useState<string>('');
  const [checkInStatus, setCheckInStatus] = useState<CheckInStatus>();
  const [currentHaveCheckedIn, setCurrentHaveCheckedIn] = useState<number>(); //0:未签到；1：正在签到；2：停止签到
  const [password, setPassword] = useState<string>('');
  const [isStartWebSocket, setIsStartWebSocket] = useState<boolean>(false);
  const [visiable, setVisiable] = useState(false);

  useEffect(() => {
    let socket: WebSocket | null = null;

    if (isStartWebSocket) {
      socket = createWebSocketConnection();
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'checkin_update') {
          // 更新签到情况
          setCheckInStatus(data.checkInData);
          setPassword(data.password);
        }
      };
      socket.onopen = () => {
        message.success('实时更新已开始');
      };
      socket.onclose = (event) => {
        message.error('实时更新已停止:' + event.code + ' ' + event.reason);
      };
    }

    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [isStartWebSocket]);

  //实时更新签到数据
  useEffect(() => {
    if (syllabusID && syllabusID !== '') setCurrentSyllabusID(syllabusID);
    if (haveCheckedIn) setCurrentHaveCheckedIn(haveCheckedIn);
  }, [syllabusID, haveCheckedIn]);

  const handleStartStopSign = () => {
    // 切换签到状态
    if (currentHaveCheckedIn === 1) {
      //当前是正在签到
      setCurrentHaveCheckedIn(2);
      postStopCheckedInAdaptor();
    } else {
      setCurrentHaveCheckedIn(1);
      postStartCheckedInAdaptor();
    }
  };

  async function postStartCheckedInAdaptor() {
    try {
      const result = await postStartCheckedIn(currentSyllabusID, password);
      if (result.code === 0) {
        message.success('签到已开始');
      } else {
        message.error('签到开始失败');
      }
    } catch {}
  }

  async function postStopCheckedInAdaptor() {
    try {
      const result = await postStopCheckedIn(currentSyllabusID);
      if (result.code === 0) {
        message.success('签到已停止');
      } else {
        message.error('签到停止失败');
      }
    } catch {}
  }


  return (
    <>
      <Button
        style={{ marginLeft: '5px' }}
        size="small"
        type="primary"
        onClick={() => {
          setIsStartWebSocket(true);
          setVisiable(true);
        }}
      >
        {haveCheckedIn == 0 ? '发起签到' : haveCheckedIn == 1 ? '签到详情' : '再次发起'}
      </Button>
      <Modal
        title="签到情况"
        width={500}
        open={visiable}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={() => {
          // refresh;
          console.log('进入onCancel');
          onClose();
          setIsStartWebSocket(false);
          setVisiable(false);
          
        }}
      >
        <Row gutter={24} className="card-row">
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              title="已签到人数"
              size="small"
              style={{
                textAlign: 'center',
                //backgroundColor: '#EEE4FC'
              }}
            >
              <div className="count" style={{ color: 'green', fontSize: '36px' }}>
                <strong>{checkInStatus?.isCheckedIn}</strong>
              </div>
            </Card>
          </Col>

          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              title="待签到人数"
              size="small"
              style={{
                textAlign: 'center',
                //backgroundColor: '#EEE4FC'
              }}
            >
              <div className="count" style={{ color: 'red', fontSize: '36px' }}>
                <strong>{checkInStatus?.notCheckedIn}</strong>
              </div>
            </Card>
          </Col>
        </Row>
        <Row gutter={24} className="card-row">
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Space.Compact
              style={{ width: '95%', margin: '10px', marginTop: '20px', textAlign: 'center' }}
            >
              <Input
                defaultValue={password}
                value={password}
                placeholder="请设置签到密码"
                size="large"
                onChange={(e) => setPassword(e.target.value)}
                disabled={currentHaveCheckedIn === 1} // 当签到状态为1时禁用输入框
              />
              <Button type="primary" size="large" onClick={handleStartStopSign}>
                {currentHaveCheckedIn === 1 ? '停止签到' : '发起签到'}
              </Button>
            </Space.Compact>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default CheckInManageModal;
