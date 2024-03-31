import "./Overview.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faUserPlus,
    faStar,
    faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../../components/dashboard/header/Header";
import StatBox from "../../../components/dashboard/statBox/StatBox";

function Overview() {
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
                        value="100"
                        subtitle="Active Users"
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
                        value="20$"
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
                        value="5"
                        subtitle="New Subscription"
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
                        value="23"
                        subtitle="New Users"
                        icon={
                            <FontAwesomeIcon
                                className="icon"
                                icon={faUserPlus}
                            />
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
