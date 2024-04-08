import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./pages/home/Home"));
const Nav = lazy(() => import("./components/nav/Nav"));
const Footer = lazy(() => import("./components/footer/Footer"));
const Course = lazy(() => import("./pages/course/Course"));
const Video = lazy(() => import("./components/video/Video"));

function Academy() {
    return (
        <div>
            <Nav />
            <Routes>
                <Route path={`/course/:courseId`} element={<Course />}>
                    <Route path=":orderNb" element={<Video />} />
                </Route>
                <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default Academy;
