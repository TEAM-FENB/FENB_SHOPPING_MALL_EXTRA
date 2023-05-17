import { addCart } from '../../api/fetch';
import { QUERY_KEY } from '../../constants';
import useGenericMutation from './useGenericMutation';

const useAddCartMutation = () =>
  useGenericMutation({
    queryKey: QUERY_KEY.CARTS,
    mutationFn: addCart,
    onMutate({ selectedSize, currentProduct }) {
      return carts =>
        carts
          ? [...carts, { ...currentProduct, selectedSize, quantity: 1 }]
          : [{ ...currentProduct, selectedSize, quantity: 1 }];
    },
  });

export default useAddCartMutation;
