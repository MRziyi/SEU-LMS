import { Modal, message, Space, Tag, Button } from 'antd';
import { useEffect, useState } from 'react';
import { queryMaterialList } from '../../../service';
import { ProList } from '@ant-design/pro-components';
import {
  BarsOutlined,
  FileExcelOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  FilePptOutlined,
  FileTextOutlined,
  FileWordOutlined,
  FileZipOutlined,
} from '@ant-design/icons';

interface modalCtrl {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  syllabusID: string;
}

const FileModal: React.FC<modalCtrl> = ({ open, setOpen, syllabusID }) => {
  const [show, setShow] = useState(false);
  const [listData, setListData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const cardActionProps = 'actions';

  useEffect(() => {
    if (syllabusID !== '' && open) queryMaterialAdaptor();
  }, [syllabusID]);

  async function queryMaterialAdaptor() {
    setLoading(true);
    try {
      const result = await queryMaterialList(syllabusID);
      if (result.data.fileList) {
        message.success('文件数据拉取成功');
        const list = result.data.fileList.map((item) => ({
          title: item.name,
          subTitle: (
            <Space size={0}>
              {item.type === 'xlsx' ? (
                <Tag color="#135200" key="1">
                  Excel
                </Tag>
              ) : item.type === 'ppt' ? (
                <Tag color="#d46b08" key="2">
                  PowerPoint
                </Tag>
              ) : item.type === 'pdf' ? (
                <Tag color="#820014" key="3">
                  PDF
                </Tag>
              ) : item.type === 'doc' ? (
                <Tag color="#003eb3" key="4">
                  Word
                </Tag>
              ) : item.type === 'zip' || item.type === 'rar' ? (
                <Tag color="#876800" key="5">
                  Excel
                </Tag>
              ) : item.type === 'Image' ? (
                <Tag color="#91caff" key="6">
                  Image
                </Tag>
              ) : (
                <Tag color="#9254de" key="7">
                  Other
                </Tag>
              )}

              {item.status ? (
                <Tag color="green" key="1">
                  已通过审核
                </Tag>
              ) : (
                <Tag color="red" key="2">
                  待管理员审核
                </Tag>
              )}
            </Space>
          ),
          actions: [
            <Button
              disabled={!item.status}
              style={{ marginLeft: '5px' }}
              onClick={() => {
                window.open(item.url, '_blank');
              }}
              type="text"
            >
              下载
            </Button>,
          ],
          content: (
            <div style={{ marginTop: '-10px' }}>
              <BarsOutlined />
              <em style={{ marginLeft: '5px' }}>课件描述：{item.description}</em>
            </div>
          ),
          type: item.type,
        }));
        console.log(list);
        setListData(list);
      }
    } catch {}
    setLoading(false);
  }

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
      <ProList<any>
        grid={{ gutter: 16, xxl: 2, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
        loading={loading}
        dataSource={listData}
        showActions="hover"
        showExtra="always"
        metas={{
          title: {},
          subTitle: {},
          avatar: {
            render: (_, row) => {
              if (row.type === 'xlsx')
                return <FileExcelOutlined style={{ fontSize: '20pt', marginRight: '10px' }} />;
              else if (row.type === 'ppt')
                return <FilePptOutlined style={{ fontSize: '20pt', marginRight: '10px' }} />;
              else if (row.type === 'pdf')
                return <FilePdfOutlined style={{ fontSize: '20pt', marginRight: '10px' }} />;
              else if (row.type === 'doc')
                return <FileWordOutlined style={{ fontSize: '20pt', marginRight: '10px' }} />;
              else if (row.type === 'zip' || row.type === 'rar')
                return <FileZipOutlined style={{ fontSize: '20pt', marginRight: '10px' }} />;
              else if (row.type === 'Image')
                return <FileImageOutlined style={{ fontSize: '20pt', marginRight: '10px' }} />;
              else return <FileTextOutlined style={{ fontSize: '20pt', marginRight: '10px' }} />;
            },
          },
          content: {},
          actions: {
            cardActionProps,
          },
        }}
      />
    </Modal>
  );
};
export default FileModal;
