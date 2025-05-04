import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import { RoutesComponent } from './Router';       // Import your RoutesComponent
import './App.css';

function App() {
  return (
    <BrowserRouter>  {/* Wrap RoutesComponent with BrowserRouter */}
      <RoutesComponent />
    </BrowserRouter>
  );
}

export default App;
