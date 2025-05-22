import React, { useState, ReactNode } from "react";

const tabs = [
  { label: "Artículos y Consejos", key: "articulos" },
  { label: "Videos/Infografías", key: "videos" },
  { label: "Glosario Felino", key: "glosario" },
  { label: "Mitos y Realidades", key: "mitos" },
  { label: "Recursos", key: "recursos" },
];

type TabKey = "articulos" | "videos" | "glosario" | "mitos" | "recursos";
type PlanType = "free" | "premium";

// Simulación de plan del usuario (cámbialo a "premium" para probar)
const userPlan: PlanType = "free";

// Tips para tarjetas interactivas (ahora con más información)
const tipsRefugioFree = [
  {
    title: "Esteriliza a todos los gatos",
    desc: "Evita la sobrepoblación y mejora la salud general del refugio.",
    more: "La esterilización previene camadas no deseadas, reduce el riesgo de enfermedades y ayuda a controlar la población felina. Es una práctica responsable y recomendada por veterinarios.",
  },
  {
    title: "Mantén áreas separadas",
    desc: "Distingue zonas para gatos sanos, enfermos y en cuarentena.",
    more: "Separar a los gatos según su estado de salud evita contagios y facilita el manejo. Las áreas de cuarentena son esenciales para nuevos ingresos o animales con síntomas.",
  },
  {
    title: "Limpieza diaria",
    desc: "Desinfecta bandejas, comederos y áreas comunes todos los días.",
    more: "La limpieza constante previene infecciones y mantiene un ambiente saludable. Usa productos seguros para gatos y asegúrate de ventilar bien los espacios después de limpiar.",
  },
  {
    title: "Ofrece escondites",
    desc: "Cajas y cuevas ayudan a reducir el estrés de los gatos.",
    more: "Los gatos necesitan lugares donde sentirse seguros. Proporcionar escondites disminuye el estrés, mejora su comportamiento y les permite adaptarse mejor a nuevos entornos.",
  },
  {
    title: "Enriquecimiento ambiental",
    desc: "Juguetes, rascadores y estantes mejoran el bienestar felino.",
    more: "El enriquecimiento ambiental estimula física y mentalmente a los gatos. Cambia los juguetes regularmente y crea rutas verticales para que exploren y se ejerciten.",
  },
  {
    title: "Alimentación balanceada",
    desc: "Consulta con un veterinario para elegir el mejor alimento.",
    more: "Una dieta adecuada es clave para la salud. Elige alimentos de calidad, ajusta las porciones según la edad y consulta al veterinario ante cualquier duda nutricional.",
  },
  {
    title: "Agua fresca siempre disponible",
    desc: "Cambia el agua varias veces al día.",
    more: "El agua limpia y fresca previene enfermedades urinarias y renales. Usa bebederos automáticos o fuentes para incentivar a los gatos a beber más agua.",
  },
  {
    title: "Control veterinario regular",
    desc: "Chequeos y vacunas al día para todos los gatos.",
    more: "Las visitas periódicas al veterinario permiten detectar problemas de salud a tiempo. Mantén un calendario de vacunación y desparasitación actualizado para cada gato.",
  },
  {
    title: "Promueve la adopción responsable",
    desc: "Entrevista y orienta a los adoptantes.",
    more: "Selecciona adoptantes comprometidos y proporciona información sobre cuidados. Realiza entrevistas y seguimiento para asegurar el bienestar del gato en su nuevo hogar.",
  },
  {
    title: "Capacita a voluntarios",
    desc: "Brinda formación sobre manejo y bienestar animal.",
    more: "La capacitación mejora la atención a los gatos y la seguridad de los voluntarios. Ofrece talleres sobre comportamiento, salud y protocolos de limpieza en el refugio.",
  },
];

const tipsRefugioPremium = [
  ...tipsRefugioFree,
  { title: "Registra cada gato", desc: "Lleva fichas con datos, salud y evolución de cada felino.", more: "El registro detallado de cada gato permite un mejor seguimiento de su salud y comportamiento. Utiliza software de gestión de refugios para facilitar esta tarea." },
  { title: "Evita el hacinamiento", desc: "Respeta la capacidad máxima del refugio.", more: "El hacinamiento puede causar estrés y enfermedades. Asegúrate de que cada gato tenga suficiente espacio y recursos." },
  { title: "Ofrece atención personalizada", desc: "Dedica tiempo a socializar y observar a cada gato.", more: "Conocer bien a cada gato ayuda a detectar problemas de salud y comportamiento. Además, mejora la relación entre el gato y sus cuidadores." },
  { title: "Fomenta la adopción de adultos", desc: "Promociona gatos mayores, no solo cachorros.", more: "Los gatos adultos suelen ser menos adoptados. Destaca sus cualidades y ofrece descuentos en la adopción para incentivar a las familias." },
  { title: "Crea campañas de adopción", desc: "Utiliza redes sociales y eventos para difundir.", more: "Las campañas bien planificadas pueden aumentar significativamente las tasas de adopción. Colabora con influencers y utiliza hashtags populares." },
  { title: "Colabora con veterinarios", desc: "Alianzas para atención y esterilización a bajo costo.", more: "Los veterinarios pueden ofrecer servicios pro bono o a precio reducido. Establece una relación de colaboración a largo plazo." },
  { title: "Gestiona donaciones", desc: "Facilita canales para recibir ayuda económica o en especie.", more: "Ofrece opciones de donación en línea y en el refugio. Agradece públicamente a los donantes para incentivar más contribuciones." },
  { title: "Educa a la comunidad", desc: "Charlas y talleres sobre tenencia responsable.", more: "La educación es clave para reducir el abandono y maltrato. Organiza eventos regulares y ofrece materiales educativos." },
  { title: "Asegura ventanas y balcones", desc: "Evita caídas y accidentes en el refugio.", more: "Instala mallas de seguridad y revisa regularmente las instalaciones. La seguridad de los gatos debe ser una prioridad." },
  { title: "Monitorea el comportamiento", desc: "Detecta signos de estrés o enfermedad a tiempo.", more: "Un buen monitoreo permite intervenir rápidamente ante cualquier problema. Capacita a tu equipo en detección de problemas de comportamiento." },
  { title: "Ofrece adopciones virtuales", desc: "Permite apadrinar gatos a distancia.", more: "Las adopciones virtuales pueden aumentar el interés por gatos menos populares. Ofrece actualizaciones regulares a los padrinos." },
  { title: "Promueve la esterilización externa", desc: "Informa y apoya a la comunidad para esterilizar gatos callejeros.", more: "La sobrepoblación es un problema grave. Organiza campañas de esterilización y ofrece transporte gratuito a clínicas." },
  { title: "Utiliza feromonas sintéticas", desc: "Ayudan a reducir el estrés en ambientes compartidos.", more: "Las feromonas pueden calmar a los gatos y reducir comportamientos indeseados. Consulta a un veterinario sobre su uso." },
  { title: "Prepara kits de adopción", desc: "Incluye alimento, juguetes y consejos para nuevos dueños.", more: "Un buen kit de adopción puede facilitar la transición del gato a su nuevo hogar. Incluye siempre un collar con identificación." },
  { title: "Realiza seguimientos post-adopción", desc: "Asegura el bienestar del gato en su nuevo hogar.", more: "Los seguimientos permiten detectar y solucionar problemas en la adaptación. Mantén el contacto con los adoptantes al menos durante el primer año." },
  { title: "Ofrece zonas de juego seguras", desc: "Espacios controlados para ejercicio y socialización.", more: "Las zonas de juego reducen el estrés y mejoran la salud física de los gatos. Asegúrate de que sean seguras y estén supervisadas." },
  { title: "Mantén contacto con adoptantes", desc: "Crea una red de apoyo y seguimiento.", more: "Un buen seguimiento post-adopción puede prevenir el abandono. Ofrece asesoría gratuita durante los primeros meses." },
  { title: "Gestiona emergencias", desc: "Ten protocolos claros para evacuación y atención médica urgente.", more: "Establece un plan de emergencia y asegúrate de que todo el personal lo conozca. Realiza simulacros periódicos." },
  { title: "Promueve la adopción inclusiva", desc: "Visibiliza gatos con necesidades especiales.", more: "Los gatos con necesidades especiales suelen ser ignorados. Asegúrate de que reciban la atención y promoción adecuadas." },
  { title: "Actualiza tus redes sociales", desc: "Comparte historias, logros y necesidades del refugio.", more: "Las redes sociales son una herramienta poderosa para atraer donantes y adoptantes. Publica regularmente y utiliza fotos y videos de calidad." },
  { title: "Agradece a donantes y voluntarios", desc: "Reconoce públicamente su apoyo y compromiso.", more: "El reconocimiento puede ser un gran motivador. Considera crear un 'muro de la fama' en tu refugio y en redes sociales." },
];

// Ejemplo de fuentes para cada tip (puedes personalizar o expandir)
const tipSources = [
  "https://www.hogarperu.org/esterilizacion-gatos",
  "https://www.hogarperu.org/zonas-separadas",
  "https://www.hogarperu.org/limpieza-diaria",
  "https://www.hogarperu.org/escondites-gatos",
  "https://www.hogarperu.org/enriquecimiento-ambiental",
  "https://www.hogarperu.org/alimentacion-gatos",
  "https://www.hogarperu.org/agua-fresca",
  "https://www.hogarperu.org/control-veterinario",
  "https://www.hogarperu.org/adopcion-responsable",
  "https://www.hogarperu.org/capacitacion-voluntarios",
  // ...agrega más fuentes si tienes más tips...
];

// Componente de tarjeta interactiva con modal de detalle
const TipCard = ({
  tip,
  index,
  onClick,
}: {
  tip: { title: string; desc: string; more: string };
  index: number;
  onClick: () => void;
}) => (
  <div
    className="group bg-white border-2 border-primary/20 hover:border-primary/60 rounded-2xl shadow-lg p-5 flex flex-col items-center text-center transition-all duration-300 cursor-pointer hover:scale-105 hover:bg-primary/5 relative overflow-hidden"
    tabIndex={0}
    aria-label={tip.title}
    onClick={onClick}
  >
    <span className="absolute top-2 right-4 text-primary/30 text-3xl font-extrabold group-hover:text-primary/70 transition-all select-none">
      #{index + 1}
    </span>
    <span className="text-primary font-extrabold text-lg md:text-xl mb-2 group-hover:text-primary/90 transition-colors drop-shadow">
      {tip.title}
    </span>
    <span className="text-gray-700 text-base md:text-lg font-medium group-hover:text-primary/80 transition-colors">
      {tip.desc}
    </span>
  </div>
);

// Modal para mostrar detalle del tip
const TipModal = ({
  tip,
  index,
  onClose,
}: {
  tip: { title: string; desc: string; more: string };
  index: number;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-fade-in">
      <button
        className="absolute top-2 right-4 text-2xl text-primary font-bold hover:text-red-500"
        onClick={onClose}
        aria-label="Cerrar"
      >
        ×
      </button>
      <h2 className="text-2xl font-extrabold text-primary mb-4">{tip.title}</h2>
      <p className="text-gray-700 text-lg mb-2">{tip.desc}</p>
      <p className="text-gray-600 text-base mb-4">{tip.more}</p>
      <div className="mb-4">
        <span className="block text-primary font-semibold mb-2">Más información:</span>
        <a
          href={tipSources[index % tipSources.length]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline break-all"
        >
          {tipSources[index % tipSources.length]}
        </a>
      </div>
      <button
        className="mt-2 px-4 py-2 bg-primary text-white rounded-full font-bold shadow hover:bg-primary/80 transition"
        onClick={onClose}
      >
        Cerrar
      </button>
    </div>
  </div>
);

const TipsSection = ({
  tips,
  openTip,
  setOpenTip,
}: {
  tips: { title: string; desc: string; more: string }[];
  openTip: number | null;
  setOpenTip: (i: number | null) => void;
}) => (
  <div>
    <h3 className="text-xl md:text-2xl font-bold text-primary mb-6 text-center animate-pulse">
      🐾 Tips para Refugios Felinos 🐾
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {tips.map((tip, i) => (
        <React.Fragment key={i}>
          <TipCard tip={tip} index={i} onClick={() => setOpenTip(i)} />
          {openTip === i && (
            <TipModal tip={tip} index={i} onClose={() => setOpenTip(null)} />
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

const Knowledge = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("articulos");
  const [openTip, setOpenTip] = useState<number | null>(null);
  const tips = userPlan === "premium" ? tipsRefugioPremium : tipsRefugioFree;

  const content: Record<TabKey, ReactNode> = {
    articulos: (
      <div className="flex flex-col gap-10">
        <div className="mb-4">
          <div className="flex gap-2 items-center mb-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                userPlan === "premium"
                  ? "bg-yellow-400 text-white"
                  : "bg-gray-200 text-primary"
              }`}
            >
              {userPlan === "premium" ? "Plan Premium" : "Plan Free"}
            </span>
            <span className="text-primary font-bold text-lg">
              Artículos y Consejos
            </span>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 text-base md:text-lg">
            {userPlan === "premium" ? (
              <>
                <li>Guías avanzadas de enriquecimiento ambiental y socialización.</li>
                <li>Consejos de expertos y veterinarios certificados.</li>
                <li>Checklists descargables y PDFs exclusivos.</li>
                <li>Solución de problemas de comportamiento felino.</li>
              </>
            ) : (
              <>
                <li>
                  Cuidados básicos de gatos: alimentación, salud, higiene y
                  enriquecimiento ambiental.
                </li>
                <li>Proceso de adaptación al hogar para gatos adoptados.</li>
                <li>Consejos para la adopción responsable.</li>
                <li>Cómo preparar tu casa para un gato nuevo.</li>
              </>
            )}
          </ul>
        </div>
        <TipsSection tips={tips} openTip={openTip} setOpenTip={setOpenTip} />
        {userPlan === "free" && (
          <div className="mt-8 text-center">
            <span className="text-primary font-semibold">
              ¿Quieres ver más tips y consejos exclusivos?
            </span>
            <div>
              <button className="mt-2 px-4 py-2 bg-yellow-400 text-white rounded-full font-bold shadow hover:bg-yellow-500 transition">
                ¡Hazte Premium!
              </button>
            </div>
          </div>
        )}
      </div>
    ),
    videos: (
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="flex gap-2 items-center mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${userPlan === "premium" ? "bg-yellow-400 text-white" : "bg-gray-200 text-primary"}`}>
              {userPlan === "premium" ? "Plan Premium" : "Plan Free"}
            </span>
            <span className="text-primary font-bold text-lg">Videos e Infografías</span>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 text-base md:text-lg mb-4">
            <li>
              <a href="https://www.youtube.com/watch?v=J---aiyznGQ" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                Cómo cuidar a tu gato (video)
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/watch?v=5dsGWM5XGdg" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                Juegos para gatos en casa (video)
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/watch?v=8pQAWOCofXo" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                Alimentación adecuada para gatos (video)
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/watch?v=Q2tKpHo1QpQ" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                Cómo bañar a tu gato (video)
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/watch?v=3bGNuRtlQik" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                Señales de estrés en gatos (video)
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/watch?v=1Ne1hqOXKKI" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                Cómo preparar tu casa para un gato (video)
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/watch?v=6Q3p6bU0Q6A" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                Socialización de gatos (video)
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/watch?v=2VbP5d6p6rk" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                Consejos para adopción responsable (video)
              </a>
            </li>
          </ul>
          <div className="mt-6">
            <h4 className="text-primary font-bold mb-2">Infografías:</h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 text-base md:text-lg">
              <li>
                <a href="https://www.hogarperu.org/wp-content/uploads/2022/01/infografia-esterilizacion-gatos.jpg" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Infografía: Importancia de la esterilización
                </a>
              </li>
              <li>
                <a href="https://www.hogarperu.org/wp-content/uploads/2022/01/infografia-alimentacion-gatos.jpg" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Infografía: Alimentación saludable
                </a>
              </li>
              <li>
                <a href="https://www.hogarperu.org/wp-content/uploads/2022/01/infografia-enriquecimiento-ambiental.jpg" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Infografía: Enriquecimiento ambiental
                </a>
              </li>
              <li>
                <a href="https://www.hogarperu.org/wp-content/uploads/2022/01/infografia-adopcion-responsable.jpg" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Infografía: Adopción responsable
                </a>
              </li>
              <li>
                <a href="https://www.hogarperu.org/wp-content/uploads/2022/01/infografia-senales-salud-gato.jpg" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Infografía: Señales de salud en gatos
                </a>
              </li>
              <li>
                <a href="https://www.hogarperu.org/wp-content/uploads/2022/01/infografia-juguetes-gatos.jpg" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Infografía: Juguetes recomendados
                </a>
              </li>
              <li>
                <a href="https://www.hogarperu.org/wp-content/uploads/2022/01/infografia-cuidado-gatitos.jpg" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Infografía: Cuidado de gatitos
                </a>
              </li>
              <li>
                <a href="https://www.hogarperu.org/wp-content/uploads/2022/01/infografia-prevencion-enfermedades.jpg" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Infografía: Prevención de enfermedades
                </a>
              </li>
            </ul>
          </div>
          {userPlan === "free" && (
            <div className="mt-6 bg-primary/10 rounded-lg p-4 text-center">
              <span className="text-primary font-semibold">¿Quieres ver más videos y recursos visuales?</span>
              <div>
                <button className="mt-2 px-4 py-2 bg-yellow-400 text-white rounded-full font-bold shadow hover:bg-yellow-500 transition">¡Hazte Premium!</button>
              </div>
            </div>
          )}
        </div>
        <img src="https://images.unsplash.com/photo-1518715308788-3005759c41c8?auto=format&fit=crop&w=500&q=80" alt="Infografía de gatos" className="rounded-2xl shadow-lg w-full object-cover h-64" />
      </div>
    ),
    glosario: (
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="flex gap-2 items-center mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${userPlan === "premium" ? "bg-yellow-400 text-white" : "bg-gray-200 text-primary"}`}>
              {userPlan === "premium" ? "Plan Premium" : "Plan Free"}
            </span>
            <span className="text-primary font-bold text-lg">Glosario Felino</span>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 text-base md:text-lg">
            <li><b>Esterilización:</b> Procedimiento para evitar la reproducción.</li>
            <li><b>Desparasitación:</b> Eliminación de parásitos internos y externos.</li>
            <li><b>Socialización:</b> Proceso de adaptación del gato a personas y otros animales.</li>
            <li><b>Enriquecimiento ambiental:</b> Estrategias para mejorar el bienestar del gato en casa.</li>
            <li><b>Feromonas:</b> Sustancias químicas que ayudan a calmar y comunicar a los gatos.</li>
            <li><b>Rascador:</b> Objeto diseñado para que los gatos afilen sus uñas y marquen territorio.</li>
            <li><b>Vacunación:</b> Proceso de inmunización para prevenir enfermedades infecciosas.</li>
            <li><b>Microchip:</b> Dispositivo de identificación electrónica implantado bajo la piel del gato.</li>
            <li><b>Adopción responsable:</b> Proceso de seleccionar y preparar un hogar adecuado para un gato.</li>
            <li><b>Refugio:</b> Lugar temporal o permanente que brinda protección y cuidados a gatos sin hogar.</li>
          </ul>
          {userPlan === "free" && (
            <div className="mt-6 bg-primary/10 rounded-lg p-4 text-center">
              <span className="text-primary font-semibold">¿Quieres ver el glosario extendido?</span>
              <div>
                <button className="mt-2 px-4 py-2 bg-yellow-400 text-white rounded-full font-bold shadow hover:bg-yellow-500 transition">¡Hazte Premium!</button>
              </div>
            </div>
          )}
        </div>
        <img src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=500&q=80" alt="Glosario felino" className="rounded-2xl shadow-lg w-full object-cover h-64" />
      </div>
    ),
    mitos: (
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="flex gap-2 items-center mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${userPlan === "premium" ? "bg-yellow-400 text-white" : "bg-gray-200 text-primary"}`}>
              {userPlan === "premium" ? "Plan Premium" : "Plan Free"}
            </span>
            <span className="text-primary font-bold text-lg">Mitos y Realidades</span>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 text-base md:text-lg">
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
            <div className="mt-6 bg-primary/10 rounded-lg p-4 text-center">
              <span className="text-primary font-semibold">¿Quieres ver análisis y testimonios exclusivos?</span>
              <div>
                <button className="mt-2 px-4 py-2 bg-yellow-400 text-white rounded-full font-bold shadow hover:bg-yellow-500 transition">¡Hazte Premium!</button>
              </div>
            </div>
          )}
        </div>
        <img src="https://images.unsplash.com/photo-1518715308788-3005759c41c8?auto=format&fit=crop&w=500&q=80" alt="Mitos de gatos" className="rounded-2xl shadow-lg w-full object-cover h-64" />
      </div>
    ),
    recursos: (
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="flex gap-2 items-center mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${userPlan === "premium" ? "bg-yellow-400 text-white" : "bg-gray-200 text-primary"}`}>
              {userPlan === "premium" ? "Plan Premium" : "Plan Free"}
            </span>
            <span className="text-primary font-bold text-lg">Recursos</span>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 text-base md:text-lg">
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
            <div className="mt-6 bg-primary/10 rounded-lg p-4 text-center">
              <span className="text-primary font-semibold">¿Quieres acceder a recursos exclusivos?</span>
              <div>
                <button className="mt-2 px-4 py-2 bg-yellow-400 text-white rounded-full font-bold shadow hover:bg-yellow-500 transition">¡Hazte Premium!</button>
              </div>
            </div>
          )}
        </div>
        <img src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=500&q=80" alt="Recursos felinos" className="rounded-2xl shadow-lg w-full object-cover h-64" />
      </div>
    ),
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl md:text-5xl font-extrabold mb-8 text-primary text-center drop-shadow-lg">
        Módulo de Conocimiento Felino
      </h1>
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as TabKey)}
            className={`px-4 py-2 rounded-full border-2 font-semibold text-sm md:text-base shadow-md transition-all duration-200 ${
              activeTab === tab.key
                ? "bg-primary text-white border-primary scale-105"
                : "bg-white text-primary border-primary hover:bg-primary/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl shadow-2xl p-8 min-h-[250px] animate-fade-in">
        {content[activeTab]}
      </div>
    </div>
  );
};

export default Knowledge;
