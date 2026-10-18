import { useState } from "react";
import { vocabService, type CreateVocabData } from "@/lib/vocab.service";
import { useSWRConfig } from "swr";

export function useAddVocab(onSuccess: () => void) {

    const { mutate } = useSWRConfig();

    const [formData, setFormData] = useState<CreateVocabData>({
        word: "",
        meaning: "",
        partOfSpeech: "n.",
        example: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {

            await vocabService.createVocab(formData);

            mutate("/api/vocab");

            setFormData({ word: "", meaning: "", partOfSpeech: "n.", example: "" });

            onSuccess();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setError("");
        setFormData({ word: "", meaning: "", partOfSpeech: "n.", example: "" });
        onSuccess();
    };

    return { formData, isLoading, error, handleChange, handleSubmit, handleCancel };
}
