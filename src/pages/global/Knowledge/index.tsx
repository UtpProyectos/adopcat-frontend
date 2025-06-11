import React, { useState, ReactNode } from "react";
import Footer from "../../../components/Footer";

const tabs = [
  { label: "Artículos y Consejos", key: "articulos" },
  { label: "Recursos y Videos", key: "recursos" },
  { label: "Glosario Felino", key: "glosario" },
  { label: "Mitos y Realidades", key: "mitos" },
];

type TabKey = "articulos" | "recursos" | "glosario" | "mitos";
type PlanType = "free" | "premium";

const userPlan = "free" as PlanType;

const tipsRefugioFree = [
  { title: "Esteriliza a todos los gatos", desc: "Evita la sobrepoblación y mejora la salud general del refugio." },
  { title: "Mantén áreas separadas", desc: "Distingue zonas para gatos sanos, enfermos y en cuarentena." },
  { title: "Limpieza diaria", desc: "Desinfecta bandejas, comederos y áreas comunes todos los días." },
  { title: "Ofrece escondites", desc: "Cajas y cuevas ayudan a reducir el estrés de los gatos." },
  { title: "Enriquecimiento ambiental", desc: "Juguetes, rascadores y estantes mejoran el bienestar felino." },
  { title: "Alimentación balanceada", desc: "Consulta con un veterinario para elegir el mejor alimento." },
  { title: "Agua fresca siempre disponible", desc: "Cambia el agua varias veces al día." },
  { title: "Control veterinario regular", desc: "Chequeos y vacunas al día para todos los gatos." },
  { title: "Promueve la adopción responsable", desc: "Entrevista y orienta a los adoptantes." },
  { title: "Capacita a voluntarios", desc: "Brinda formación sobre manejo y bienestar animal." },
];

const tipsRefugioPremium = [
  ...tipsRefugioFree,
  { title: "Registra cada gato", desc: "Lleva fichas con datos, salud y evolución de cada felino." },
  { title: "Evita el hacinamiento", desc: "Respeta la capacidad máxima del refugio." },
  { title: "Ofrece atención personalizada", desc: "Dedica tiempo a socializar y observar a cada gato." },
  { title: "Fomenta la adopción de adultos", desc: "Promociona gatos mayores, no solo cachorros." },
  { title: "Crea campañas de adopción", desc: "Utiliza redes sociales y eventos para difundir." },
  { title: "Colabora con veterinarios", desc: "Alianzas para atención y esterilización a bajo costo." },
  { title: "Gestiona donaciones", desc: "Facilita canales para recibir ayuda económica o en especie." },
  { title: "Educa a la comunidad", desc: "Charlas y talleres sobre tenencia responsable." },
  { title: "Asegura ventanas y balcones", desc: "Evita caídas y accidentes en el refugio." },
  { title: "Monitorea el comportamiento", desc: "Detecta signos de estrés o enfermedad a tiempo." },
  { title: "Ofrece adopciones virtuales", desc: "Permite apadrinar gatos a distancia." },
  { title: "Promueve la esterilización externa", desc: "Informa y apoya a la comunidad para esterilizar gatos callejeros." },
  { title: "Utiliza feromonas sintéticas", desc: "Ayudan a reducir el estrés en ambientes compartidos." },
  { title: "Prepara kits de adopción", desc: "Incluye alimento, juguetes y consejos para nuevos dueños." },
  { title: "Realiza seguimientos post-adopción", desc: "Asegura el bienestar del gato en su nuevo hogar." },
  { title: "Ofrece zonas de juego seguras", desc: "Espacios controlados para ejercicio y socialización." },
  { title: "Mantén contacto con adoptantes", desc: "Crea una red de apoyo y seguimiento." },
  { title: "Gestiona emergencias", desc: "Ten protocolos claros para evacuación y atención médica urgente." },
  { title: "Promueve la adopción inclusiva", desc: "Visibiliza gatos con necesidades especiales." },
  { title: "Actualiza tus redes sociales", desc: "Comparte historias, logros y necesidades del refugio." },
  { title: "Agradece a donantes y voluntarios", desc: "Reconoce públicamente su apoyo y compromiso." },
];

const TipCard = ({ tip, index }: { tip: { title: string; desc: string }, index: number }) => (
  <div
    className="group bg-white border-2 border-primary/20 hover:border-primary/60 rounded-2xl shadow-lg p-5 flex flex-col items-center text-center transition-all duration-300 cursor-pointer hover:scale-105 hover:bg-primary/5 relative overflow-hidden animate-fade-in"
    tabIndex={0}
    aria-label={tip.title}
  >
    <span className="absolute top-2 right-4 text-primary/30 text-3xl font-extrabold group-hover:text-primary/70 transition-all select-none">#{index + 1}</span>
    <span className="text-primary font-extrabold text-xl md:text-2xl mb-2 group-hover:text-primary/90 transition-colors drop-shadow animate-bounce">{tip.title}</span>
    <span className="text-gray-700 text-lg md:text-xl font-medium group-hover:text-primary/80 transition-colors">{tip.desc}</span>
  </div>
);

const GlossaryCard = ({ term, definition, premiumContent }: { term: string; definition: string; premiumContent?: string }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 animate-fade-in">
      <h3 className="text-xl font-bold text-primary mb-2 animate-pulse">{term}</h3>
      <p className="text-gray-700 text-lg">{definition}</p>
      {premiumContent && <p className="text-primary mt-2">{premiumContent}</p>}
    </div>
  );
};

const content: Record<TabKey, ReactNode> = {
  articulos: (
    <div className="flex flex-col gap-10">
      <div className="mb-4">
        <div className="flex gap-2 items-center mb-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${userPlan === "premium" ? "bg-yellow-400 text-white" : "bg-gray-200 text-primary"}`}>
            {userPlan === 'premium' ? "Plan Premium" : "Plan Free"}
          </span>
          <span className="text-primary font-bold text-2xl animate-fade-in">Artículos y Consejos</span>
        </div>
        {userPlan === "premium" ? (
          <>
            <li className="text-lg">Guías avanzadas de enriquecimiento ambiental y socialización.</li>
            <li className="text-lg">Consejos de expertos y veterinarios certificados.</li>
            <li className="text-lg">Checklists descargables y PDFs exclusivos.</li>
            <li className="text-lg">Solución de problemas de comportamiento felino.</li>
          </>
        ) : (
          <div className="bg-orange-100 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in">
            <p className="text-gray-700 text-lg md:text-xl font-semibold">
              Descubre los fundamentos del cuidado felino: desde la alimentación y la salud, hasta la higiene y el enriquecimiento de su entorno. ¡Prepárate para darle la mejor vida a tu gato!
            </p>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center animate-pulse">🐾 Tips para Refugios Felinos 🐾</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {(userPlan === "premium" ? tipsRefugioPremium : tipsRefugioFree).map((tip, i) => (
            <TipCard tip={tip} index={i} key={i} />
          ))}
        </div>
        {userPlan === "free" && (
          <div className="mt-8 text-center">
            <span className="text-primary font-semibold text-lg">¿Quieres ver más tips y consejos exclusivos?</span>
            <div>
              <button className="mt-2 px-6 py-3 bg-yellow-400 text-white rounded-full font-bold shadow hover:bg-yellow-500 transition text-lg animate-bounce">¡Hazte Premium!</button>
            </div>
          </div>
        )}
      </div>
    </div>
  ),
  recursos: (
    <div className="flex flex-col gap-10">
      <div>
        <div className="flex gap-2 items-center mb-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${userPlan === "premium" ? "bg-yellow-400 text-white" : "bg-gray-200 text-primary"}`}>
            {userPlan === "premium" ? "Plan Premium" : "Plan Free"}
          </span>
          <span className="text-primary font-bold text-2xl animate-fade-in">Videos e Infografías</span>
        </div>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 text-lg md:text-xl">
          {userPlan === "premium" ? (
            <>
              <li>Acceso a toda la videoteca y galería de infografías.</li>
              <li>Videos exclusivos de expertos, talleres grabados y webinars.</li>
              <li>Infografías descargables y material premium.</li>
            </>
          ) : (
            <>
              <li>Videos introductorios (cómo preparar tu casa, primeros cuidados).</li>
              <li>Infografías básicas sobre salud y alimentación.</li>
            </>
          )}
        </ul>
        {userPlan === "free" && (
          <div className="mt-6 text-center">
            <span className="text-primary font-semibold text-lg">¿Quieres ver más videos y recursos visuales?</span>
            <div>
              <button className="mt-2 px-6 py-3 bg-yellow-400 text-white rounded-full font-bold shadow hover:bg-yellow-500 transition text-lg animate-bounce">¡Hazte Premium!</button>
            </div>
          </div>
        )}
      </div>
      <img src="https://images.unsplash.com/photo-1518715308788-3005759c41c8?auto=format&fit=crop&w=500&q=80" alt="Infografía de gatos" className="rounded-2xl shadow-lg w-full object-cover h-64 animate-fade-in" />
      <div>
        <div className="flex gap-2 items-center mb-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${userPlan === "premium" ? "bg-yellow-400 text-white" : "bg-gray-200 text-primary"}`}>
            {userPlan === "premium" ? "Plan Premium" : "Plan Free"}
          </span>
          <span className="text-primary font-bold text-2xl animate-fade-in">Recursos</span>
        </div>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 text-lg md:text-xl">
          {userPlan === "premium" ? (
            <>
              <li><a href="#" className="text-blue-600 underline">Guía PDF avanzada para nuevos adoptantes</a></li>
              <li><a href="https://www.anacat.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Asociación Nacional de Amigos de los Gatos</a></li>
              <li><a href="https://www.hogarperu.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Hogar Perú - Adopción y rescate</a></li>
              <li><a href="#" className="text-blue-600 underline">Ebooks y plantillas editables</a></li>
              <li><a href="#" className="text-blue-600 underline">Acceso a talleres y eventos exclusivos</a></li>
            </>
          ) : (
            <>
              <li><a href="#" className="text-blue-600 underline">Guía PDF para nuevos adoptantes</a></li>
              <li><a href="https://www.anacat.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Asociación Nacional de Amigos de los Gatos</a></li>
              <li><a href="https://www.hogarperu.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Hogar Perú - Adopción y rescate</a></li>
            </>
          )}
        </ul>
        {userPlan === "free" && (
          <div className="mt-6 text-center">
            <span className="text-primary font-semibold text-lg">¿Quieres acceder a recursos exclusivos?</span>
            <div>
              <button className="mt-2 px-6 py-3 bg-yellow-400 text-white rounded-full font-bold shadow hover:bg-yellow-500 transition text-lg animate-bounce">¡Hazte Premium!</button>
            </div>
          </div>
        )}
      </div>
      <img src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=500&q=80" alt="Recursos felinos" className="rounded-2xl shadow-lg w-full object-cover h-64 animate-fade-in" />
    </div>
  ),
  glosario: (
    <div className="flex flex-col gap-10">
      <div className="mb-4">
        <div className="flex gap-2 items-center mb-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${userPlan === "premium" ? "bg-yellow-400 text-white" : "bg-gray-200 text-primary"}`}>
            {userPlan === "premium" ? "Plan Premium" : "Plan Free"}
          </span>
          <span className="text-primary font-bold text-2xl animate-fade-in">Glosario Felino</span>
        </div>
        {userPlan === "premium" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <GlossaryCard term="Esterilización" definition="Procedimiento para evitar la reproducción." premiumContent="Incluye video explicativo." />
            <GlossaryCard term="Desparasitación" definition="Eliminación de parásitos internos y externos." premiumContent="Guía descargable." />
            <GlossaryCard term="Socialización" definition="Proceso de adaptación del gato a personas y otros animales." premiumContent="Consejos avanzados." />
            <GlossaryCard term="Enriquecimiento ambiental" definition="Estrategias para mejorar el bienestar del gato en casa." premiumContent="Ejemplos interactivos." />
            <GlossaryCard term="Vacunación" definition="Inoculación para prevenir enfermedades." premiumContent="Calendario de vacunación premium." />
            <GlossaryCard term="Alergia alimentaria" definition="Reacción adversa a ciertos alimentos." premiumContent="Guía de alimentos hipoalergénicos." />
            <GlossaryCard term="Leucemia felina" definition="Enfermedad viral que afecta el sistema inmunológico." premiumContent="Información detallada y tratamientos." />
            <GlossaryCard term="Peritonitis infecciosa felina (PIF)" definition="Enfermedad viral grave." premiumContent="Investigaciones y avances en el tratamiento." />
            <GlossaryCard term="Inmunodeficiencia felina (FIV)" definition="Virus que afecta el sistema inmunológico." premiumContent="Cuidados y manejo del FIV." />
            <GlossaryCard term="Dermatitis" definition="Inflamación de la piel." premiumContent="Guía de tratamientos y cuidados." />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <GlossaryCard term="Esterilización" definition="Procedimiento para evitar la reproducción." />
            <GlossaryCard term="Desparasitación" definition="Eliminación de parásitos internos y externos." />
            <GlossaryCard term="Socialización" definition="Proceso de adaptación del gato a personas y otros animales." />
            <GlossaryCard term="Enriquecimiento ambiental" definition="Estrategias para mejorar el bienestar del gato en casa." />
            <GlossaryCard term="Vacunación" definition="Inoculación para prevenir enfermedades." />
            <GlossaryCard term="Alergia alimentaria" definition="Reacción adversa a ciertos alimentos." />
            <GlossaryCard term="Leucemia felina" definition="Enfermedad viral que afecta el sistema inmunológico." />
            <GlossaryCard term="Peritonitis infecciosa felina (PIF)" definition="Enfermedad viral grave." />
            <GlossaryCard term="Inmunodeficiencia felina (FIV)" definition="Virus que afecta el sistema inmunológico." />
            <GlossaryCard term="Dermatitis" definition="Inflamación de la piel." />
          </div>
        )}
        {userPlan === "free" && (
          <div className="mt-6 text-center">
            <span className="text-primary font-semibold text-lg">¿Quieres ver el glosario extendido?</span>
            <div>
              <button className="mt-2 px-6 py-3 bg-yellow-400 text-white rounded-full font-bold shadow hover:bg-yellow-500 transition text-lg animate-bounce">¡Hazte Premium!</button>
            </div>
          </div>
        )}
      </div>
    </div>
  ),
  mitos: (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <div className="flex gap-2 items-center mb-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${userPlan === "premium" ? "bg-yellow-400 text-white" : "bg-gray-200 text-primary"}`}>
            {userPlan === "premium" ? "Plan Premium" : "Plan Free"}
          </span>
          <span className="text-primary font-bold text-2xl animate-fade-in">Mitos y Realidades</span>
        </div>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 text-lg md:text-xl">
          {userPlan === "premium" ? (
            <>
              <li>"Los gatos no se encariñan con las personas" — <span className="text-green-600 font-bold">FALSO</span>. <span className="text-primary">Incluye testimonio de experto.</span></li>
              <li>"Todos los gatos odian el agua" — <span className="text-green-600 font-bold">FALSO</span>. <span className="text-primary">Video explicativo.</span></li>
              <li>"Un gato siempre cae de pie" — <span className="text-yellow-600 font-bold">MITO</span>, pueden lesionarse. <span className="text-primary">Estudio científico incluido.</span></li>
              <li>"Los gatos negros traen mala suerte" — <span className="text-green-600 font-bold">FALSO</span>. <span className="text-primary">Historia y cultura.</span></li>
            </>
          ) : (
            <>
              <li>"Los gatos no se encariñan con las personas" — <span className="text-green-600 font-bold">FALSO</span>.</li>
              <li>"Todos los gatos odian el agua" — <span className="text-green-600 font-bold">FALSO</span>.</li>
              <li>"Un gato siempre cae de pie" — <span className="text-yellow-600 font-bold">MITO</span>, pueden lesionarse.</li>
              <li>"Los gatos negros traen mala suerte" — <span className="text-green-600 font-bold">FALSO</span>.</li>
            </>
          )}
        </ul>
        {userPlan === "free" && (
          <div className="mt-6 text-center">
            <span className="text-primary font-semibold text-lg">¿Quieres ver análisis y testimonios exclusivos?</span>
            <div>
              <button className="mt-2 px-6 py-3 bg-yellow-400 text-white rounded-full font-bold shadow hover:bg-yellow-500 transition text-lg animate-bounce">¡Hazte Premium!</button>
            </div>
          </div>
        )}
      </div>
      <img src="https://images.unsplash.com/photo-1518715308788-3005759c41c8?auto=format&fit=crop&w=500&q=80" alt="Mitos de gatos" className="rounded-2xl shadow-lg w-full object-cover h-64 animate-fade-in" />
    </div>
  ),
};

const Knowledge = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("articulos");

  return (
    <div className="max-w-5xl mx-auto py-10 px-2 sm:px-4">
      <h1
        className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 text-primary text-center drop-shadow-lg leading-tight break-words animate-fade-in"
        style={{ wordBreak: "break-word" }}
      >
        Módulo de Conocimiento Felino
      </h1>
      <h2
        className="hidden sm:block text-lg sm:text-2xl md:text-3xl font-bold text-primary text-center mb-6 tracking-wide animate-bounce"
        style={{ letterSpacing: "0.08em" }}
      >
        LIMA PERÚ
      </h2>
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as TabKey)}
            className={`px-4 py-2 rounded-full border-2 font-semibold text-lg sm:text-xl md:text-2xl shadow-md transition-all duration-200 ${activeTab === tab.key ? "bg-primary text-white border-primary scale-105 animate-bounce" : "bg-white text-primary border-primary hover:bg-primary/10"}`}
            style={{ maxWidth: "95vw", whiteSpace: "normal", wordBreak: "break-word" }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl shadow-2xl p-8 min-h-[350px] animate-fade-in">
        {content[activeTab]}
      </div> 
    </div>
  );
};

export default Knowledge;

// Agrega estas animaciones en tu CSS global o tailwind.config.js si usas Tailwind:
// .animate-fade-in { animation: fadeIn 0.8s; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none;} }
