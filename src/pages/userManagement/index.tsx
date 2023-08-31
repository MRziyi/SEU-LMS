import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, DatePicker, Space, Table } from 'antd';

const { RangePicker } = DatePicker;

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

const ProcessMap = {
  close: 'normal',
  running: 'active',
  online: 'success',
  error: 'exception',
};

export type TableListItem = {
  key: number;
  name: string;
  progress: number;
  containers: number;
  callNumber: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 50; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName-' + i,
    containers: Math.floor(Math.random() * 20),
    callNumber: Math.floor(Math.random() * 2000),
    progress: Math.ceil(Math.random() * 100) + 1,
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
    memo:
      i % 2 === 1
        ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴'
        : '简短备注文案',
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '用户名称',
    width: 70,
    dataIndex: 'name',
    fixed: 'left',
  },
  {
    title: '一卡通号',
    width: 100,
    dataIndex: 'containers',
    align: 'right',
    //sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '用户身份',
    width: 70,
    align: 'right',
    dataIndex: 'callNumber',
  },
  {
    title: '手机',
    dataIndex: 'progress',
    align: 'right',
    width: 120,
  },
  {
    title: '电子邮箱',
    width: 120,
    dataIndex: 'creator',
    align: 'right',
  },
  {
    title: '操作',
    width: 100,
    key: 'option',
    valueType: 'option',
    fixed: 'right',
    render: () => {
      return(
        <Space>
          <Button type='link'>详情</Button>          
          <Button type='link'>编辑</Button>
          <Button type='link'>删除</Button>
        </Space>
      )
    }
  },
];

export default () => {
  return (
    <ProTable<TableListItem>
      
      columns={columns}
      rowSelection={{
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
      tableAlertOptionRender={() => {
        return (
          <Space size={16}>
            <a>批量删除</a>
            <a>导出数据</a>
          </Space>
        );
      }}
      dataSource={tableListDataSource}
      scroll={{ x: 1300 }}
      options={false}
      search={false}
      pagination={{
        pageSize: 10,
      }}
      rowKey="key"
      headerTitle="用户管理"
      toolBarRender={() => [
        <Button key="add" type="primary">添加</Button>,
        <Button key="export">导出</Button>,
        // 自定义其他工具栏按钮
      ]}
    />
  );
};