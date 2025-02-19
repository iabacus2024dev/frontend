import RestApiAdapter from '@/adapters/restApiAdapter.js';

export const getMemberList = async () => {
  try {
    return await RestApiAdapter.get('/api/v1/members');
  } catch (error) {
    throw error;
  }
};
