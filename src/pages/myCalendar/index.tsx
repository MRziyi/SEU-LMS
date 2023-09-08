import type { BadgeProps } from 'antd';
import { Badge, Calendar, Card, Tooltip } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import React, { useState } from 'react';
import { useRequest, useModel } from 'umi';
import { queryEventList } from './service';
import { EventList } from './data';

const MyCalendar: React.FC = () => {
  const [eventListData, setEventListData] = useState<EventList[]>([]);

  const { initialState } = useModel('@@initialState');

  const { loading } = useRequest(
    () => {
      if (initialState && initialState.currentUser && initialState.currentUser.id)
        return queryEventList(initialState.currentUser.id);
      else throw 'Please Login!';
    },
    {
      onSuccess: (result) => {
        setEventListData(result.eventData);
      },
    },
  );

  //查找与特定日期匹配的事件
  const getEventsForDate = (date: Moment) => {
    return eventListData.filter((event) => {
      const eventDate = moment(event.date);
      return eventDate.isSame(date, 'day');
    });
  };

  //类型转化
  const eventType = (type: string) => {
    if (type === 'syllabus') return 'warning';
    else if (type === 'assignment') return 'error';
    else return type;
  };

  const dateCellRender = (value: Moment) => {
    const events = getEventsForDate(value);
    return (
      <ul className="events">
        {events.map((event, index) => (
          <li key={index}>
            <Tooltip title={event.content}>
              <Badge
                style={{ marginLeft: '-40px' }}
                status={eventType(event.type) as BadgeProps['status']}
                text={
                  event.type == 'syllabus' ? '课程: ' + event.content : '作业: ' + event.content
                }
              />
            </Tooltip>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card title="我的日历" loading={loading}>
      <Calendar dateCellRender={dateCellRender} />
    </Card>
  );
};

export default MyCalendar;
