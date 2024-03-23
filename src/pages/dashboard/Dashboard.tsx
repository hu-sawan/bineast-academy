import "./Dashboard.scss";
import { Route, Routes } from "react-router-dom";
import Overview from "./overview/Overview";
import Sidebar from "../../components/dashboard/sidebar/Sidebar";
import Topbar from "../../components/dashboard/topbar/Topbar";

function Dashboard() {
    return (
        <div className="dashboard">
            <Sidebar />
            <main className="content">
                <Topbar />
                <Routes>
                    <Route path="/" element={<Overview />} />
                </Routes>
            </main>
        </div>
    );
}

export default Dashboard;
