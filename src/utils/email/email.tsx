export const emailFormatCheck = (email: string): boolean => {
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //验证邮箱的正则表达式
  const isEmail = reg.test(email);
  return isEmail;
};
