import "./Overview.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faUserPlus,
    faStar,
    faChartLine,
    faVideo,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../../components/dashboard/header/Header";
import StatBox from "../../../components/dashboard/statBox/StatBox";
import { useAccessToken } from "../../../contexts/AccessTokenContext";

function Overview() {
    const [usersCount, setUsersCount] = useState<number>(0);
    const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
    const [totalSubscriptions, setTotalSubscriptions] = useState<number>(0);
    const [totalCourses, setTotalCourses] = useState<number>(0);

    const accessToken = useAccessToken();

    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await fetch(
                    process.env.REACT_APP_API_URL + "/api/dashboard/overview",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "x-access-token": accessToken,
                        },
                    }
                );

                if (response.ok) {
                    const {
                        totalUsers,
                        premiumUsers,
                        totalCourses,
                        totalIncome,
                    } = await response.json();
                    setUsersCount(totalUsers);
                    setMonthlyIncome(totalIncome);
                    setTotalSubscriptions(premiumUsers);
                    setTotalCourses(totalCourses);
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    });

    return (
        <div className="dashboard-overview">
            <Header title="Overview" subtitle="Welcome to my dashboard" />

            <div className="dashboard-overview__content">
                <div
                    className="content__card"
                    style={{
                        gridColumn: "span 3",
                    }}
                >
                    <StatBox
                        to="users"
                        value={usersCount.toString()}
                        subtitle="Total Users"
                        icon={
                            <FontAwesomeIcon className="icon" icon={faUser} />
                        }
                    />
                </div>
                <div
                    className="content__card"
                    style={{
                        gridColumn: "span 3",
                    }}
                >
                    <StatBox
                        to=""
                        value={`${monthlyIncome}$`}
                        subtitle="Monthly income"
                        icon={
                            <FontAwesomeIcon
                                className="icon"
                                icon={faChartLine}
                            />
                        }
                    />
                </div>
                <div
                    className="content__card"
                    style={{
                        gridColumn: "span 3",
                    }}
                >
                    <StatBox
                        to=""
                        value={totalSubscriptions.toString()}
                        subtitle="Total Subscription"
                        icon={
                            <FontAwesomeIcon className="icon" icon={faStar} />
                        }
                    />
                </div>
                <div
                    className="content__card"
                    style={{
                        gridColumn: "span 3",
                    }}
                >
                    <StatBox
                        to=""
                        value={totalCourses.toString()}
                        subtitle="Total Courses"
                        icon={
                            <FontAwesomeIcon className="icon" icon={faVideo} />
                        }
                    />
                </div>
                <div
                    className="content__card"
                    style={{
                        gridColumn: "span 8",
                        gridRow: "span 2",
                    }}
                >
                    <h3>Card 5</h3>
                </div>
                <div
                    className="content__card"
                    style={{
                        gridColumn: "span 4",
                        gridRow: "span 2",
                    }}
                >
                    <h3>Card 6</h3>
                </div>
                <div
                    className="content__card"
                    style={{
                        gridColumn: "span 3",
                    }}
                >
                    <h3>Card 7</h3>
                </div>
                <div
                    className="content__card"
                    style={{
                        gridColumn: "span 3",
                    }}
                >
                    <h3>Card 8</h3>
                </div>
            </div>
        </div>
    );
}

export default Overview;
