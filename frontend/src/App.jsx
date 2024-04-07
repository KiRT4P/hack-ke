import { BrowserRouter, Routes, Route } from 'react-router-dom'
//pages
import Home from "./pages/Home"
import AddEvent from './pages/AddEvent'
import About from './pages/About';
import AddArea from './pages/AddArea';



function App() {

  return (
    <BrowserRouter >
      <main className='min-h-screen  ' >

        <Routes className=''>
          <Route index element={<Home />} />
          <Route path="/add" element={<AddEvent />} />
          <Route path='/addArea' element={<AddArea />} />
          <Route path="/about" element={<About />} />
        </Routes>
        {/* <Footer className={""} /> */}
      </main>
    </BrowserRouter>

  );
}

export default App;
