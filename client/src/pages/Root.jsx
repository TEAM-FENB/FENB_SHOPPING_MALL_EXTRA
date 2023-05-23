import { Outlet } from 'react-router-dom';

import { MantineProvider, ColorSchemeProvider } from '@mantine/core';

import { NavigationBar, Footer, SwitchingPageScrollToTop } from '../components';
import ScrollTop from '../components/ScrollTop';
import useTheme from '../hooks/darkmode/useTheme';

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
