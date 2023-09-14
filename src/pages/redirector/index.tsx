import type { FC } from 'react';
import { useModel, Redirect } from 'umi';
const Redirector: FC<Record<string, any>> = () => {
  const { initialState } = useModel('@@initialState');
  if (initialState?.currentUser?.access == 'student') return <Redirect to="/myCourses" />;
  else return <Redirect to="/data-visualize" />;
};

export default Redirector;
