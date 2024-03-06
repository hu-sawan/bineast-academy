// ! This file is for the course context it is just a blueprint for the context should fix the logic
// ! The logic is not correct
import { createContext, useContext, useEffect, useState } from "react";
import {
    courseVideos,
    instructor,
    courseContextType,
    course,
} from "../types/types";
import { useAuth } from "./AuthContext";

const CourseContext = createContext<courseContextType | null>(null);

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
    const [course, setCourse] = useState<course | null>(null);
    const [instructors, setInstructors] = useState<instructor[]>([
        { id: -1, instructorFullName: "Unknown", email: "N/A" },
    ]);
    const [videos, setVideos] = useState<courseVideos[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    // a simple useEffect to fetch the course details, instructors and videos
    // TODO: separate the fetch into multiple useEffects to avoid unnecessary fetches
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

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
                    setError(error.message);
                } else {
                    setError("An unknown error occurred");
                }
            }
            setLoading(false);
        };

        if (courseId) {
            fetchData();
        }
    }, [courseId]);

    const requestVideos = async () => {
        try {
            const videosResponse = await fetch(
                `http://localhost:5050/api/videos/${courseId}/${
                    user ? user.uid : null
                }`
            );
            const videosData = await videosResponse.json();
            setVideos(videosData);
            if (user) {
                const courseResponse = await fetch(
                    `http://localhost:5050/api/courses/completed/${courseId}/${user.uid}`
                );
                const courseData = await courseResponse.json();

                setCourse((prevCourse) => {
                    if (prevCourse) {
                        return {
                            ...prevCourse,
                            completed: courseData.completed,
                        };
                    } else {
                        return prevCourse;
                    }
                });
            }
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    const courseDetais: courseContextType = {
        course,
        instructors,
        videos,
        error,
        setCourseId,
        requestVideos,
    };

    return (
        <CourseContext.Provider value={courseDetais}>
            {!loading && children}
        </CourseContext.Provider>
    );
};
