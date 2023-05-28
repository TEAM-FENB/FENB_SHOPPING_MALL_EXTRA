import { Stack, Group, Title, Button, useMantineTheme } from '@mantine/core';
import { BsCheck2 } from 'react-icons/bs';

import { AddressInfo, EditAddress, InputAddress } from 'components/Order';

const Address = ({ field, handleFieldClick, selectedAddress, changeSelectedAddress }) => {
  const { colors } = useMantineTheme();

  const handleEditClick = () => handleFieldClick({ edit: true });

  return (
    <Stack pt={0} w="100%">
      <Group align="center" pb="1.2rem" position="apart" pt="1.2rem">
        <Group align="center">
          <Title>배송 옵션</Title>
          {field.info && <BsCheck2 color={colors.green[8]} size="2.4rem" />}
        </Group>

        {field.info && (
          <Button
            color="dark"
            fz="1.4rem"
            size="lg"
            sx={{ ':hover': { background: 'transparent', textDecoration: 'underline' } }}
            variant="subtle"
            onClick={handleEditClick}>
            편집
          </Button>
        )}
      </Group>

      {field.info && <AddressInfo selectedAddress={selectedAddress} />}
      {field.edit && (
        <EditAddress
          changeSelectedAddress={changeSelectedAddress}
          handleFieldClick={handleFieldClick}
          selectedAddress={selectedAddress}
        />
      )}
      {field.input && (
        <InputAddress changeSelectedAddress={changeSelectedAddress} handleFieldClick={handleFieldClick} />
      )}
    </Stack>
  );
};

export default Address;
