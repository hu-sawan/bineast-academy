import "./Dashboard.scss";
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import Loading from "../../components/loading/Loading";
import AccessDenied from "../../components/accessDenied/AccessDenied";
import { useAuth } from "../../contexts/AuthContext";
// import { useAuth } from "../../contexts/AuthContext";
const Users = lazy(() => import("./users/Users"));
const AddUser = lazy(() => import("./addUser/AddUser"));
const AddInstructor = lazy(() => import("./addInstructor/AddInstructor"));
const Courses = lazy(() => import("./courses/Courses"));
const Invoices = lazy(() => import("./invoices/Invoices"));
const Overview = lazy(() => import("./overview/Overview"));
const Topbar = lazy(() => import("../../components/dashboard/topbar/Topbar"));
const Sidebar = lazy(
    () => import("../../components/dashboard/sidebar/Sidebar")
);
const Videos = lazy(() => import("./videos/Videos"));

function Dashboard() {
    const { theme } = useTheme();
    const { user } = useAuth();

    return (
        <div className="dashboard">
            <Sidebar />
            <main className="content">
                <Topbar />
                <div className="dashboard-section">
                    <Suspense
                        fallback={
                            <div className="dashboard-section__status">
                                <Loading
                                    backgroundColor={
                                        theme === "dark" ? "#141b2d" : ""
                                    }
                                    particlesBackgroundColor={
                                        theme === "dark" ? "#1f2a40" : "#f2f0f0"
                                    }
                                />
                            </div>
                        }
                    >
                        <Routes>
                            <Route path="/" element={<Overview />} />
                            <Route
                                path="users"
                                element={
                                    user?.role.toLowerCase() === "admin" ? (
                                        <Users />
                                    ) : (
                                        <AccessDenied to="/dashboard" />
                                    )
                                }
                            />
                            <Route
                                path="addUser"
                                element={
                                    user?.role.toLowerCase() === "admin" ? (
                                        <AddUser />
                                    ) : (
                                        <AccessDenied to="/dashboard" />
                                    )
                                }
                            />
                            <Route
                                path="addInstructor"
                                element={
                                    user?.role.toLowerCase() === "admin" ? (
                                        <AddInstructor />
                                    ) : (
                                        <AccessDenied to="/dashboard" />
                                    )
                                }
                            />
                            <Route path="courses" element={<Courses />} />
                            <Route
                                path="courses/:courseId"
                                element={<Videos />}
                            />
                            <Route
                                path="invoices"
                                element={
                                    user?.role.toLowerCase() === "admin" ? (
                                        <Invoices />
                                    ) : (
                                        <AccessDenied to="/dashboard" />
                                    )
                                }
                            />
                        </Routes>
                    </Suspense>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
