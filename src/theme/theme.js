import { extendTheme } from '@chakra-ui/react';
import "@fontsource/public-sans";
import "@fontsource/rubik"

const theme = extendTheme({
  fonts: {
    heading: `"Public Sans", sans-serif`,
    body: `"Rubik", sans-serif`,
  },
  colors: {
    primary: {
      50: '#ffffff',
      100: '#645CAA',
      200: '#4f4988',
      300: '#A084CA',
      400: '#BFACE0',
      500: '#1e88e5',
      600: '#1e88e5',
      700: '#ffffff1f',
      800: '#ffffff33',
      900: '#242424',
      1000: '#151822',
      1100: '#0b0f19',
    },
  },
})

export default theme
