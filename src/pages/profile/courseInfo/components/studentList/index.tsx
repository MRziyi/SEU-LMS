import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Space, Table } from 'antd';
import type { SearchParams, StudentData } from './data';
import { useParams } from 'umi';
import UserInfo from './components/userInfo';
import { FC, useState } from 'react';
import { queryUserList } from './service';
import SendMessage from './components/sendMessage';


interface CourseIDParam{
  courseID:string;
}


const StudentList: FC<CourseIDParam> = (props) => {
  const params = useParams<SearchParams>();
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  function showTotal(total: number, range: [number, number]) {
    return `${range[0]}-${range[1]} 共 ${total} 条`;
  }

  const columns: ProColumns<StudentData>[] = [
    {
      title: '用户名称',
      width: 50,
      dataIndex: 'name',
      fixed: 'left',
    },
    {
      title: '一卡通号',
      width: 60,
      dataIndex: 'id',
      align: 'left',
    },
    {
      title: '手机',
      dataIndex: 'phone',
      align: 'left',
      width: 90,
      search: false,
    },
    {
      title: '电子邮箱',
      width: 90,
      dataIndex: 'email',
      align: 'left',
      search: false,
    },
    {
      title: '操作',
      width: 120,
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      search: false,
      render: (_, row) => {
        return (
          <Space>
            <SendMessage
            id={row.id}
            nickName={row.name}
            ></SendMessage>
            <UserInfo
              id={row.id}
              nickName={row.name}
              avatarUrl={row.avatarUrl}
              phone={row.phone}
              email={row.phone}
            ></UserInfo>
          </Space>
        );
      },
    },
  ];

  return (
    <ProTable<StudentData, SearchParams>
      search={{
        labelWidth: 'auto',
      }}
      params={params}
      request={async (
        params: SearchParams & {
          pageSize?: number;
          current?: number;
          keyword?: string;
       },
      ) => {
        const msg = await queryUserList(
          params.name,
          params.id,
          props.courseID,
          params.current,
          params.pageSize,
        );
        return {
          data: msg.data.list,
          success: msg.code == 0,
          total: msg.data.totalNum,
        };
      }}
      columns={columns}
      scroll={{ x: 400 }}
      options={false}
      pagination={{
        size: 'default',
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: [8, 12, 16],
        showTotal: showTotal,
      }}
      rowKey="id"
      headerTitle="用户管理"
    
    />
  );
};
export default StudentList;
