import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
//pages
import Home from "./pages/Home"
import Login from './pages/Login'
import Signup from './pages/Signup'
import AddEvent from './pages/AddEvent'

import Navbar from "./components/Navbar"
// import Footer from './components/Footer';

function App() {
  const { user } = useAuthContext()

  return (
    <BrowserRouter >
      <main className='min-h-screen  ' >
        {/* <Navbar /> */}
        <Routes className=''>
          <Route index element={<Home />} />
          <Route path="login" element={!user ? <Login /> : <Navigate to={"/home"} />} />
          <Route path="signup" element={!user ? <Signup /> : <Navigate to={"/home"} />} />
          <Route path="/add" element={<AddEvent />} />
        </Routes>
        {/* <Footer className={""} /> */}
      </main>
    </BrowserRouter>

  );
}

export default App;
