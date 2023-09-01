import { useState, type FC } from 'react';
import { Button, Modal } from 'antd';
import React from 'react';
import {
  ProForm,
  ProFormDependency,
  ProFormList,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';

const AddCourse : React.FC = () => {
  const [visiable, setVisiable] = useState(false);
 
  const onOk = () => {
    console.log("编写自己的onOk逻辑");
    closeModal();
  };
 
  const closeModal = () => {
    setVisiable(false);
  };
 
  return (
<>
      <Button type='primary' onClick={() => setVisiable(true)}>新增课程</Button>
      <Modal
        title="按钮+弹窗"
        open={visiable}
        onOk={onOk}
        onCancel={closeModal}
        afterClose={closeModal}
      >
         <ProForm>
      <ProFormList
        name={['default', 'users']}
        label="用户信息"
        initialValue={[
          {
            name: '我是姓名',
          },
        ]}
        itemContainerRender={(doms) => {
          return <ProForm.Group>{doms}</ProForm.Group>;
        }}
      >
        {(f, index, action) => {
          console.log(f, index, action);
          return (
            <>
              <ProFormText
                initialValue={index}
                name="rowKey"
                label={`第 ${index} 配置`}
              />
              <ProFormText name="name" label="姓名" />
              <ProFormDependency name={['name']}>
                {({ name }) => {
                  if (!name) {
                    return (
                      <span
                        style={{
                          lineHeight: '32px',
                        }}
                      >
                        输入姓名展示
                      </span>
                    );
                  }
                  return <ProFormText name="remark" label="昵称详情" />;
                }}
              </ProFormDependency>
              <ProFormSelect
                name="addr"
                width="md"
                label="与 name 联动的选择器"
                dependencies={['name']}
                request={async (params) => [
                  { label: params.name, value: 'all' },
                  { label: 'Unresolved', value: 'open' },
                  { label: 'Resolved', value: 'closed' },
                  { label: 'Resolving', value: 'processing' },
                ]}
              />
            </>
          );
        }}
      </ProFormList>
    </ProForm>
      </Modal>
    </>
  )
  

};
 
export default AddCourse;
