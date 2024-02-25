import { Home } from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './widgets/Layout/Layout';
import { AddVisiting } from './pages/AddVisiting';
import { PatientCard } from './pages/PatientCard';

function App() {
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/add-visiting', element: <AddVisiting /> },
    { path: '/patients-card/:id', element: <PatientCard /> },
    { path: '/change-visiting/:id', element: <AddVisiting /> },
  ];
  return (
    <Layout>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Layout>
  );
}

export default App;
