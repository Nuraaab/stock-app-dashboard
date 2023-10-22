
import { useContext, useEffect, useState } from "react";
import {
  Routes, Route, useLocation,
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom"
import Topbar from "./components/admincomponents/Topbar";
import Sidebar from "./components/admincomponents/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Login from "./context/Login";
import AddSpacifications from "./pages/admindashboard/spacification/AddSpacification";
import ViewSpacifications from "./pages/admindashboard/spacification/ViewSpacification";
import AddItems from "./pages/admindashboard/items/AddItems";
import ViewItems from "./pages/admindashboard/items/ViewItems";
import AddItemType from "./pages/admindashboard/itemtype/AddItemType";
import ViewItemType from "./pages/admindashboard/itemtype/ViewItemType";
import AddWareHouse from "./pages/admindashboard/warehouses/AddWareHouse";
import ViewWareHouses from "./pages/admindashboard/warehouses/ViewWareHouse";
import AddMainStoreItems from "./pages/admindashboard/itemstore/mainstores/AddMainStores";
import ViewMainStores from "./pages/admindashboard/itemstore/mainstores/ViewMainStores";
import AddSubStoreItems from "./pages/admindashboard/itemstore/substores/AddSubStores";
import ViewSubStoreItems from "./pages/admindashboard/itemstore/substores/ViewSubStores";
import AddShopItems from "./pages/admindashboard/itemstore/shope/AddShopItems";
import ViewShopItems from "./pages/admindashboard/itemstore/shope/ViewShopItems";
import EditMainStoreItems from "./pages/admindashboard/itemstore/mainstores/EditMainStores";
import EditSubStoreItems from "./pages/admindashboard/itemstore/substores/EditSubStores";
import EditShopItems from "./pages/admindashboard/itemstore/shope/EditShopItems";
import EditItems from "./pages/admindashboard/items/EditItems";
import AddUsers from "./pages/admindashboard/users/AddUsers";
import ViewUsers from "./pages/admindashboard/users/ViewUsers";
import EditUsers from "./pages/admindashboard/users/EditUsers";
import EditItemType from "./pages/admindashboard/itemtype/EditItemType";
import EditSpecifications from "./pages/admindashboard/spacification/EditSpecification";
import EditWareHouse from "./pages/admindashboard/warehouses/EditWarehouse";
import Pending from "./pages/admindashboard/pending/Pending";
import History from "./pages/admindashboard/history/History";
import SalesHistory from "./pages/admindashboard/history/SalesHistory";
import Credit from "./pages/admindashboard/credit/Credit";
import Dashboard from "./pages/admindashboard/dashboard";
import PendingShopSale from "./pages/admindashboard/pending/PendingShopSale";
import PendingShopItem from "./pages/admindashboard/pending/PendingShopItems";
import { AuthContext } from "./context/Context";
import SignIn from "./pages/auth/Login";

function App() {

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [openNav, setOpenNav] = useState(false);
  const ProtectedRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext)

    if (currentUser === null) {
      return <Navigate to="/login" />

    } else {
      return children
    }
  }


  const Layout = () => {
    return (

      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Outlet />
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }

const router = createBrowserRouter([
    {
      path: "/",
      element: (<ProtectedRoute>
        <Layout />
      </ProtectedRoute>),
      children: [
        {
          path: "/",
          element: <Dashboard />
        },
        {
          path: "/add_users",
          element: <AddUsers />
        },
        {
          path: "/view_users",
          element: <ViewUsers />
        },
        {
          path: "/edit_users",
          element: <EditUsers />
        },
        {
          path: "/add_items",
          element: <AddItems />
        },
        {
          path: "/view_items",
          element: <ViewItems />
        },
        {
          path: "/edit_items",
          element: <EditItems />
        },
        {
          path: "/add_item_type",
          element: <AddItemType />
        },
        {
          path: "/view_item_type",
          element: <ViewItemType />
        },
        {
          path: "/edit_item_type",
          element: <EditItemType />
        },
        {
          path: "/add_spacification",
          element: <AddSpacifications />
        },
        {
          path: "/view_spacification",
          element: <ViewSpacifications />
        },
        {
          path: "/edit_spacification",
          element: <EditSpecifications />
        },
        {
          path: "/add_ware_house",
          element: <AddWareHouse />
        },
        {
          path: "/view_ware_house",
          element: <ViewWareHouses />
        },
        {
          path: "/edit_ware_house",
          element: <EditWareHouse />
        },
        {
          path: "/mainstore",
          element: <ViewMainStores />
        },
        {
          path: "/edit_main_store_items",
          element: <EditMainStoreItems />
        },
        {
          path: "/sub_store_items",
          element: <ViewSubStoreItems />
        },
        {
          path: "/edit_sub_store_items",
          element: <EditSubStoreItems />
        },
        {
          path: "/shop_items",
          element: <ViewShopItems />
        },
        {
          path: "/edit_shop_items",
          element: <EditShopItems />
        },
        {
          path: "/pending",
          element: <Pending />
        },
        {
          path: "/storehistory",
          element: <History />
        },
        {
          path: "/saleshistory",
          element: <SalesHistory />
        },
        {
          path: "/credit",
          element: <Credit />
        },
        {
          path: "/pendingshopsales",
          element: <PendingShopSale />
        },
        {
          path: "/pendingshopitems",
          element: <PendingShopItem />
        },
        {
          path: "/import",
          element: <AddMainStoreItems />
        },
      ]
    },
    {
      path: "/login",
      element: <SignIn />,
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
