import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Link as LinkIcon, X, Loader2 } from "lucide-react";

const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

export async function uploadToMedia(file: File, prefix = "uploads"): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
  const path = `${prefix}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw error;
  const { data, error: signErr } = await supabase.storage.from("media").createSignedUrl(path, TEN_YEARS);
  if (signErr || !data?.signedUrl) throw signErr ?? new Error("Could not create signed URL");
  return data.signedUrl;
}

export function ImageUpload({
  value,
  onChange,
  prefix = "uploads",
  label,
  hint,
}: {
  value: string;
  onChange: (url: string) => void;
  prefix?: string;
  label?: string;
  hint?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [showUrl, setShowUrl] = useState(false);

  const pick = () => ref.current?.click();
  const handleFile = async (f: File) => {
    setErr(null); setBusy(true);
    try {
      const url = await uploadToMedia(f, prefix);
      onChange(url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      {label && <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</div>}
      <div className="rounded-lg border border-dashed border-border bg-muted/20 p-3">
        {value ? (
          <div className="flex items-start gap-3">
            <img src={value} alt="" className="h-24 w-24 rounded-md object-cover" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs text-muted-foreground">{value}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                <button type="button" onClick={pick} className="rounded-md border border-border bg-background px-2.5 py-1 text-xs hover:bg-muted">
                  <Upload className="mr-1 inline h-3 w-3" />Replace
                </button>
                <button type="button" onClick={() => onChange("")} className="rounded-md border border-destructive/40 px-2.5 py-1 text-xs text-destructive hover:bg-destructive/10">
                  <X className="mr-1 inline h-3 w-3" />Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 py-4 text-center">
            <button
              type="button"
              onClick={pick}
              disabled={busy}
              className="rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background hover:bg-primary hover:text-primary-foreground disabled:opacity-60"
            >
              {busy ? <Loader2 className="mr-1 inline h-3 w-3 animate-spin" /> : <Upload className="mr-1 inline h-3 w-3" />}
              {busy ? "Uploading…" : "Browse from your computer"}
            </button>
            <button type="button" onClick={() => setShowUrl((s) => !s)} className="text-xs text-muted-foreground underline-offset-4 hover:underline">
              <LinkIcon className="mr-1 inline h-3 w-3" />or paste an image URL
            </button>
          </div>
        )}
        {showUrl && !value && (
          <input
            className="mt-2 w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs"
            placeholder="https://…"
            onChange={(e) => onChange(e.target.value)}
          />
        )}
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.currentTarget.value = ""; }}
        />
      </div>
      {hint && <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>}
      {err && <p className="mt-1 text-xs text-destructive">{err}</p>}
    </div>
  );
}
