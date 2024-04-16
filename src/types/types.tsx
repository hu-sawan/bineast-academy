import { User } from "firebase/auth";

export interface UserFromDB {
    id: string;
    email: string;
    role: string;
    fullName?: string;
    isPremium: boolean;
    phoneNumber?: string;
}

export interface LocalUser
    extends Partial<User>,
        Omit<UserFromDB, "email" | "phoneNumber"> {}

export interface AuthContextType {
    user: LocalUser | null;
    authContextSuccess: string;
    authContextError: string;
    authContextLoading: boolean;
    authContextIsDone: boolean;
    updateContext: (newValues: Partial<AuthContextType>) => void;
}

export interface Video {
    id: string;
    orderNb: number;
    courseId: string;
    title: string;
    description: string;
    videoUrl: string;
    durationInMinutes: number;
}

export interface VideoDetails extends Video {
    isDone: boolean;
}

export interface Instructor {
    id: number;
    instructorFullName: string;
    email: string;
    phoneNumber?: string;
}

export interface CourseVideos extends Video {
    isDone: boolean;
}

export interface Course {
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
    visibility?: string;
    tags?: string;
}

export interface CourseContextInterface extends Course {
    completed: number;
}

export interface CourseContextType {
    course: CourseContextInterface | null;
    videos: CourseVideos[];
    instructors: Instructor[];
    contextLoading: boolean;
    contextError: string;
    setCourse: (course: CourseContextInterface) => void;
    setVideos: (videos: CourseVideos[]) => void;
    setCourseId: (courseId: string) => void;
}

export interface Invoice {
    id: string;
    userId: string;
    endDate: string;
    paymentStatus: string;
    status: string;
}
