import { Modal, Button, Card, Row, Col, Input, Space, message } from 'antd';
import { useEffect, useState } from 'react';
import { CheckInData } from '../../../data';
import { createWebSocketConnection, postStartCheckedIn, postStopCheckedIn, queryCheckInData } from '../../../service';


interface modalCtrl {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  syllabusID: string;
  haveCheckedIn:number;
  refresh:()=>void;
}

const StartCheckInModal: React.FC<modalCtrl> = ({ open, setOpen, syllabusID, haveCheckedIn,refresh }) => {
  const [show, setShow] = useState(false);
  const [currentSyllabusID, setCurrentSyllabusID] = useState<string>('');
  const [checkInData,setCheckInData]=useState<CheckInData>();
  const [haveCheckedInData,setHaveCheckedInData]= useState<number>();//0:未签到；1：正在签到；2：停止签到
  const [password, setPassword] = useState<string>(''); 


  useEffect(() => {
    setShow(open);
  }, [open]);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  //实时更新签到数据
  useEffect(() => {
    fetchCheckInData();

    console.log('Try WebSocket');
    // 建立WebSocket连接并处理消息
    const socket = createWebSocketConnection();

    socket.onopen = () => {
      console.log('WebSocket connected');
      // 向后端发送订阅请求，传递章节ID等信息
      const subscribeMessage = {
        type: 'subscribe',
        chapterID: currentSyllabusID,
      };
      socket.send(JSON.stringify(subscribeMessage));
    };

    socket.onmessage = (event) => {
      console.log(event.data)
      const data = JSON.parse(event.data);
      if (data.type === 'checkin_update') {
        // 更新签到情况
        setCheckInData(data.checkInData);
        setPassword(data.password);
      }
    };

    socket.onclose = (event) => {
      console.log('WebSocket disconnected:', event.code, event.reason);
      console.log('WebSocket disconnected');
    };

    // 组件卸载时关闭WebSocket连接
    return () => {
      socket.close();
    };
  }, [syllabusID]);

  // 在组件加载时获取初始签到数据
  async function fetchCheckInData() {
    setCurrentSyllabusID(syllabusID);
    setHaveCheckedInData(haveCheckedIn);
    try {
        const result = await queryCheckInData(currentSyllabusID);
        if (result.data.checkInData) {
            setCheckInData(result.data.checkInData);
        }
    } catch {}
  }

  const handleStartStopSign = () => {
    // 切换签到状态
    if(haveCheckedInData===1){//当前是正在签到
        setHaveCheckedInData(2);
        fetchStopCheckedIn();
    }else{
        setHaveCheckedInData(1);
        //console.log(currentSyllabusID+password)
        fetchStartCheckedIn();
    } 
  };

  async function fetchStartCheckedIn() {
    try{
      const result =await postStartCheckedIn(currentSyllabusID,password);
      if(result.code===0){
        message.success('签到密码设置成功');
      }  else {
        message.error('签到密码设置失败');
      }
    }catch{} 
  }

  async function fetchStopCheckedIn() {
    try{
      const result =await postStopCheckedIn(currentSyllabusID);
      if(result.code===0){
        message.success('签到状态变换成功');
      }  else {
        message.error('签到状态变换失败');
      }
    }catch{} 
  }

  return (
    <>
    <Modal
      title='签到情况'
      width={500}
      open={open}
      okButtonProps={{ style: { display: 'none' } }}
      onCancel={() => {
        refresh;
        setShow(false);
      }}
    >
    <Row gutter={24} className="card-row">
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
        <Card 
        title="已签到人数"
        size='small'
        style={{  
          textAlign: 'center',
          //backgroundColor: '#EEE4FC'
        }}
         >
            <div className="count" style={{ color: 'green', fontSize: '36px'}}>
                <strong>{checkInData?.isCheckedIn}</strong>
            </div>
        </Card>
        </Col>

        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
        <Card 
        title="待签到人数" 
        size='small'
        style={{  
          textAlign: 'center',
          //backgroundColor: '#EEE4FC'
        }} 
        >
            <div className="count" style={{ color: 'red', fontSize: '36px'}}>
                <strong>{checkInData?.notCheckedIn}</strong>
            </div>
        </Card>
        </Col>
    </Row>
    <Row gutter={24} className="card-row">
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
        <Space.Compact style={{ width: '95%', margin:'10px',marginTop:'20px',textAlign: 'center'}}>
        <Input 
            defaultValue={password}
            value={password}
            placeholder='请设置签到密码'
            size='large'
            onChange={(e) => setPassword(e.target.value)}
            disabled={haveCheckedInData===1} // 当签到状态为1时禁用输入框
        />
        <Button type="primary"
            size='large' onClick={handleStartStopSign} >
            {haveCheckedInData===1 ? '停止签到' : '发起签到'}
        </Button>
        </Space.Compact>
        </Col>
    </Row>
    </Modal>
    </>  
  );
};

export default StartCheckInModal;
