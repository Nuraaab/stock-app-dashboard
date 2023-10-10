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
import Register from "./context/Register";
import AddSpacifications from "./pages/admindashboard/spacification/AddSpacification";
import ViewSpacifications from "./pages/admindashboard/spacification/ViewSpacification";
import AddItems from "./pages/admindashboard/items/AddItems";
import ViewItems from "./pages/admindashboard/items/ViewItems";
import AddItemType from "./pages/admindashboard/itemtype/AddItemType";
import ViewItemType from "./pages/admindashboard/itemtype/ViewItemType";
import AddWareHouse from "./pages/admindashboard/warehouses/AddWareHouse";
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
                  <Route path="/add_users" element = {<Register />}></Route>
                  <Route path="/add_items" element = {<AddItems />}></Route>
                 <Route path="/view_items" element = {<ViewItems />}></Route>
                 <Route path="/add_item_type" element = {<AddItemType />}></Route>
                 <Route path="/view_item_type" element = {<ViewItemType />}></Route>
                 <Route path="/add_spacification" element = {<AddSpacifications />}></Route>
                 <Route path="/view_spacification" element = {<ViewSpacifications />}></Route>
                 <Route path="/add_ware_house" element = {<AddWareHouse />}></Route>
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
