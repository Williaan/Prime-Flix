import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Filme from './pages/Filme';
import Header from './components/Header';
import Error from './pages/NotFound';
import Favoritos from './pages/Favoritos';


function RouterApp() {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/filme/:id' element={<Filme />} />
                <Route path='/favoritos' element={<Favoritos />} />

                <Route path='*' element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}


export default RouterApp;
