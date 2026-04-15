import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyles } from './styles/theme';
import { SelectionProvider } from './context/SelectionContext';
import { Navbar } from './components/Navbar';
import Browse from './pages/Browse';
import PetDetail from './pages/PetDetail';
import About from './pages/About';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <SelectionProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Browse />} />
            <Route path="/pets/:id" element={<PetDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
      </SelectionProvider>
    </ThemeProvider>
  );
};

export default App;
