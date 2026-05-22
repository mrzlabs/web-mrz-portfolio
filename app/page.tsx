import GlobalBot from "./ui/GlobalBot";
import FrontendLab from "./ui/FrontendLab";

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Apps Script",
  "AppSheet",
  "SQL",
  "Shell",
  "Looker Studio",
  "Google Cloud",
  "Workspace",
  "Meta API",
  "LLM",
];

const solutions = [
  {
    id: "crm",
    title: "CRM operativo",
    metric: "Lead a seguimiento",
    desc: "Captura, clasificación, trazabilidad y gestión comercial conectada a Sheets, APIs o bases SQL.",
  },
  {
    id: "ads",
    title: "Growth stack",
    metric: "Campaña a evidencia",
    desc: "Google Ads, Meta, landing, eventos, formularios, automatización y medición por canal.",
  },
  {
    id: "llm",
    title: "LLM corporativo",
    metric: "Dato a decisión",
    desc: "Asistentes internos, base documental, clasificación automática y flujos de soporte con control.",
  },
  {
    id: "ops",
    title: "Automatización",
    metric: "Proceso a sistema",
    desc: "Apps Script, AppSheet, Autocrat, Workspace y reportes ejecutables para operación diaria.",
  },
];

const projects = [
  {
    name: "Impermeables",
    tag: "Comercio B2B",
    href: "https://mrzlabs.github.io/web-impermeables-cliente/",
    objective: "Presencia digital, captación de leads y propuesta técnica comercial.",
  },
  {
    name: "Seguridad Social SAS",
    tag: "Servicios",
    href: "https://asesoriasas.com",
    objective: "Cotización, rutas de servicio y mejora de conversión para independientes.",
  },
  {
    name: "Top Ink",
    tag: "Marca creativa",
    href: "https://amtz-dev.github.io/topink-landing_1/",
    objective: "Landing visual, catálogo base y posicionamiento de servicio.",
  },
];

const metrics = [
  ["Leads", "128", "+34%"],
  ["Conversión", "18.7%", "+6.2"],
  ["SLA", "01:42 h", "-28%"],
  ["Errores", "0.8%", "-1.4"],
];

export default function Home() {
  return (
    <main className="site-shell">
      <GlobalBot />

      <section className="hero" id="inicio">
        <div className="neural-bg" aria-hidden="true">
          {Array.from({ length: 16 }, (_, i) => (
            <span key={i} />
          ))}
        </div>
        <nav className="nav">
          <a href="#inicio" className="brand">
            mrz<span>labs</span>
          </a>
          <div>
            <a href="#soluciones">Soluciones</a>
            <a href="#stack">Stack</a>
            <a href="#proyectos">Proyectos</a>
            <a href="#contacto">Contacto</a>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Startup digital para soluciones corporativas</p>
            <h1>Infraestructura digital que capta, automatiza y mide crecimiento.</h1>
            <p>
              Diseño arquitectura progresiva para negocios que necesitan pasar de una página estática a un sistema medible:
              campañas, CRM, automatización, dashboards, integraciones y asistentes con IA.
            </p>
            <div className="hero-actions">
              <a href="#proyectos">Ver demos</a>
              <a href="#contacto">Hablemos</a>
            </div>
          </div>
          <div className="ops-panel" aria-label="Dashboard demostrativo">
            <div className="panel-head">
              <span>Growth OS</span>
              <b>Live</b>
            </div>
            <div className="metric-grid">
              {metrics.map(([label, value, delta]) => (
                <article key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                  <em>{delta}</em>
                </article>
              ))}
            </div>
            <div className="flow-card">
              <span>Landing</span>
              <i />
              <span>CRM</span>
              <i />
              <span>Dashboard</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="soluciones">
        <div className="section-head">
          <p className="eyebrow">Casos de uso</p>
          <h2>Modelos aplicados a operación real</h2>
        </div>
        <div className="solution-grid">
          {solutions.map((item) => (
            <article className="solution-card" key={item.id}>
              <span>{item.id}</span>
              <h3>{item.title}</h3>
              <b>{item.metric}</b>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section stack-sec" id="stack">
        <div className="section-head">
          <p className="eyebrow">Lenguajes y plataformas</p>
          <h2>Frontend, automatización, datos e IA en una misma arquitectura</h2>
        </div>
        <div className="stack-grid">
          {stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <FrontendLab />
      </section>

      <section className="section" id="proyectos">
        <div className="section-head">
          <p className="eyebrow">Galería de proyectos</p>
          <h2>Demos publicadas con objetivo comercial</h2>
        </div>
        <div className="project-rail">
          {projects.map((project) => (
            <a className="project-banner" href={project.href} target="_blank" rel="noreferrer" key={project.name}>
              <span>{project.tag}</span>
              <h3>{project.name}</h3>
              <p>{project.objective}</p>
              <b>Ver demo</b>
            </a>
          ))}
        </div>
      </section>

      <section className="signature" id="contacto">
        <div className="sig-neural" aria-hidden="true">
          {Array.from({ length: 22 }, (_, i) => (
            <span key={i} />
          ))}
        </div>
        <div className="sig-content">
          <h2>
            mrz<span>labs</span>
          </h2>
          <button type="button">Built by mrzlabs</button>
          <p>Captamos, automatizamos, escalamos. Sin fricción, con evidencia.</p>
        </div>
        <div className="contact-box">
          <div>
            <strong>Arquitectura progresiva</strong>
            <p>Infraestructura digital escalable para empresas que quieren crecer con propósito. Seguridad real, sin amarres.</p>
          </div>
          <form>
            <input aria-label="Nombre" placeholder="Nombre" />
            <input aria-label="Número" placeholder="Número" />
            <input aria-label="Correo" placeholder="Correo" />
            <textarea aria-label="Comentario" placeholder="Comentario" />
            <button type="submit">Enviar propuesta</button>
          </form>
        </div>
      </section>
    </main>
  );
}
