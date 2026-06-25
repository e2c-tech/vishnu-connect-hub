import { useEffect, useRef } from "react";
import { Bold, Italic, Underline, List, ListOrdered, Link2, Heading2, Quote, Undo2, Redo2, RemoveFormatting } from "lucide-react";

const FONTS = ["Inter", "Arial", "Georgia", "Times New Roman", "Courier New", "Verdana", "Tahoma", "Trebuchet MS"];
const SIZES = [
  { v: "1", l: "10" }, { v: "2", l: "13" }, { v: "3", l: "16" },
  { v: "4", l: "18" }, { v: "5", l: "24" }, { v: "6", l: "32" }, { v: "7", l: "48" },
];

function exec(cmd: string, val?: string) {
  document.execCommand(cmd, false, val);
}

export function RichTextEditor({
  value,
  onChange,
  minHeight = 200,
  placeholder = "Write here…",
}: {
  value: string;
  onChange: (html: string) => void;
  minHeight?: number;
  placeholder?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== (value || "")) {
      ref.current.innerHTML = value || "";
    }
  }, [value]);

  const fire = () => { if (ref.current) onChange(ref.current.innerHTML); };
  const run = (cmd: string, v?: string) => { ref.current?.focus(); exec(cmd, v); fire(); };

  const link = () => {
    const url = prompt("Enter URL (https://…)");
    if (url) run("createLink", url);
  };

  const btn = "rounded p-1.5 hover:bg-muted text-foreground/80";

  return (
    <div className="overflow-hidden rounded-lg border border-input bg-background">
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-muted/40 px-2 py-1.5 text-sm">
        <select
          aria-label="Font family"
          className="rounded border border-input bg-background px-1.5 py-1 text-xs"
          onChange={(e) => { run("fontName", e.target.value); e.currentTarget.selectedIndex = 0; }}
          defaultValue=""
        >
          <option value="" disabled>Font</option>
          {FONTS.map((f) => <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>)}
        </select>
        <select
          aria-label="Font size"
          className="rounded border border-input bg-background px-1.5 py-1 text-xs"
          onChange={(e) => { run("fontSize", e.target.value); e.currentTarget.selectedIndex = 0; }}
          defaultValue=""
        >
          <option value="" disabled>Size</option>
          {SIZES.map((s) => <option key={s.v} value={s.v}>{s.l}px</option>)}
        </select>
        <label className="flex items-center gap-1 rounded border border-input bg-background px-1.5 py-1 text-xs">
          <span>Color</span>
          <input type="color" onChange={(e) => run("foreColor", e.target.value)} className="h-4 w-5 cursor-pointer border-0 bg-transparent p-0" />
        </label>
        <label className="flex items-center gap-1 rounded border border-input bg-background px-1.5 py-1 text-xs">
          <span>BG</span>
          <input type="color" onChange={(e) => run("hiliteColor", e.target.value)} className="h-4 w-5 cursor-pointer border-0 bg-transparent p-0" />
        </label>
        <span className="mx-1 h-5 w-px bg-border" />
        <button type="button" className={btn} onClick={() => run("bold")} title="Bold"><Bold className="h-4 w-4" /></button>
        <button type="button" className={btn} onClick={() => run("italic")} title="Italic"><Italic className="h-4 w-4" /></button>
        <button type="button" className={btn} onClick={() => run("underline")} title="Underline"><Underline className="h-4 w-4" /></button>
        <span className="mx-1 h-5 w-px bg-border" />
        <button type="button" className={btn} onClick={() => run("formatBlock", "<h2>")} title="Heading"><Heading2 className="h-4 w-4" /></button>
        <button type="button" className={btn} onClick={() => run("formatBlock", "<blockquote>")} title="Quote"><Quote className="h-4 w-4" /></button>
        <button type="button" className={btn} onClick={() => run("insertUnorderedList")} title="Bulleted list"><List className="h-4 w-4" /></button>
        <button type="button" className={btn} onClick={() => run("insertOrderedList")} title="Numbered list"><ListOrdered className="h-4 w-4" /></button>
        <button type="button" className={btn} onClick={link} title="Insert link"><Link2 className="h-4 w-4" /></button>
        <span className="mx-1 h-5 w-px bg-border" />
        <button type="button" className={btn} onClick={() => run("removeFormat")} title="Clear formatting"><RemoveFormatting className="h-4 w-4" /></button>
        <button type="button" className={btn} onClick={() => run("undo")} title="Undo"><Undo2 className="h-4 w-4" /></button>
        <button type="button" className={btn} onClick={() => run("redo")} title="Redo"><Redo2 className="h-4 w-4" /></button>
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={fire}
        onBlur={fire}
        data-placeholder={placeholder}
        className="prose prose-sm max-w-none px-3 py-2 text-sm outline-none focus:bg-background [&_*]:!leading-relaxed empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)]"
        style={{ minHeight }}
      />
    </div>
  );
}

export function RichHtml({ html, className }: { html: string; className?: string }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: html || "" }} />;
}
