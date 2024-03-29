import "./Users.scss";
import { useEffect, useState } from "react";
import Header from "../../../components/dashboard/header/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faGraduationCap,
    faLock,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { UserFromDB } from "../../../types/types";
import { useAccessToken } from "../../../contexts/AccessTokenContext";

const Users = () => {
    const [users, setUsers] = useState<UserFromDB[]>([]);

    const accessToken = useAccessToken();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    process.env.REACT_APP_API_URL + "/api/users",
                    {
                        method: "GET",
                        headers: {
                            "content-type": "application/json",
                            "x-access-token": accessToken,
                        },
                    }
                );

                const data = await response.json();
                setUsers(data);
            } catch (error) {}
        };

        fetchUsers();
    }, [accessToken]);

    const columns: GridColDef<UserFromDB>[] = [
        { field: "id", headerName: "ID" },
        { field: "email", headerName: "Email", flex: 1 },
        {
            field: "role",
            headerName: "Role",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row: { role } }) => {
                return (
                    <div
                        style={{
                            width: "60%",
                            margin: "0 auto",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {role === "ADMIN" && (
                            <FontAwesomeIcon
                                style={{ fontSize: "12px" }}
                                icon={faLock}
                            />
                        )}
                        {role === "INSTRUCTOR" && (
                            <FontAwesomeIcon
                                style={{ fontSize: "12px" }}
                                icon={faGraduationCap}
                            />
                        )}
                        {role === "USER" && (
                            <FontAwesomeIcon
                                style={{ fontSize: "12px" }}
                                icon={faUser}
                            />
                        )}
                        <p
                            style={{
                                marginLeft: "5px",
                            }}
                        >
                            {role}
                        </p>
                    </div>
                );
            },
        },
        {
            field: "isPremium",
            headerName: "Premium",
            flex: 1,
            renderCell: ({ row: { isPremium } }) => {
                return (
                    <div>
                        <FontAwesomeIcon
                            style={{
                                color: isPremium ? "#3fb24b" : "grey",
                            }}
                            icon={faCircleCheck}
                        />
                    </div>
                );
            },
        },
    ];
    return (
        <div className="dashboard-users">
            <Header
                title="Users"
                subtitle="In this page you can manage users"
            />
            <div className="users-table">
                <DataGrid
                    sx={{
                        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                            outline: "none !important",
                        },

                        "& .MuiDataGrid-filler": {
                            height: "1px !important",
                        },
                    }}
                    rows={users}
                    columns={columns}
                />
            </div>
        </div>
    );
};

export default Users;
