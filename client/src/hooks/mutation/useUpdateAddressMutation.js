import { updateAddress } from 'api/fetch';
import { usePessimisticMutation } from 'hooks/mutation';
import { QUERY_KEY } from 'constants';

const useUpdateAddressMutation = () =>
  usePessimisticMutation({
    queryKey: QUERY_KEY.ADDRESSES,
    mutationFn: updateAddress,
    onSuccess: (p1, { id, newAddress: { name, phone, mainAddress, detailAddress, postcode } }) => {
      console.log(p1);

      return addresses =>
        addresses.map(address =>
          address._id === id
            ? { ...address, recipient: name, recipientPhone: phone, mainAddress, detailAddress, postcode }
            : address
        );
    },
  });

export default useUpdateAddressMutation;
