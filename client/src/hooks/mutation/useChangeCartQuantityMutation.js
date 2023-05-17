import { changeCartQuantity } from '../../api/fetch';
import { QUERY_KEY } from '../../constants';
import useGenericMutation from './useGenericMutation';

const useChangeCartQuantityMutation = () =>
  useGenericMutation({
    queryKey: QUERY_KEY.CARTS,
    mutationFn: changeCartQuantity,
    onMutate({ id, selectedSize, quantity }) {
      return carts =>
        carts.map(cart => (cart.id === id && cart.selectedSize === selectedSize ? { ...cart, quantity } : cart));
    },
  });

export default useChangeCartQuantityMutation;
