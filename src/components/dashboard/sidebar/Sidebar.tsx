import "./Sidebar.scss";
import { useState } from "react";
import profileImg from "../../../assets/providers/google.png";
import { Sidebar as ProSideBar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faPeopleArrows,
    faAddressBook,
    faFileInvoice,
    faUserPlus,
    faPlus,
    faQuestionCircle,
    faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../../contexts/ThemeContext";

interface ItemProps {
    title: string;
    to: string;
    icon: JSX.Element;
    selected: string;
    setSelected: (title: string) => void;
}

const Item = ({ title, to, icon, selected, setSelected }: ItemProps) => {
    return (
        <MenuItem
            component={<Link to={to} />}
            active={selected === title}
            style={{
                color: "var(--primary-text-color)",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: "500",
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <p>{title}</p>
        </MenuItem>
    );
};

const Sidebar = () => {
    const { theme } = useTheme();
    const [isOpen, SetIsOpen] = useState(true);
    const [selected, setSelected] = useState("Dashboard");

    const items = [
        {
            subtitle: "",
            items: [
                {
                    title: "Dashboard",
                    to: "/",
                    icon: <FontAwesomeIcon icon={faHome} />,
                    selected,
                    setSelected,
                },
            ],
        },
        {
            subtitle: "Data",
            items: [
                {
                    title: "Manage Tean",
                    to: "/team",
                    icon: <FontAwesomeIcon icon={faPeopleArrows} />,
                    selected,
                    setSelected,
                },
                {
                    title: "Contacts",
                    to: "/contacts",
                    icon: <FontAwesomeIcon icon={faAddressBook} />,
                    selected,
                    setSelected,
                },
                {
                    title: "Invoices",
                    to: "/invoices",
                    icon: <FontAwesomeIcon icon={faFileInvoice} />,
                    selected,
                    setSelected,
                },
            ],
        },
        {
            subtitle: "Pages",
            items: [
                {
                    title: "Add User",
                    to: "/addUser",
                    icon: <FontAwesomeIcon icon={faUserPlus} />,
                    selected,
                    setSelected,
                },
                {
                    title: "Add Products",
                    to: "/addProducts",
                    icon: <FontAwesomeIcon icon={faPlus} />,
                    selected,
                    setSelected,
                },
                {
                    title: "FAQ Page",
                    to: "/faq",
                    icon: <FontAwesomeIcon icon={faQuestionCircle} />,
                    selected,
                    setSelected,
                },
            ],
        },
    ];

    return (
        <div className={`sidebar`}>
            <ProSideBar
                collapsed={!isOpen}
                style={{
                    backgroundColor: `var(--primary-background-color) !important`,
                }}
            >
                <Menu>
                    <MenuItem
                        className="sidebar__menu-header"
                        icon={
                            !isOpen ? (
                                <button
                                    className="sidebar__menu-button"
                                    onClick={() => SetIsOpen(!isOpen)}
                                >
                                    <FontAwesomeIcon icon={faBars} />
                                </button>
                            ) : undefined
                        }
                        style={{
                            margin: "10px 0 20px 0",
                        }}
                    >
                        {isOpen && (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginLeft: "15px",
                                }}
                            >
                                <h3
                                    style={{
                                        fontSize: "24px",
                                        fontWeight: "400",
                                    }}
                                >
                                    BINEAST
                                </h3>
                                <button
                                    className="sidebar__menu-button"
                                    onClick={() => SetIsOpen(!isOpen)}
                                >
                                    <FontAwesomeIcon icon={faBars} />
                                </button>
                            </div>
                        )}
                    </MenuItem>

                    {isOpen && (
                        <div
                            style={{
                                display: "flex",
                                textAlign: "center",
                                padding: "10% 0 10% 10%",
                                borderTop: `1px solid var(--secondary-text-color)`,
                                borderBottom: `1px solid var(--secondary-text-color)`,
                            }}
                        >
                            <div>
                                <img
                                    src={profileImg}
                                    style={{
                                        display: "block",
                                        width: "35px",
                                        height: "35px",
                                        cursor: "pointer",
                                        borderRadius: "50%",
                                        objectFit: "contain",
                                    }}
                                    alt="profile-user"
                                />
                            </div>

                            <div
                                style={{
                                    textAlign: "center",
                                    flex: "1",
                                }}
                            >
                                <h5
                                    style={{
                                        color: "var(--primary-text-color)",
                                        fontWeight: "700",
                                        fontSize: "16px",
                                        marginTop: "4px",
                                    }}
                                >
                                    {/* username */}
                                    Hussein Sawan
                                </h5>
                                <h6
                                    style={{
                                        color: "var(--light-green-text-color)",
                                        fontWeight: "500",
                                        fontSize: "14px",
                                    }}
                                >
                                    {/* user role */}
                                    Admin
                                </h6>
                            </div>
                        </div>
                    )}

                    <div
                        className={`sidebar-items ${theme}`}
                        style={{
                            // "& .ps-menu-button:hover": {
                            //     backgroundColor: `${
                            //         theme === "dark"
                            //             ? "#1016245e"
                            //             : "#00000014"
                            //     } !important`,
                            //     color: "#6870fa !important",
                            // },
                            // "& .ps-active": {
                            //     color: "#6870fa !important",
                            // },
                            padding: isOpen ? "10%" : undefined,
                        }}
                    >
                        {items.map((item, index) => (
                            <span key={index}>
                                {item.subtitle && (
                                    <h6 className="sidebar-items__subtitle">
                                        {item.subtitle}
                                    </h6>
                                )}
                                {item.items.map((item, index) => (
                                    <Item
                                        key={index}
                                        title={item.title}
                                        to={item.to}
                                        icon={item.icon}
                                        selected={selected}
                                        setSelected={setSelected}
                                    />
                                ))}
                            </span>
                        ))}
                    </div>
                </Menu>
            </ProSideBar>
        </div>
    );
};

export default Sidebar;
