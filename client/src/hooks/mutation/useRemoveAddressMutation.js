import { removeAddress } from '../../api/fetch';
import { QUERY_KEY } from '../../constants';
import useGenericMutation from './useGenericMutation';

const useRemoveAddressMutation = () =>
  useGenericMutation({
    queryKey: QUERY_KEY.ADDRESS,
    mutationFn: removeAddress,
    onMutate(id) {
      return user => ({ ...user, addresses: user.addresses.filter(address => address.id !== id) });
    },
  });

export default useRemoveAddressMutation;
