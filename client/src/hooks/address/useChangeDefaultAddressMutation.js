import { useGenericMutation } from '../index';
import { changeDefaultAddress } from '../../api/fetch';
import { ADDRESS_QUERY_KEY } from '../../constants';

const useChangeDefaultAddressMutation = () =>
  useGenericMutation({
    queryKey: ADDRESS_QUERY_KEY,
    mutationFn: changeDefaultAddress,
    onMutate(id) {
      return user => ({
        ...user,
        addresses: user.addresses.map(address => ({ ...address, isDefault: address.id === id })),
      });
    },
  });

export default useChangeDefaultAddressMutation;
