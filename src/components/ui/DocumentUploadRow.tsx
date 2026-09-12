"use client";

import { useRef, type ChangeEvent } from "react";
import type { DocumentMeta, DocumentRecord } from "@/types/document";
import { CheckCircle2, UploadCloud, FileText } from "lucide-react";

interface DocumentUploadRowProps {
  meta: DocumentMeta;
  record: DocumentRecord;
  onUpload: (fileName: string) => void;
}

export function DocumentUploadRow({ meta, record, onUpload }: DocumentUploadRowProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const uploaded = record.status === "uploaded" || record.status === "verified";

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file.name);
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-surface-border bg-white p-4">
      <div className="flex items-center gap-3">
        <div
          className={[
            "flex h-10 w-10 items-center justify-center rounded-full",
            uploaded ? "bg-emerald-500/15" : "bg-surface-muted",
          ].join(" ")}
        >
          {uploaded ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />
          ) : (
            <FileText className="h-5 w-5 text-ink-muted" aria-hidden="true" />
          )}
        </div>
        <div>
          <p className="flex items-center gap-1.5 text-sm font-medium text-ink">
            {meta.label}
            {!meta.required && <span className="text-xs font-normal text-ink-muted">(opsional)</span>}
          </p>
          <p className="text-xs text-ink-muted">{uploaded ? record.fileName : meta.description}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={[
          "flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium transition-colors",
          uploaded
            ? "border border-surface-border text-ink hover:bg-surface-muted"
            : "bg-brand-700 text-white hover:bg-brand-800",
        ].join(" ")}
      >
        <UploadCloud className="h-4 w-4" aria-hidden="true" />
        {uploaded ? "Ganti" : "Unggah"}
      </button>
      <input ref={inputRef} type="file" accept="image/*,.pdf" className="hidden" onChange={handleFile} />
    </div>
  );
}