import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-border px-[var(--gutter)] py-4 font-mono text-xs text-muted">
      <div className="mx-auto flex max-w-[var(--max-w)] items-center justify-between gap-4">
        <span>main* &nbsp; UTF-8 &nbsp; TypeScript</span>
        <span>
          {site.degree} &nbsp; {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}