export interface QuizQuestion {
    question: string;
    options: string[];
    correct_answer: string;
}

export interface Article {
    id: number;
    title: string;
    article: string;
    source: string;
    summary?: string;
    translation?: string;
    quiz?: QuizQuestion[];
    sentiment: string;
}