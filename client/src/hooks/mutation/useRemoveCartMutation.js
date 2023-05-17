import { removeCart } from '../../api/fetch';
import { QUERY_KEY } from '../../constants';
import useGenericMutation from './useGenericMutation';

const useRemoveCartMutation = () =>
  useGenericMutation({
    queryKey: QUERY_KEY.CARTS,
    mutationFn: removeCart,
    onMutate({ id, selectedSize }) {
      return carts => carts.filter(cart => cart.id !== id || cart.selectedSize !== selectedSize);
    },
  });

export default useRemoveCartMutation;
