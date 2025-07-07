import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import NotFound from './pages/NotFound';
import GuestLayout from './layouts/GuestLayout';


const App = () => {
  return (
    <Router>
      
<Routes>
  <Route element={<GuestLayout />}>
    <Route path="/" element={<SearchPage />} />
  </Route>
    <Route path="/movie/:id" element={<MovieDetailsPage />} />

    <Route path="*" element={<NotFound />} />
</Routes>
    </Router>
      )
}

export default App