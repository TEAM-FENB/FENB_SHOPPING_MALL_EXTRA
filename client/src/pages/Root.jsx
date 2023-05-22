import { Outlet } from 'react-router-dom';

import { MantineProvider, ColorSchemeProvider } from '@mantine/core';

import { Footer, ScrollTop, SwitchingPageScrollToTop } from 'components/common';
import { NavigationBar } from 'components/NavigationBar';
import { useTheme } from 'hooks';

const Root = () => {
  const { colorScheme, toggleTheme } = useTheme();

  return (
    <>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleTheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles>
          <SwitchingPageScrollToTop />
          <ScrollTop positionY={700} />
          <NavigationBar />
          <Outlet />
          <Footer />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default Root;
