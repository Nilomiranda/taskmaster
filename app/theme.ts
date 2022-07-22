import { extendTheme, withDefaultColorScheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme(withDefaultColorScheme({ colorScheme: 'purple' }), { config })

export default theme