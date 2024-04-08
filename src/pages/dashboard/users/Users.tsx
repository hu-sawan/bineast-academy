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

interface UserRoleProps {
    userId: string;
    role: string;
}

const UserRole = ({ userId, role }: UserRoleProps) => {
    const [prevChoice, setPrevChoice] = useState(role);
    const [choice, setChoice] = useState(role);
    const [isEditing, setIsEditing] = useState(false);

    const accessToken = useAccessToken();

    role = role.toUpperCase();

    const roleIcons: { [key: string]: JSX.Element } = {
        ADMIN: <FontAwesomeIcon style={{ fontSize: "11px" }} icon={faLock} />,
        INSTRUCTOR: (
            <FontAwesomeIcon
                style={{ fontSize: "11px" }}
                icon={faGraduationCap}
            />
        ),
        USER: <FontAwesomeIcon style={{ fontSize: "11px" }} icon={faUser} />,
    };

    const handleChangeRole = (role: string) => {
        setChoice(role);
        setIsEditing(true);
    };

    const handleUpdate = () => {
        const updateUserRole = async () => {
            try {
                const response = await fetch(
                    process.env.REACT_APP_API_URL + "/api/users/" + userId,
                    {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json",
                            "x-access-token": accessToken,
                        },
                        body: JSON.stringify({
                            role: choice,
                        }),
                    }
                );

                if (response.ok) {
                    setPrevChoice(choice);
                    setIsEditing(false);
                } else {
                    setChoice(prevChoice);
                }
            } catch (error) {}
        };

        updateUserRole();
    };

    const handleCancel = () => {
        setChoice(prevChoice);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="users-table__confirm__role">
                <span className="is-easy hover" onClick={handleUpdate}>
                    Update
                </span>
                <span className="is-hard hover" onClick={handleCancel}>
                    Cancel
                </span>
            </div>
        );
    }

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
            <span className="icon">{roleIcons[role]}</span>
            <select
                className="users-table__role"
                value={choice}
                onChange={(e) => handleChangeRole(e.target.value)}
            >
                {Object.keys(roleIcons).map((role) => (
                    <option key={role} value={role}>
                        {role}
                    </option>
                ))}
            </select>
        </div>
    );
};

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
            renderCell: ({ row: { role, id } }) => (
                <UserRole userId={id} role={role} />
            ),
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

                        "& .MuiDataGrid-overlayWrapper": {
                            height: "55px !important",
                        },
                    }}
                    rows={users}
                    columns={columns}
                    slots={{
                        noRowsOverlay: () => (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100%",
                                    color: "var(--primary-text-color)",
                                }}
                            >
                                No users found
                            </div>
                        ),
                    }}
                />
            </div>
        </div>
    );
};

export default Users;
