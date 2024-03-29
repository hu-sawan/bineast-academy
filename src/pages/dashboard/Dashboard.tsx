import "./Dashboard.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import Overview from "./overview/Overview";
import Sidebar from "../../components/dashboard/sidebar/Sidebar";
import Topbar from "../../components/dashboard/topbar/Topbar";
import { useAuth } from "../../contexts/AuthContext";
import Users from "./users/Users";

function Dashboard() {
    const { user } = useAuth();

    // if (!user) {
    //     return <Navigate to={"/login"} />;
    // }

    return (
        <div className="dashboard">
            <Sidebar />
            <main className="content">
                <Topbar />
                <div className="dashboard-section">
                    <Routes>
                        <Route path="/" element={<Overview />} />
                        <Route path="/users" element={<Users />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
