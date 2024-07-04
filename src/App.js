import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  Admin,
  AllPizzas,
  Cheeses,
  CreatePizza,
  Dashboard,
  Error,
  HomeLayout,
  Landing,
  Login,
  Orders,
  PizzaDetails,
  Register,
  Sauces,
  Veggies,
} from './pages';
import Customers from './pages/Customers';
import { loader as HomeLayoutLoader } from './pages/HomeLayout';
import ResetPage from './pages/ResetPage';
import CheckoutSuccess from './pages/CheckoutSuccess';
import AdminLogin from './pages/AdminLogin';
import EditPizza from './pages/EditPizza';
import ActivateAccount from './pages/ActivateAccount';

const router = createBrowserRouter([
  {
    index: true,
    element: <Landing />,
    errorElement: <Error />,
  },
  {
    path: '/home',
    element: <HomeLayout />,
    loader: HomeLayoutLoader,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/activate/:token',
    element: <ActivateAccount />,
  },
  {
    path: '/reset',
    element: <ResetPage />,
  },
  {
    path: '/home/success',
    element: <CheckoutSuccess />,
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin',
    element: <Admin />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
        index: true,
      },

      {
        path: 'orders',
        element: <Orders />,
      },
      {
        path: 'pizzas/edit/:pizzaId',
        element: <EditPizza />,
      },
      {
        path: 'create',
        element: <CreatePizza />,
      },
      {
        path: 'all-pizzas',
        element: <AllPizzas />,
      },
      {
        path: 'sauces',
        element: <Sauces />,
      },
      {
        path: 'cheeses',
        element: <Cheeses />,
      },
      {
        path: 'customers',
        element: <Customers />,
      },
      {
        path: 'veggies',
        element: <Veggies />,
      },
    ],
  },
  {
    path: '/pizzas/:pizzaId',
    element: <PizzaDetails />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
