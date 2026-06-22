import { COMPANY } from "@/lib/site-data";

export function WhatsAppButton() {
  const href = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
    "Hi Sri Vishnu Consol, I'd like to know more about your services."
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-4 ring-[#25D366]/20 transition-transform hover:scale-110"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden>
        <path d="M19.11 17.27c-.27-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.61.14-.18.27-.7.89-.86 1.07-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.18-1.34-.81-.72-1.35-1.61-1.51-1.88-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47l-.52-.01a1 1 0 0 0-.73.34c-.25.27-.95.93-.95 2.26 0 1.33.97 2.62 1.11 2.8.14.18 1.91 2.92 4.63 4.09.65.28 1.15.45 1.55.58.65.21 1.24.18 1.71.11.52-.08 1.62-.66 1.85-1.3.23-.64.23-1.19.16-1.3-.07-.11-.25-.18-.52-.32zM16.02 4C9.39 4 4 9.39 4 16.02c0 2.12.55 4.19 1.6 6.02L4 28l6.13-1.6a11.97 11.97 0 0 0 5.89 1.5h.01c6.62 0 12.02-5.39 12.02-12.02C28.05 9.39 22.65 4 16.02 4z"/>
      </svg>
    </a>
  );
}
