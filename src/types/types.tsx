export interface instructor {
    id: number;
    instructorFullName: string;
    email: string;
    phoneNumber?: string;
}

export interface courseVideos {
    orderNb: number;
    couresId: string;
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
}

export interface courseContextType {
    course: course | null;
    videos: courseVideos[] | null;
    instructors: instructor[] | null;
    setCourseId: (courseId: string) => void;
    requestVideos: () => void;
}
