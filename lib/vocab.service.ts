import { handleResponse } from "./api";
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
    status?: 'LEARNING' | 'MASTERED';

}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

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

        return handleResponse(response, "Failed to fetch vocabulary");
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

        return handleResponse(response, "Failed to create vocabulary");
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

        return handleResponse(response, "Failed to update vocabulary");
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

        return handleResponse(response, "Failed to delete vocabulary");
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

        return handleResponse(response, "Failed to fetch vocabulary statistics");
    },

    reviewVocab: async (id: string, status: "MASTERED" | "LEARNING", isMistake: boolean = false) => {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await fetch(`${API_URL}/vocab/${id}/review`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status, isMistake }),
        });

        return handleResponse(response, "Failed to review vocabulary");
    },
};
