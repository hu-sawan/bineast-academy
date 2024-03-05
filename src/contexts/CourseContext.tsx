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

export const CourseProvider = ({ children }: { children: React.ReactNode }) => {
    const user = useAuth();
    const [courseId, setCourseId] = useState<string>("");
    const [course, setCourse] = useState<course | null>(null);
    const [instructors, setInstructors] = useState<instructor[]>([
        { id: -1, instructorFullName: "Unknown", email: "N/A" },
    ]);
    const [videos, setVideos] = useState<courseVideos[] | null>(null);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const [instructorResponse, courseResponse, videoResponse] =
                    await Promise.all([
                        fetch(
                            `http://localhost:5050/api/instructors/${courseId}`
                        ),
                        fetch(`http://localhost:5050/api/courses/${courseId}`),
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
                setCourse(courseData);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };

        if (courseId) {
            fetchData();
        }
    }, [courseId]);

    const requestVideos = async () => {
        try {
            const response = await fetch(
                `http://localhost:5050/api/videos/${courseId}/${
                    user ? user.uid : null
                }`
            );
            const data = await response.json();
            setVideos(data);
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    const courseDetais: courseContextType = {
        course,
        instructors,
        videos,
        setCourseId,
        requestVideos,
    };

    return (
        <CourseContext.Provider value={courseDetais}>
            {!loading && children}
        </CourseContext.Provider>
    );
};
