import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, DatePicker, Space, Table } from 'antd';
import type {UserListData} from './data'
import { request } from 'umi';
import AddUser from './components/addUser';
import ModifyUser from './components/modifyUser';
import UserInfo from './components/userInfo';
import { useEffect, useRef, useState } from 'react';
import { queryUserList } from './service';

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
    dataIndex: 'id',
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
          <UserInfo 
          id = {row.id}
          nickName={row.nickName}
          access={row.access}
          avatarUrl={row.avatarUrl}
          phone={row.phone}
          email={row.phone}
          ></UserInfo>     
          <ModifyUser ID = {row.id}></ModifyUser>
          <Button
            type="link"
            key="delete"
            danger
            onClick={() => handleDelete(row.id)}
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

  // const fetchData = async (params: any) => {
  //   // params 包含了请求的参数，包括搜索条件
  //   console.log('请求参数:', params);
  //   return request<{
  //     data: UserListData[];
  //   }>('/api/user/list-for-admin', {
  //     method: 'POST',
  //     params,
  //   });
  // };

  const [keyWord1,setKeyWord1] = useState<string>('');
  const [keyWord2,setKeyWord2] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loadingForPagigation, setLoadingForPagigation] = useState<boolean>(false);
  const [totalNum, setTotalNum] = useState<number>(0);
  const searchContent = useRef<string>('');
  const preSearchContent = useRef<string>('');
  const [listData, setListData] = useState<UserListData[]>([]);



  useEffect(() => {
    changePage(1, pageSize);
  }, []);

  async function changePage(_page: number, _pageSize: number) {
    setLoadingForPagigation(true);
    if (preSearchContent.current !== searchContent.current) _page = 1;
    try {
      let result;
      result = await queryUserList(keyWord1, keyWord2, _page, _pageSize);
      if (result.data) {
        setTotalNum(result.data.totalNum);
        setListData(result.data.list);
        setPageSize(_pageSize);
        setCurrentPage(_page);
      }
    } catch {}
      
    setLoadingForPagigation(false);
  }

  function showTotal(total: number, range: [number, number]) {
    return `${range[0]}-${range[1]} 共 ${total} 条`;
  }











  useEffect(() => {
    console.log('拿到的关键字为:', keyWord1, keyWord2);
    changePage(1, pageSize)
  }, [keyWord1,keyWord2]);

  const fetchKeyword = async (params: any) => {
    setKeyWord1(params.nickName);
    setKeyWord2(params.id);
  };
  function test(){
    console.log('拿到的关键字是:', keyWord1,keyWord2);
  }











  return (
    <ProTable<UserListData>

    search={{
      labelWidth: 'auto',
    }}
      onSubmit={test}



      //获得数据
      request={fetchKeyword}
      dataSource={listData}
      
      columns={columns}
      rowSelection={{
        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
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
        onChange: changePage,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: [8, 12, 16, 20],
        current: currentPage,
        pageSize: pageSize,
        total: totalNum,
        showTotal: showTotal,
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