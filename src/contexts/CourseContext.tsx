import { createContext, useContext, useEffect, useState } from "react";
import {
    CourseVideos,
    Instructor,
    CourseContextType,
    Course,
} from "../types/types";
import { useAuth } from "./AuthContext";
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
    const [courseId, setCourseId] = useState<string>("");
    const [course, setCourse] = useState<Course | null>(null);
    const [instructors, setInstructors] = useState<Instructor[]>([
        { id: -1, instructorFullName: "Unknown", email: "N/A" },
    ]);

    const [videos, setVideos] = useState<CourseVideos[]>([]);

    const [contextLoading, setContextLoading] = useState<boolean>(false);
    const [contextError, setContextError] = useState<string>("");

    // a simple useEffect to fetch the course details, instructors and videos
    // TODO: separate the fetch into multiple useEffects to avoid unnecessary fetches
    useEffect(() => {
        const fetchData = async () => {
            setContextLoading(true);
            setVideos([]);
            setCourse(null);

            try {
                const [instructorResponse, courseResponse] = await Promise.all([
                    fetch(`http://localhost:5050/api/instructors/${courseId}`),
                    fetch(
                        `http://localhost:5050/api/courses/${courseId}/${
                            user ? user.uid : null
                        }`
                    ),
                ]);

                const [instructorsData, courseData] = await Promise.all([
                    instructorResponse.json(),
                    courseResponse.json(),
                ]);

                setInstructors(instructorsData);
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
    }, [courseId, user]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5050/api/videos/${courseId}/${
                        user ? user.uid : ""
                    }`
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
    }, [courseId, course, user]);

    const courseDetais: CourseContextType = {
        course,
        instructors,
        videos,
        contextError,
        contextLoading,
        setCourse,
        setVideos,
        setCourseId,
    };

    return (
        <CourseContext.Provider value={courseDetais}>
            {children}
        </CourseContext.Provider>
    );
};
