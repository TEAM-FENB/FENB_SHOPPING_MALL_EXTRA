import { useQueryClient, useMutation } from '@tanstack/react-query';

const useGenericMutation = ({ queryKey, mutationFn, onMutate: expected }) => {
  const queryClient = useQueryClient();

  return useMutation({
    queryKey,
    mutationFn,
    async onMutate(variables) {
      await queryClient.cancelQueries({ queryKey });

      const previousValues = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, expected(variables));

      return { previousValues };
    },
    onError(err, variables, context) {
      queryClient.setQueryData(queryKey, context.previousValues);
    },
    onSettled() {},
  });
};

export default useGenericMutation;
