import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, DatePicker, Space, Table } from 'antd';
import type {UserListData} from './data'
import { request } from 'umi';
import AddUser from './components/addUser';
import ModifyUser from './components/modifyUser';

const columns: ProColumns<UserListData>[] = [
  {
    title: '用户名称',
    width: 70,
    dataIndex: 'nickName',
    fixed: 'left',
    
  },
  {
    title: '一卡通号',
    width: 100,
    dataIndex: 'ID',
    align: 'right',

  },
  {
    title: '用户身份',
    width: 70,
    align: 'right',
    dataIndex: 'access',
    search:false,
  },
  {
    title: '手机',
    dataIndex: 'phone',
    align: 'right',
    width: 120,
    search:false,
  },
  {
    title: '电子邮箱',
    width: 120,
    dataIndex: 'email',
    align: 'right',
    search:false,
  },
  {
    title: '操作',
    width: 100,
    key: 'option',
    valueType: 'option',
    fixed: 'right',
    search:false,
    render: (_,row) => {
      return(
        <Space>
          <Button type='link'>详情</Button>          
          <ModifyUser ID = {row.ID}></ModifyUser>
          <Button
            type="link"
            key="delete"
            danger
            onClick={() => handleDelete(row.ID)}
          >
            删除
         </Button>
        </Space>
      )
    }
  },
];

const handleDelete = async (params: any) => {
  console.log('请求参数:', params);
  // 发起删除请求
  request('/api/user/delete', {
    method: 'POST',
    params,
  })
    .then(() => {
      alert('删除成功');
    })
    .catch((error) => {
      alert('删除失败，请重试');
    });
};


export default () => {

  const fetchData = async (params: any) => {
    // params 包含了请求的参数，包括搜索条件
    console.log('请求参数:', params);
    return request<{
      data: UserListData[];
    }>('/api/user/list-for-admin', {
      method: 'POST',
      params,
    });
  };

  return (
    <ProTable<UserListData>

    search={{
      labelWidth: 'auto',
    }}




      //获得数据
      request={fetchData}
      
      columns={columns}
      rowSelection={{
        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        defaultSelectedRowKeys: [1],
      }}

      tableAlertRender={({
        selectedRowKeys,
        selectedRows,
        onCleanSelected,
      }) => {
        console.log(selectedRowKeys, selectedRows);
        return (
          <Space size={24}>
            <span>
              已选 {selectedRowKeys.length} 项
              <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                取消选择
              </a>
            </span>
          </Space>
        );
      }}
      tableAlertOptionRender={(
        {
          selectedRowKeys,
        }
      ) => {
        return (
          <Space size={16}>
            <a onClick={()=>{
              const deleteList = [];
              for(let i = 0 ; i < selectedRowKeys.length ; i++){
                deleteList[i] = selectedRowKeys[i];
              }
              console.log('删除:', deleteList);
              // 发起删除请求
              request('/api/user/delete-users', {
                method: 'POST',
                data: { deleteList },
              })
                .then(() => {
                  alert('删除成功');
                })
                .catch((error) => {
                  alert('删除失败，请重试');
                });
            }}>批量删除</a>
          </Space>
        );
      }}
      scroll={{ x: 1300 }}
      options={false}
      pagination={{
        pageSize: 10,
      }}
      rowKey="key"
      headerTitle="用户管理"
      toolBarRender={() => {
        return [
          <Space>
            <AddUser></AddUser>
          </Space>,
        ];
      }}
    />
  );
};