import { changeDefaultAddress } from '../../api/fetch';
import { QUERY_KEY } from '../../constants';
import useGenericMutation from './useGenericMutation';

const useChangeDefaultAddressMutation = () =>
  useGenericMutation({
    queryKey: QUERY_KEY.ADDRESS,
    mutationFn: changeDefaultAddress,
    onMutate(id) {
      return user => ({
        ...user,
        addresses: user.addresses.map(address => ({ ...address, isDefault: address.id === id })),
      });
    },
  });

export default useChangeDefaultAddressMutation;
