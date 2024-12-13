
import { ThemeProvider } from '@mui/material/styles'
import { HomePage } from './pages/Home'
import { darkTheme } from './theme/Theme'
import { DataProvider } from './context/DataContext'


function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <DataProvider>
        <HomePage />
      </DataProvider>
    </ThemeProvider>

  )
}

export default App
