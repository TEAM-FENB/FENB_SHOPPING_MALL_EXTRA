import { Drawer, Button, Container } from '@mantine/core';
import { BiFilter } from 'react-icons/bi';
import { useDisclosure } from '@mantine/hooks';
import { Filters } from '.';

// const ScrollFiltersArea = styled(Container)`
//   ::-webkit-scrollbar {
//     width: 0.5rem;
//   }

//   :hover {
//     ::-webkit-scrollbar-thumb {
//       border-radius: 5rem;
//       background-color: #7b7676;
//     }
//   }
// `;

const FiltersContainer = ({ type, filters, handleResetFilters, handleCheckFilters }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return type === 'larger' ? (
    <Container
      m="0"
      mr="2rem"
      miw="26rem"
      maw="26rem"
      h="65rem"
      pos="sticky"
      top="6.8rem"
      sx={{
        overflowY: 'auto',
        '::-webkit-scrollbar': { width: '0.5rem' },
        ':hover': { '::-webkit-scrollbar-thumb': { borderRadius: '5rem', backgroundColor: '#7b7676' } },
      }}>
      <Filters filters={filters} handleResetFilters={handleResetFilters} handleCheckFilters={handleCheckFilters} />
    </Container>
  ) : (
    <>
      <Drawer.Root opened={opened} onClose={close}>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header m="1rem 0 0 1rem" />
          <Drawer.Body>
            <Filters
              filters={filters}
              handleResetFilters={handleResetFilters}
              handleCheckFilters={handleCheckFilters}
            />
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>

      <Button variant="default" mt="1rem" fz="1.6rem" radius="md" h="4rem" onClick={open}>
        필터
        <BiFilter size="2.5rem" />
      </Button>
    </>
  );
};

export default FiltersContainer;
