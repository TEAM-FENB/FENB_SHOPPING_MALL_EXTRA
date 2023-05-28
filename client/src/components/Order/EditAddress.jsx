import { Stack, Group } from '@mantine/core';

import { CustomButton } from 'components';
import { EditAddressItem } from 'components/Order';
import { useGetAddresses } from 'hooks/address';

const EditAddress = ({ handleFieldClick, selectedAddress, changeSelectedAddress }) => {
  const addresses = useGetAddresses();

  const handleAddAddressClick = () => {
    handleFieldClick({ input: true });
  };

  return (
    <Stack px="2rem" w="100%">
      {addresses.map(address => (
        <EditAddressItem
          key={address.id}
          address={address}
          changeSelectedAddress={changeSelectedAddress}
          handleFieldClick={handleFieldClick}
          selectedAddress={selectedAddress}
        />
      ))}
      <Group position="right">
        <CustomButton
          color="gray"
          variant="outline"
          sx={{
            width: '20rem',
            ':hover': { backgroundColor: 'transparent', borderColor: '#228be6', color: '#228be6' },
          }}
          onClick={handleAddAddressClick}>
          새 배송지 추가
        </CustomButton>
      </Group>
    </Stack>
  );
};

export default EditAddress;
