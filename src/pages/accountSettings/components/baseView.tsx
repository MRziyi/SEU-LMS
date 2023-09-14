import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Upload, UploadFile, message } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { request, useModel } from 'umi';
import ImgCrop from 'antd-img-crop';
import styles from './baseView.less';
import { RcFile } from 'antd/lib/upload';

const BaseView: React.FC = () => {
  const [avatarToShow, setAvatarToShow] = useState('');
  const [form] = Form.useForm<{
    name: string;
    phone: string;
    avatar: string;
    email: string;
  }>();

  //  获取用户信息
  const { initialState, loading } = useModel('@@initialState');

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  //获取数据
  useEffect(() => {
    console.log(initialState?.currentUser);
    if (initialState?.currentUser?.avatarUrl) {
      setAvatarToShow(initialState.currentUser.avatarUrl);
    }
  }, []);

  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div className={styles.left}>
            <ProForm<{
              name: string;
              phone: string;
              avatar: string;
              email: string;
            }>
              form={form}
              layout="vertical"
              onFinish={async (values) => {
                try {
                  // 发送表单数据到服务器
                  const response = await request<{
                    data: boolean;
                  }>('/api/user/modify', {
                    method: 'POST',
                    body: JSON.stringify({ ...values }),
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  });
                  if (response.data) {
                    message.success('提交成功');
                    window.location.reload();
                  } else {
                    message.error('提交失败');
                  }
                } catch (error) {
                  message.error('提交出错');
                }
              }}
              submitter={{
                searchConfig: {
                  submitText: '更新基本信息',
                },
                render: (_, dom) => dom[1],
              }}
              initialValues={{
                name: initialState?.currentUser?.nickName,
                phone: initialState?.currentUser?.phone,
                avatar: initialState?.currentUser?.avatarUrl,
                email: initialState?.currentUser?.email,
              }}
            >
              <ProFormText
                width="md"
                name="name"
                label="昵称"
                rules={[
                  {
                    required: true,
                    message: '请输入您的昵称!',
                  },
                ]}
              />
              <ProFormText
                name="phone"
                label="联系电话"
                rules={[
                  {
                    required: true,
                    message: '请输入您的电话!',
                  },
                ]}
              ></ProFormText>
              <ProFormText
                name="email"
                label="电子邮箱"
                rules={[
                  {
                    required: true,
                    message: '请输入您的电子邮箱!',
                  },
                ]}
              ></ProFormText>
              <ProFormText name="avatar" hidden></ProFormText>
            </ProForm>
          </div>
          <div className={styles.right}>
            <div className={styles.avatar_title}>头像</div>
            <div className={styles.avatar} style={{ width: '150px' }}>
              <img src={avatarToShow} />
            </div>

            <ImgCrop rotationSlider>
              <Upload
                showUploadList={false}
                accept="image/*"
                customRequest={async (options: any) => {
                  const data = new FormData();
                  data.append('file', options.file);
                  try {
                    const response = await fetch('/api/upload/image', {
                      method: 'POST',
                      body: data,
                    });
                    if (response.ok) {
                      response.json().then((res: any) => {
                        options.onSuccess({ url: res.data }, new Response());
                        form.setFieldsValue({ avatar: res.data });
                        setAvatarToShow(res.data);
                      });
                    } else {
                      options.onError(new Error('上传失败'));
                    }
                  } catch (error) {
                    console.error('上传图片出错:', error);
                    options.onError(error);
                  }
                }}
                onPreview={onPreview}
                onChange={async (info) => {
                  if (info.file.status === 'done') {
                    message.success(`${info.file.name} 上传成功`);
                  } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 上传失败`);
                  }
                }}
              >
                <div className={styles.button_view}>
                  <Button>
                    <UploadOutlined />
                    更换头像
                  </Button>
                </div>
              </Upload>
            </ImgCrop>
          </div>
        </>
      )}
    </div>
  );
};

export default BaseView;
