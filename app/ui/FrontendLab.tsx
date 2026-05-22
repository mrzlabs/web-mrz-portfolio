"use client";

import { useState } from "react";

const labs = [
  {
    id: "react",
    label: "React",
    title: "Dashboard de captación",
    code: `const kpis = leads.map((lead) => ({
  canal: lead.utmSource,
  estado: lead.stage,
  valor: lead.score,
}));

return <MetricGrid data={kpis} />;`,
    result: ["Google Ads", "42 leads", "18.7% conv"],
    href: "https://mrzlabs.github.io/web-impermeables-cliente/",
  },
  {
    id: "next",
    label: "Next.js",
    title: "Landing con SEO y rutas",
    code: `export const metadata = {
  title: "Seguridad Social SAS",
  description: "Cotización y asesoría nacional",
};

export default function Page() {
  return <LeadFlow />;
}`,
    result: ["SEO base", "SSR-ready", "Formulario"],
    href: "https://asesoriasas.com",
  },
  {
    id: "astro",
    label: "Astro",
    title: "Sitio estático veloz",
    code: `---
const items = await getCatalog();
---

<Gallery products={items} />
<BuiltByMrzlabs />`,
    result: ["Carga rápida", "GitHub Pages", "Catálogo"],
    href: "https://amtz-dev.github.io/topink-landing_1/",
  },
  {
    id: "angular",
    label: "Angular",
    title: "Panel administrativo",
    code: `@Component({
  selector: "crm-board",
  template: "<app-kanban [rows]='rows' />",
})
export class CrmBoard {
  rows = signal([]);
}`,
    result: ["Kanban", "Roles", "Validación"],
    href: "#contacto",
  },
];

export default function FrontendLab() {
  const [active, setActive] = useState(labs[0]);

  return (
    <div className="frontend-lab">
      <div className="lab-tabs" role="tablist" aria-label="Frontend aplicado">
        {labs.map((lab) => (
          <button
            key={lab.id}
            type="button"
            role="tab"
            aria-selected={active.id === lab.id}
            className={active.id === lab.id ? "act" : ""}
            onClick={() => setActive(lab)}
          >
            {lab.label}
          </button>
        ))}
      </div>

      <div className="lab-stage">
        <article className="code-card">
          <span>{active.label}</span>
          <h3>{active.title}</h3>
          <pre>
            <code>{active.code}</code>
          </pre>
        </article>

        <article className="result-card">
          <div className="result-head">
            <span>Resultado aplicado</span>
            <a href={active.href}>Ver caso</a>
          </div>
          <div className="mini-browser">
            <div className="mini-bar">
              <i />
              <i />
              <i />
            </div>
            <div className="mini-hero">
              <strong>{active.title}</strong>
              <p>Flujo comercial medible conectado a operación.</p>
            </div>
            <div className="mini-kpis">
              {active.result.map((item) => (
                <b key={item}>{item}</b>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
