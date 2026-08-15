import { type Vocab } from "@/types";

export interface CreateVocabData {
    word: string;
    meaning: string;
    partOfSpeech: string;
    example?: string;
}

export interface UpdateVocabData {
    word?: string;
    meaning?: string;
    partOfSpeech?: string;
    example?: string;
    status?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        if (response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            throw new Error("Session expired. Please login again.");
        }

        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Request failed");
    }

    if (response.status === 204) return true;

    return response.json();
};

export const vocabService = {
    getAllVocabs: async (): Promise<Vocab[]> => {

        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("No authentication token found. Please login.");
        }

        const response = await fetch(`${API_URL}/vocab`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        return handleResponse(response);
    },

    createVocab: async (vocabData: CreateVocabData) => {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found. Please login.");

        const response = await fetch(`${API_URL}/vocab`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(vocabData),
        });

        return handleResponse(response);
    },

    updateVocab: async (id: string, vocabData: UpdateVocabData) => {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found. Please login.");

        const response = await fetch(`${API_URL}/vocab/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(vocabData),
        });

        return handleResponse(response);
    },

    deleteVocab: async (id: string) => {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found. Please login.");

        const response = await fetch(`${API_URL}/vocab/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });

        return handleResponse(response);
    },

    getVocabStats: async () => {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found. Please login.");

        const response = await fetch(`${API_URL}/vocab/stats`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        return handleResponse(response);
    },

    reviewVocab: async (id: string, status: "MASTERED" | "LEARNING" | "NEEDS_REVIEW") => {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await fetch(`${API_URL}/vocab/${id}/review`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status }),
        });

        if (!response.ok) {
            throw new Error("Failed to review vocabulary");
        }

        return response.json();
    },
};