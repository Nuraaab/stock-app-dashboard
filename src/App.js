import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./components/admincomponents/Topbar";
import Sidebar from "./components/admincomponents/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Login from "./context/Login";
import Casher from "./pages/casherdashboard";
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
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const location = useLocation();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {location.pathname === "/casher" ? (
            <Casher />
          ):
          location.pathname === "/" ? (
            <Login />
          ) : (
            <div className="app">
            <>
              <Sidebar isSidebar={isSidebar} />
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/add_users" element = {<AddUsers />}></Route>
                  <Route path="/view_users" element= {<ViewUsers />}></Route>
                  <Route path="/edit_users" element= {<EditUsers />}></Route>
                  <Route path="/add_items" element = {<AddItems />}></Route>
                 <Route path="/view_items" element = {<ViewItems />}></Route>
                 <Route path="/add_item_type" element = {<AddItemType />}></Route>
                 <Route path="/view_item_type" element = {<ViewItemType />}></Route>
                 <Route path="/add_spacification" element = {<AddSpacifications />}></Route>
                 <Route path="/view_spacification" element = {<ViewSpacifications />}></Route>
                 <Route path="/edit_spacification" element= {<EditSpecifications />}></Route>
                 <Route path="/add_ware_house" element = {<AddWareHouse />}></Route>
                 <Route path="/view_ware_house" element = {<ViewWareHouses />}></Route>
                 <Route path="/edit_ware_house" element= {<EditWareHouse />}></Route>
                 <Route path="/import" element ={<AddMainStoreItems />}></Route>
                 <Route path="/mainstore" element = {<ViewMainStores />}></Route>
                 <Route path="/add_sub_store_items" element= {<AddSubStoreItems />}></Route>
                 <Route path="/sub_store_items" element= {<ViewSubStoreItems />}></Route>
                 <Route path="/add_shop_items" element= {<AddShopItems />}></Route>
                 <Route path="/shop_items" element= {<ViewShopItems />}></Route>
                 <Route path="/edit_main_store_items" element= {<EditMainStoreItems />}></Route>
                 <Route path="/edit_sub_store_items" element= {<EditSubStoreItems />}></Route>
                 <Route path="/edit_shop_items" element= {<EditShopItems />}></Route>
                 <Route path="/edit_items" element= {<EditItems />}></Route>
                 <Route path="/edit_item_type" element= {<EditItemType />}></Route>
                 <Route path="/pending" element ={<Pending />}></Route>
                 <Route path="/history" element ={<History />}></Route>
                  <Route path="/team" element={<Team />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/line" element={<Line />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/geography" element={<Geography />} />
                </Routes>
              </main>
            </>
            </div>
          )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
