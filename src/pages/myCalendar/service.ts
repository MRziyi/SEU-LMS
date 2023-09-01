import { request } from 'umi';
import { EventList } from './data';

export async function queryEventList(
  userIDParam: string,
): Promise<{ data: { eventData: EventList[] } }> {
  return request('/api/calendar/list-events', {
    method: 'POST',
    data: {
      userID: userIDParam,
    },
  });
}
