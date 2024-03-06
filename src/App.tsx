import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import { useTheme } from "./contexts/ThemeContext";
import Course from "./pages/course/Course";
import Video from "./components/video/Video";
import { CourseProvider } from "./contexts/CourseContext";

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
                <CourseProvider>
                    <Nav />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path={`/course/:courseId`} element={<Course />}>
                            <Route path=":orderNb" element={<Video />} />
                        </Route>
                    </Routes>
                </CourseProvider>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
