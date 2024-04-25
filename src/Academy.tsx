import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import SuccessCard from "./components/statusCard/StatusCard";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

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
                    <Route path=":videoId" element={<Video />} />
                </Route>
                <Route
                    path="/success"
                    element={
                        <SuccessCard
                            message="Thank you for your subscription"
                            title="Success"
                            color="#88b04b"
                            icon={faCheck}
                        />
                    }
                />
                <Route
                    path="/cancel"
                    element={
                        <SuccessCard
                            message="Your purchase was cancelled"
                            title="Cancelled"
                            color="#e74c3ca1"
                            icon={faXmark}
                        />
                    }
                />
                <Route path="/login" element={<div>Login here</div>} />
                <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default Academy;
