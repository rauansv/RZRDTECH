import { Mail } from "lucide-react";
import { Github, Instagram, Linkedin } from "@/components/ui/brand-icons";
import { nav, site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/ui/wordmark";

const socialLinks = [
  { label: "Instagram", href: site.socials.instagram, Icon: Instagram },
  { label: "LinkedIn", href: site.socials.linkedin, Icon: Linkedin },
  { label: "GitHub", href: site.socials.github, Icon: Github },
  { label: "E-mail", href: `mailto:${site.email}`, Icon: Mail },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-8 border-t border-line/60 pb-10 pt-16">
      <Container>
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Wordmark className="text-lg" />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {site.description}
            </p>
          </div>

          <nav className="flex flex-col gap-3" aria-label="Rodapé">
            <span className="text-eyebrow">Navegação</span>
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="text-eyebrow">Conectar</span>
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {site.email}
            </a>
            <div className="mt-2 flex gap-2.5">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="glass glass-sheen inline-flex size-10 items-center justify-center rounded-full text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:text-ink"
                >
                  <Icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line/50 pt-8 text-sm text-faint sm:flex-row">
          <p>
            © {year} {site.name}. Todos os direitos reservados.
          </p>
          <p className="tracking-tight">{site.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
