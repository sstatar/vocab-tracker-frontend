import { useState } from "react"; // ลบ useEffect ออกจาก import ด้วย
import { vocabService, type UpdateVocabData } from "@/lib/vocab.service";
import { useSWRConfig } from "swr";
import { type Vocab } from "@/types";

export function useEditVocab(initialVocab: Vocab, onSuccess: () => void) {
  const { mutate } = useSWRConfig();

  // เซ็ตค่าเริ่มต้นครั้งเดียวจบ! ไม่ต้องมี useEffect มาคอยอัปเดตแล้ว
  const [formData, setFormData] = useState<UpdateVocabData>({
    word: initialVocab.word,
    meaning: initialVocab.meaning,
    partOfSpeech: initialVocab.partOfSpeech,
    example: initialVocab.example || "",
    status: initialVocab.status,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    /* โค้ดเซฟข้อมูลเหมือนเดิมเป๊ะ */
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await vocabService.updateVocab(initialVocab.id, formData);
      mutate("/api/vocab");
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

  return { formData, isLoading, error, handleChange, handleSubmit };
}