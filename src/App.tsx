import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useTheme } from "./contexts/ThemeContext";
import { CourseProvider } from "./contexts/CourseContext";
import Loading from "./components/loading/Loading";
const Home = lazy(() => import("./pages/home/Home"));
const Nav = lazy(() => import("./components/nav/Nav"));
const Footer = lazy(() => import("./components/footer/Footer"));
const Course = lazy(() => import("./pages/course/Course"));
const Video = lazy(() => import("./components/video/Video"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));

// TODO: reduce the number of rerenderes by using memo and useCallback
// TODO: implement lazy loading for all app components
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
        <>
            <BrowserRouter basename="/bineast-academy">
                <div>
                    <CourseProvider>
                        <Nav />
                        <Suspense fallback={<Loading />}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route
                                    path={`/course/:courseId`}
                                    element={<Course />}
                                >
                                    <Route
                                        path=":orderNb"
                                        element={<Video />}
                                    />
                                </Route>
                            </Routes>
                        </Suspense>
                    </CourseProvider>
                    <Footer />
                </div>
            </BrowserRouter>
            <BrowserRouter basename="/dashboard">
                <Suspense fallback={<Loading />}>
                    <Dashboard />
                </Suspense>
            </BrowserRouter>
        </>
    );
}

export default App;
