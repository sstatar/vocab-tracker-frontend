"use client"; // ต้องใส่เพราะมีการใช้ปุ่มปิด/เปิด (Client-side interaction)

interface AddVocabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddVocabModal({ isOpen, onClose }: AddVocabModalProps) {
  // ถ้า isOpen เป็น false ให้ return null (ซ่อน Modal)
  if (!isOpen) return null;

  return (
    // Backdrop (พื้นหลังดำๆ เบลอๆ)
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
      
      {/* ตัวกล่อง Modal */}
      <div className="bg-background w-full max-w-md rounded-[2rem] p-6 sm:p-8 shadow-2xl border border-muted/20 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* ปุ่มปิด (X) มุมขวาบน */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-muted hover:text-danger transition-colors bg-muted/10 hover:bg-danger/10 p-2 rounded-full"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* หัวเรื่องฟอร์ม */}
        <h2 className="text-2xl font-bold text-primary mb-6">Add New Word</h2>

        {/* ฟอร์มกรอกข้อมูล */}
        <form className="space-y-4">
          
          {/* ช่องกรอกคำศัพท์ */}
          <div>
            <label className="block text-sm font-medium text-muted mb-1">Vocabulary <span className="text-danger">*</span></label>
            <input 
              type="text" 
              placeholder="e.g., Abundant" 
              className="w-full px-4 py-3 bg-muted/5 border border-muted/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* ช่องความหมาย */}
            <div>
              <label className="block text-sm font-medium text-muted mb-1">Meaning <span className="text-danger">*</span></label>
              <input 
                type="text" 
                placeholder="มากมาย" 
                className="w-full px-4 py-3 bg-muted/5 border border-muted/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                required
              />
            </div>
            
            {/* Dropdown ชนิดของคำ */}
            <div>
              <label className="block text-sm font-medium text-muted mb-1">Part of Speech</label>
              <select className="w-full px-4 py-3 bg-muted/5 border border-muted/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground">
                <option value="n.">Noun (n.)</option>
                <option value="v.">Verb (v.)</option>
                <option value="adj.">Adjective (adj.)</option>
                <option value="adv.">Adverb (adv.)</option>
              </select>
            </div>
          </div>

          {/* ช่องประโยคตัวอย่าง */}
          <div>
            <label className="block text-sm font-medium text-muted mb-1">Example Sentence (Optional)</label>
            <textarea 
              placeholder="The country has an abundant supply of natural gas." 
              rows={3}
              className="w-full px-4 py-3 bg-muted/5 border border-muted/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
            ></textarea>
          </div>

          {/* ปุ่มบันทึก */}
          <div className="pt-4 flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-muted/10 text-muted font-bold rounded-xl hover:bg-muted/20 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              onClick={(e) => { e.preventDefault(); onClose(); }} // จำลองการเซฟแล้วปิดหน้าต่าง
              className="flex-1 px-4 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg transition-all"
            >
              Save Word
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}