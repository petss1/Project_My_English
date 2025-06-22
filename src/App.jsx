import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import WordTable from './components/WordTable/WordTable';
import { Routes, Route } from "react-router-dom";
import CardsPage from "./pages/CardsPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<WordTable />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
