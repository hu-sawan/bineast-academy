import { createContext, useContext, useEffect, useState } from "react";
import {
    CourseVideos,
    Instructor,
    CourseContextType,
    Course,
} from "../types/types";
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
    // TODO: get user from useAuth
    const user = {
        uid: "U001",
    };
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

            try {
                const [instructorResponse, courseResponse, videoResponse] =
                    await Promise.all([
                        fetch(
                            `http://localhost:5050/api/instructors/${courseId}`
                        ),
                        fetch(
                            `http://localhost:5050/api/courses/${courseId}/${
                                user ? user.uid : null
                            }`
                        ),
                        fetch(
                            `http://localhost:5050/api/videos/${courseId}/${
                                user ? user.uid : null
                            }`
                        ),
                    ]);

                const [instructorsData, courseData, videoData] =
                    await Promise.all([
                        instructorResponse.json(),
                        courseResponse.json(),
                        videoResponse.json(),
                    ]);

                setInstructors(instructorsData);
                setVideos(videoData);
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
    }, [courseId]);

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
