import { Route, Routes as Router, BrowserRouter } from "react-router-dom";
import ListProducts from "../components/list-products/ListProducts";
import Form from "../components/form/Form";

const Routes = (formData) => {
  return (
    <BrowserRouter>
      <Router>
        <Route element={<Form />} path="/" />
        <Route element={<ListProducts />} path="/list" />
      </Router>
    </BrowserRouter>
  );
};

export default Routes;
