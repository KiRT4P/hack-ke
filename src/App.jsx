import { BrowserRouter, Routes, Route } from 'react-router-dom'
//pages
import Home from "./pages/Home"
import AddEvent from './pages/AddEvent'


// import Footer from './components/Footer';

function App() {

  return (
    <BrowserRouter >
      <main className='min-h-screen  ' >

        <Routes className=''>
          <Route index element={<Home />} />
          <Route path="/add" element={<AddEvent />} />
        </Routes>
        {/* <Footer className={""} /> */}
      </main>
    </BrowserRouter>

  );
}

export default App;
