/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
    canTeacher: currentUser && currentUser.access === 'teacher',
    canStudent: currentUser && currentUser.access === 'student',
    canST: currentUser && (currentUser.access === 'student' || currentUser.access === 'teacher'),
    canTA: currentUser && (currentUser.access === 'admin' || currentUser.access === 'teacher'),
  };
}
