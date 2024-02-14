import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/home/Home";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";

function App() {
    return (
        <AuthProvider>
            <Nav />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </AuthProvider>
    );
}

export default App;
