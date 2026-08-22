import { Link } from "@tanstack/react-router";

export type Crumb = { label: string; to?: string; params?: Record<string, string> };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.to ? (
              <Link
                to={item.to}
                params={item.params as never}
                className="link-underline transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
            {i < items.length - 1 ? <span className="text-gold">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
