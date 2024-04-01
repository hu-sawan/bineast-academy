import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "../../../components/dashboard/header/Header";
import "./Invoices.scss";
import { useAccessToken } from "../../../contexts/AccessTokenContext";
import { useEffect, useState } from "react";
import { Invoice } from "../../../types/types";

function Invoices() {
    const [invoices, setInvoices] = useState<Partial<Invoice>[]>([]);

    const accessToken = useAccessToken();

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await fetch(
                    process.env.REACT_APP_API_URL + "/api/dashboard/invoices",
                    {
                        method: "GET",
                        headers: {
                            "content-type": "application/json",
                            "x-access-token": accessToken,
                        },
                    }
                );

                const data = await response.json();

                console.log(data);
                setInvoices(data);
            } catch (error) {}
        };

        fetchInvoices();
    }, [accessToken]);

    const columns: GridColDef<Partial<Invoice>>[] = [
        { field: "id", headerName: "Invoice ID", flex: 1 },
        { field: "userId", headerName: "User Id", flex: 1 },
        {
            field: "endDate",
            headerName: "End Date",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row: { endDate } }) => {
                const formatted = new Date(
                    endDate as string
                ).toLocaleDateString();
                return formatted;
            },
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
        },
    ];
    return (
        <div className="dashboard-invoices">
            <Header
                title="Invoices"
                subtitle="In this page you can view all invoices"
            />

            <div className="invoices-table">
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
                    rows={invoices}
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
                                No Invoices at the moment
                            </div>
                        ),
                    }}
                />
            </div>
        </div>
    );
}

export default Invoices;
