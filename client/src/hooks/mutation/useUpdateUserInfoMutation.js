import { updateUserInfo } from 'api/fetch';
import { usePessimisticMutation } from 'hooks/mutation';
import { QUERY_KEY } from 'constants';

const useUpdateUserInfoMutation = () =>
  usePessimisticMutation({
    queryKey: QUERY_KEY.USER,
    mutationFn: updateUserInfo,
    onSuccess(_, updatedUserInfo) {
      return user => ({ ...user, ...updatedUserInfo });
    },
  });

export default useUpdateUserInfoMutation;
