import './App.css';
import Header from './components/Header/Header';

function App() {
  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
// образец
// import './index.css'
// import './App.css'
// import TariffCard from './components/TariffCard'

// function App() {

//   return (
//     <div className="tariffs_container">
//   <TariffCard price={300} title="Безлимитный 300" description="до 10 Мбит/сек" colorClass="yellow" />
//   <TariffCard price={500} title="Безлимитный 500" description="до 50 Мбит/сек" colorClass="green" />
//   <TariffCard price={700} title="Безлимитный 700" description="до 100 Мбит/сек" colorClass="red" highlighted />

//     </div>
//   )
// }

// export default App
