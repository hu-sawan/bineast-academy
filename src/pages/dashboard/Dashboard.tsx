import "./Dashboard.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import Overview from "./overview/Overview";
import Sidebar from "../../components/dashboard/sidebar/Sidebar";
import Topbar from "../../components/dashboard/topbar/Topbar";
import { useAuth } from "../../contexts/AuthContext";
import Users from "./users/Users";
import AddUser from "./addUser/AddUser";
import AddInstructor from "./addInstructor/AddInstructor";
import Courses from "./courses/Courses";
import Invoices from "./invoices/Invoices";

function Dashboard() {
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
                    <Routes>
                        <Route path="/" element={<Overview />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/addUser" element={<AddUser />} />
                        <Route
                            path="/addInstructor"
                            element={<AddInstructor />}
                        />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/invoices" element={<Invoices />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
