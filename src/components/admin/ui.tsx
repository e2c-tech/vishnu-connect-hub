import type { ReactNode } from "react";
import { X } from "lucide-react";

export function Modal({ open, onClose, title, children, wide }: { open: boolean; onClose: () => void; title: string; children: ReactNode; wide?: boolean }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
         onClick={onClose}>
      <div className={`relative my-8 w-full ${wide ? "max-w-3xl" : "max-w-xl"} rounded-2xl border border-border bg-background p-6 shadow-2xl`}
           onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 rounded-md p-1.5 hover:bg-muted">
          <X className="h-4 w-4" />
        </button>
        <h2 className="font-display text-xl uppercase">{title}</h2>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-muted-foreground">{hint}</span>}
    </label>
  );
}

export const inputCls = "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30";
export const textareaCls = inputCls + " resize-y min-h-[100px]";

export function PrimaryBtn(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={"rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background hover:bg-primary hover:text-primary-foreground disabled:opacity-60 " + (props.className ?? "")} />;
}
export function GhostBtn(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={"rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-muted " + (props.className ?? "")} />;
}
export function DangerBtn(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={"rounded-lg border border-destructive/40 px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 " + (props.className ?? "")} />;
}

export function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <Field label={label}>
      <div className="flex items-center gap-3">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="h-10 w-14 cursor-pointer rounded border border-input" />
        <input className={inputCls} value={value} onChange={(e) => onChange(e.target.value)} placeholder="#000000" />
      </div>
    </Field>
  );
}

export function AdminSaveBar({
  err,
  saved,
  busy,
  onSave,
  label = "Save",
}: {
  err: string | null;
  saved: boolean;
  busy: boolean;
  onSave: () => void;
  label?: string;
}) {
  return (
    <div className="flex items-center justify-end gap-3">
      {err && <p className="mr-auto text-sm text-destructive">{err}</p>}
      {saved && <span className="flex items-center gap-1 text-sm text-primary">Saved</span>}
      <PrimaryBtn onClick={onSave} disabled={busy}>{busy ? "Saving…" : label}</PrimaryBtn>
    </div>
  );
}
