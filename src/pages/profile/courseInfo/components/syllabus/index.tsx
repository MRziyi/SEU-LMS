import React from 'react';
import ProCard from '@ant-design/pro-card';

export function formatWan(val: number) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';

  let result: React.ReactNode = val;
  if (val > 10000) {
    result = (
      <span>
        {Math.floor(val / 10000)}
        <span
          style={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            marginLeft: 2,
          }}
        />
      </span>
    );
  }
  return result;
}

function showTotal(total: number, range: [number, number]) {
  return `${range[0]}-${range[1]} 共 ${total} 件`;
}

const Syllabus: React.FC = () => {
  return (
    <ProCard title="Lesson 1: Lesson Title" bordered headerBordered gutter={16} collapsible>
      <ProCard title="课程视频" type="inner" bordered>
        课程视频按钮
      </ProCard>
      <ProCard title="课件资料" type="inner" bordered>
        课件资料文件
      </ProCard>
      <ProCard title="作业" type="inner" bordered>
        作业提交与反馈
      </ProCard>
    </ProCard>
  );
};
export default Syllabus;
