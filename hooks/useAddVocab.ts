import { useState } from "react";
import { vocabService, type CreateVocabData } from "@/lib/vocab.service";
import { useSWRConfig } from "swr";

export function useAddVocab(onSuccess: () => void) {
    // รับ onSuccess เข้ามาเพื่อบอกว่า "ถ้าเซฟเสร็จให้ทำอะไรต่อ" (เช่น ปิด Modal)

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
            // 1. ส่งข้อมูลไปเซฟที่ Backend
            await vocabService.createVocab(formData);

            // 2. สั่ง SWR รีเฟรชข้อมูลคำศัพท์หน้า Library
            mutate("/api/vocab");

            // 3. เคลียร์ฟอร์ม
            setFormData({ word: "", meaning: "", partOfSpeech: "n.", example: "" });

            // 4. เรียกฟังก์ชันปิด Modal ที่ส่งเข้ามา
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

    // ส่งฟังก์ชันปิด Modal แบบไม่ได้เซฟไปด้วย เพื่อให้เคลียร์ error
    const handleCancel = () => {
        setError("");
        setFormData({ word: "", meaning: "", partOfSpeech: "n.", example: "" });
        onSuccess();
    };

    return { formData, isLoading, error, handleChange, handleSubmit, handleCancel };
}