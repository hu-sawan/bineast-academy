export interface videoDetails {
    orderNb: number;
    courseId: string;
    title: string;
    description: string;
    videoUrl: string;
    durationInMinutes: number;
    isDone: boolean;
}

export interface instructor {
    id: number;
    instructorFullName: string;
    email: string;
    phoneNumber?: string;
}

export interface courseVideos {
    orderNb: number;
    courseId: string;
    durationInMinutes: number;
    title: string;
    description: string;
    videoUrl: string;
    isDone: boolean;
}

export interface course {
    id: string;
    title: string;
    description: string;
    durationInMinutes: number;
    level:
        | "Beginner"
        | "Intermediate"
        | "Advanced"
        | "beginner"
        | "intermediate"
        | "advanced";
    imgUrl: string;
    isPremium: boolean;
    completed: number;
}

export interface courseContextType {
    course: course | null;
    videos: courseVideos[];
    instructors: instructor[];
    contextLoading: boolean;
    contextError: string;
    setCourse: (course: course) => void;
    setVideos: (videos: courseVideos[]) => void;
    setCourseId: (courseId: string) => void;
}
