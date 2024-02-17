import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import { useTheme } from "./contexts/ThemeContext";
import Course from "./pages/course/Course";
import Video from "./components/video/Video";

function App() {
    const { theme } = useTheme();

    const html = document.documentElement;

    if (theme === "light") {
        if (html.classList.contains("dark")) html.classList.remove("dark");
        html.classList.add("light");
    } else {
        if (html.classList.contains("light")) html.classList.remove("light");
        html.classList.add("dark");
    }

    return (
        <div>
            <BrowserRouter basename="/bineast-academy">
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path={`/course/:id`} element={<Course />}>
                        <Route path=":vidId" element={<Video />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            <Footer />
        </div>
    );
}

export default App;
