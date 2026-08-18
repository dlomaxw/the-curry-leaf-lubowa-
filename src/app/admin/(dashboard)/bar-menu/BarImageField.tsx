"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { uploadBarImage } from "./actions";

export default function BarImageField({
  initialValue,
}: {
  initialValue: string;
}) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [uploading, startUpload] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  const input =
    "w-full rounded-xl border border-sand bg-ivory px-4 py-3 text-sm outline-none focus:border-saffron";
  const label =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-cocoa/60";

  function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    startUpload(async () => {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadBarImage({}, formData);
      if (result.error) {
        setError(result.error);
      } else if (result.url) {
        setValue(result.url);
      }
      if (fileRef.current) fileRef.current.value = "";
    });
  }

  return (
    <div className="sm:col-span-2">
      <label htmlFor="image" className={label}>
        Product Photo — paste a link or upload a file
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1 space-y-2">
          <input
            id="image"
            name="image"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="https://... or /images/bar/example.jpg"
            className={input}
          />
          <div className="flex items-center gap-3">
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={(e) => handleFile(e.target.files?.[0])}
              disabled={uploading}
              className="text-xs text-cocoa/60 file:mr-3 file:rounded-full file:border-0 file:bg-leaf file:px-4 file:py-2 file:text-xs file:font-semibold file:text-cream hover:file:bg-leaf-dark disabled:opacity-50"
            />
            {uploading && (
              <span className="text-xs text-cocoa/50">Uploading…</span>
            )}
            {value && !uploading && (
              <button
                type="button"
                onClick={() => setValue("")}
                className="text-xs font-semibold text-chilli underline underline-offset-2"
              >
                Remove
              </button>
            )}
          </div>
          {error && <p className="text-xs text-chilli">{error}</p>}
        </div>

        {value && (
          <div className="relative h-24 w-24 flex-none overflow-hidden rounded-xl border border-sand bg-cream">
            <Image
              src={value}
              alt="Product preview"
              fill
              sizes="96px"
              className="object-cover"
              onError={() => setError("Couldn't load that image — check the link.")}
              // Admins can paste a link to any external image, not just our
              // own bucket — skip the optimizer's domain allow-list for those.
              unoptimized={!value.startsWith("/")}
            />
          </div>
        )}
      </div>
    </div>
  );
}
