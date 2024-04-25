import { createContext, useContext, useEffect, useState } from "react";
import {
    CourseVideos,
    Instructor,
    CourseContextType,
    CourseContextInterface,
} from "../types/types";
import { useAuth } from "./AuthContext";
import { useAccessToken } from "./AccessTokenContext";
// import { useAuth } from "./AuthContext";

const CourseContext = createContext<CourseContextType | null>(null);

export const useCourse = () => {
    const context = useContext(CourseContext);
    if (!context) {
        throw new Error("useCourse must be used within a CourseProvider");
    }
    return context;
};

// This context provider set the main details of a course like course details and videos and instructors
export const CourseProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const accessToken = useAccessToken();
    const [courseId, setCourseId] = useState<string>("");
    const [course, setCourse] = useState<CourseContextInterface | null>(null);
    const [instructors, setInstructors] = useState<Instructor[]>([
        { id: -1, fullName: "Unknown", email: "N/A" },
    ]);
    const [activeVideoIdx, setActiveVideoIdx] = useState<number>(0);

    const [videos, setVideos] = useState<CourseVideos[]>([]);

    const [contextLoading, setContextLoading] = useState<boolean>(false);
    const [contextError, setContextError] = useState<string>("");

    // a simple useEffect to fetch the course details, instructors and videos
    useEffect(() => {
        const fetchData = async () => {
            setContextLoading(true);
            setVideos([]);
            setCourse(null);

            try {
                const courseResponse = await fetch(
                    `http://localhost:5050/api/courses/${courseId}/${
                        user ? user.uid : null
                    }`,
                    {
                        method: "GET",
                        headers: {
                            "content-type": "application/json",
                            "x-access-token": accessToken,
                        },
                    }
                );

                const courseData = await courseResponse.json();

                setCourse(courseData[0]);
            } catch (error) {
                if (error instanceof Error) {
                    setContextError(error.message);
                } else {
                    setContextError("An unknown error occurred");
                }
            }
            setContextLoading(false);
        };

        if (courseId) {
            fetchData();
        }
    }, [accessToken, courseId, user]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5050/api/videos/${courseId}/${
                        user ? user.uid : ""
                    }`,
                    {
                        method: "GET",
                        headers: {
                            "content-type": "application/json",
                            "x-access-token": accessToken,
                        },
                    }
                );

                const data = await response.json();

                if (response.status !== 200) throw Error(data.message);

                setVideos(data);
            } catch (error) {
                if (error instanceof Error) {
                    setContextError(error.message);
                } else {
                    setContextError("An unknown error occurred");
                }
            }
        };

        // is user not logged in and the course is a premium course then don't provide videos
        if (courseId && (user || !course?.isPremium)) fetchVideos();
        else setVideos([]);
    }, [courseId, course, user, accessToken]);

    useEffect(() => {
        const getInstructors = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5050/api/instructors/${courseId}`,
                    {
                        method: "GET",
                        headers: {
                            "content-type": "application/json",
                            "x-access-token": accessToken,
                        },
                    }
                );

                const data = await response.json();

                setInstructors(data);
            } catch (error) {
                if (error instanceof Error)
                    return setContextError(error.message);

                setContextError("Something wrong happened!");
            }
        };

        if (courseId) getInstructors();
    }, [accessToken, courseId]);

    const courseDetais: CourseContextType = {
        course,
        instructors,
        videos,
        activeVideoIdx,
        contextError,
        contextLoading,
        setCourse,
        setActiveVideoIdx,
        setVideos,
        setCourseId,
    };

    return (
        <CourseContext.Provider value={courseDetais}>
            {children}
        </CourseContext.Provider>
    );
};
