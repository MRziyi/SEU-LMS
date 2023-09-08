import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Space, Table } from 'antd';
import type { SearchParams, UserListData } from './data';
import { useParams } from 'umi';
import AddUser from './components/addUser';
import ModifyUser from './components/modifyUser';
import UserInfo from './components/userInfo';
import { FC, useState } from 'react';
import { deleteUserList, queryUserList } from './service';
import SendAdminPM from './components/sendAdminPM';

const UserManagement: FC = () => {
  const params = useParams<SearchParams>();
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  function showTotal(total: number, range: [number, number]) {
    return `${range[0]}-${range[1]} 共 ${total} 条`;
  }

  async function deleteUserListAdaptor(IDList: string[]) {
    setLoadingDelete(true);
    try {
      const result = await deleteUserList(IDList);
      if (result.code == 0) {
        if (IDList.length != 1) message.success('用户批量删除成功');
        else message.success('用户删除成功');

        setRefreshKey((prevKey) => prevKey + 1);
      } else {
        message.error('用户删除失败');
      }
    } catch {}
    setLoadingDelete(false);
  }

  const columns: ProColumns<UserListData>[] = [
    {
      title: '用户名称',
      width: 50,
      dataIndex: 'nickName',
      fixed: 'left',
    },
    {
      title: '一卡通号',
      width: 60,
      dataIndex: 'id',
      align: 'left',
      search: false,
    },
    {
      title: '用户身份',
      width: 60,
      align: 'center',
      dataIndex: 'access',
      search: false,
      render: (_, row) => {
        if (row.access == 'student') {
          return '学生';
        }
        if (row.access == 'teacher') {
          return '教师';
        }
        if (row.access == 'admin') {
          return '管理员';
        }
      },
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
            <SendAdminPM id={row.id} nickName={row.nickName}></SendAdminPM>
            <UserInfo
              id={row.id}
              nickName={row.nickName}
              access={row.access}
              avatarUrl={row.avatarUrl}
              phone={row.phone}
              email={row.phone}
            ></UserInfo>
            <ModifyUser
              refresh={() => {
                setRefreshKey((prevKey) => prevKey + 1);
              }}
              id={row.id}
              nickName={row.nickName}
              access={row.access}
              email={row.email}
              phone={row.phone}
              avatarUrl={row.avatarUrl}
            ></ModifyUser>
            <Button
              type="link"
              key="delete"
              danger
              loading={loadingDelete}
              onClick={() => {
                if (window.confirm('确定要删除吗')) {
                  const IDList: string[] = [row.id];
                  deleteUserListAdaptor(IDList);
                }
              }}
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <ProTable<UserListData, SearchParams>
      search={{
        labelWidth: 'auto',
      }}
      key={refreshKey} // 刷新列表的 key
      params={params}
      request={async (
        params: SearchParams & {
          pageSize?: number;
          current?: number;
          keyword?: string;
        },
      ) => {
        const msg = await queryUserList(
          params.nickName,
          params.userID,
          params.current ? params.current : 1,
          params.pageSize ? params.pageSize : 6,
        );
        return {
          data: msg?.data.list,
          success: msg?.code == 0,
          total: msg?.data.totalNum,
        };
      }}
      columns={columns}
      rowSelection={{
        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
      }}
      tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => {
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
      tableAlertOptionRender={(values) => {
        return (
          <Space size={16}>
            <Button
              danger
              loading={loadingDelete}
              onClick={() => {
                if (window.confirm('确定要删除吗')) {
                  deleteUserListAdaptor(values.selectedRows.map((element) => element.id));
                }
              }}
            >
              批量删除
            </Button>
          </Space>
        );
      }}
      scroll={{ x: 400 }}
      options={false}
      pagination={{
        defaultPageSize: 8,
        size: 'default',
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: [8, 12, 16],
        showTotal: showTotal,
      }}
      rowKey="id"
      headerTitle="用户管理"
      toolBarRender={() => {
        return [
          <Space>
            <AddUser
              onClose={() => {
                setRefreshKey((prevKey) => prevKey + 1);
              }}
            ></AddUser>
          </Space>,
        ];
      }}
    />
  );
};
export default UserManagement;
