import {Routes, Route, BrowserRouter} from "react-router-dom";
import "./App.css";
import ProductsPage from "./pages/ProductsPage.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/products" element={<ProductsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;