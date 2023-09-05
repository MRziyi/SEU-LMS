import { InboxOutlined } from '@ant-design/icons';
import { Modal, message, Divider, Button, Upload, Card } from 'antd';
import { useEffect, useState } from 'react';
import EditorModal from './editorModal';
import { CheckInData } from '../../../data';
import { queryCheckInData } from '../../../service';


interface modalCtrl {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  syllabusID: string;
  haveCheckedIn:number;
}

const StartCheckInModal: React.FC<modalCtrl> = ({ open, setOpen, syllabusID, haveCheckedIn }) => {
  const [show, setShow] = useState(false);
  const [currentSyllabusID, setCurrentSyllabusID] = useState<string>('');
  const [checkInData,setCheckInData]=useState<CheckInData>();
  //const [loading, setLoading] = useState<boolean>(false);
  const [checkInStatu,setCheckInStatu]= useState<number>();

  useEffect(() => {
    if (syllabusID !== '') {
        queryCheckInDataAdaptor();
        pollCheckInData();
    }
  }, [syllabusID]);

  useEffect(() => {
    setShow(open);
  }, [open]);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  async function queryCheckInDataAdaptor() {
    setCurrentSyllabusID(syllabusID);
    setCheckInStatu(haveCheckedIn);
    try {
        const result = await queryCheckInData(currentSyllabusID);
        if (result.data.checkInData) {
            setCheckInData(result.data.checkInData);
        }
    } catch {}
  }

  const pollCheckInData = () => {
    setInterval(() => {
      queryCheckInData(currentSyllabusID);
    }, 3000); // 间隔3秒钟获取一次数据
  };

  return (
    <>
    <Card
        actions={[
            checkInStatu==1?(
                <Button 
                    key="stop" 
                    //onClick={handleStopCheckIn}
                >停止签到</Button>
            ):(
                <Button>
                    发起签到
                </Button>
            )
        ]}
        //loading={loading}
    >
        <div>
            签到人数：{checkInData?.isCheckedIn}
        </div>
        <div>
            未签到人数：{checkInData?.notCheckedIn}
        </div>
    </Card>
    </>  
  );
};

export default StartCheckInModal;
