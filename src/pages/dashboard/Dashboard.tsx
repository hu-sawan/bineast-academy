import "./Dashboard.scss";
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import Loading from "../../components/loading/Loading";
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

function Dashboard() {
    const { theme } = useTheme();

    // const { user } = useAuth();

    // if (!user) {
    //     return <Navigate to={"/login"} />;
    // }

    // if (
    //     user.role.toLowerCase() !== "admin" &&
    //     user.role.toLowerCase() !== "instructor"
    // )
    //     return <div>NOT AUTHORIZED</div>;

    return (
        <div className="dashboard">
            <Sidebar />
            <main className="content">
                <Topbar />
                <div className="dashboard-section">
                    <Suspense
                        fallback={
                            <Loading
                                backgroundColor={
                                    theme === "dark" ? "#141b2d" : ""
                                }
                                particlesBackgroundColor={
                                    theme === "dark" ? "#1f2a40" : "#f2f0f0"
                                }
                            />
                        }
                    >
                        <Routes>
                            <Route path="/" element={<Overview />} />
                            <Route path="users" element={<Users />} />
                            <Route path="addUser" element={<AddUser />} />
                            <Route
                                path="addInstructor"
                                element={<AddInstructor />}
                            />
                            <Route path="courses" element={<Courses />}>
                                <Route path=":courseId" element={<></>} />
                            </Route>
                            <Route path="invoices" element={<Invoices />} />
                        </Routes>
                    </Suspense>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
