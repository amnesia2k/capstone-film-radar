import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Shows from "./pages/Shows";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "./components/theme-provider";
import Search from "./pages/Search";
import Details from "./pages/Details";
import { AuthProvider } from "./context/authProvider";
import { Toaster } from "sonner";
import Watchlist from "./pages/Watchlist";
import Protected from "./components/routes/Protected";

const myRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tv" element={<Shows />} />
      <Route path="/search" element={<Search />} />
      <Route path="/:type/:id" element={<Details />} />
      <Route
        path="/watchlist"
        element={
          <Protected>
            <Watchlist />
          </Protected>
        }
      />
    </Route>
  )
);
const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <div className="bg-backgroundImg bg-cover bg-fixed bg-center">
          <Toaster
            duration={3000}
            richColors
            className="hidden lg:block"
            position="bottom-right"
          />
          <Toaster
            duration={3000}
            richColors
            className="lg:hidden"
            position="top-center"
          />
          <RouterProvider router={myRoutes} />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
