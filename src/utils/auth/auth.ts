import * as SecureStore from 'expo-secure-store';
export const setAccessToken = (accessToken: string) => {
  try {
    SecureStore.setItem('access-token', accessToken);
  } catch (error) {
    SecureStore.setItem('access-token', '');
  }
};

export const getAccessToken = (): null | string => {
  try {
    const accessToken = SecureStore.getItem('access-token');
    return accessToken;
  } catch (error) {
    return null;
  }
};

export const removeAccessToken = () => {
  try {
    const accessToken = getAccessToken();
    if (!accessToken) {
      return;
    }
    SecureStore.setItem('access-token', '');
  } catch (error) {
    SecureStore.setItem('access-token', '');
  }
};
