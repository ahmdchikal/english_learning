import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { siteConfig } from "@/lib/constants/site";

const FOOTER_LINKS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Produk",
    links: [
      { href: "/levels", label: "Level Belajar" },
      { href: "/placement-test", label: "Tes Penempatan" },
      { href: "/register", label: "Mulai Belajar" },
    ],
  },
  {
    title: "Perusahaan",
    links: [
      { href: "/about", label: "Tentang Kami" },
      { href: "/privacy", label: "Kebijakan Privasi" },
      { href: "/terms", label: "Syarat & Ketentuan" },
    ],
  },
];

export function MarketingFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="col-span-1 sm:col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <span className="flex size-8 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <GraduationCap className="size-5" />
              </span>
              {siteConfig.name}
            </Link>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">{siteConfig.description}</p>
          </div>

          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold">{section.title}</h3>
              <ul className="mt-3 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. Seluruh hak cipta dilindungi.
          </p>
          <p>Dibuat dengan &hearts; untuk pelajar Bahasa Inggris di Indonesia.</p>
        </div>
      </div>
    </footer>
  );
}
