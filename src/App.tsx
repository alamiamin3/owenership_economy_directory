import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Home from './components/Home';
import ListItems from './components/ListItems';
import AppContextProvider from './components/Context/AppContext';

const Layout = () => {
  return (
    <div className="flex  items-center justify-center min-h-svh w-full font-poppins ">
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/organizations',
        element: <ListItems/>,
      },
    ],
  },
]);

function App() {
  return(
    <AppContextProvider>
      <RouterProvider router={router} />;
    </AppContextProvider>
  )
}

export default App;
