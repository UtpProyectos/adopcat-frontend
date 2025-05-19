import React, { useState, ReactNode } from "react";

const tabs = [
  { label: "Artículos y Consejos", key: "articulos" },
  { label: "FAQ", key: "faq" },
  { label: "Videos/Infografías", key: "videos" },
  { label: "Glosario Felino", key: "glosario" },
  { label: "Mitos y Realidades", key: "mitos" },
  { label: "Recursos", key: "recursos" },
];

type TabKey = "articulos" | "faq" | "videos" | "glosario" | "mitos" | "recursos";

// Tips interactivos para refugios
const tipsRefugio = [
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
};

const content: Record<TabKey, ReactNode> = {
  articulos: (
    <div className="flex flex-col gap-10">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-primary drop-shadow">Artículos y Consejos</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 text-base md:text-lg">
            <li>Cuidados básicos de gatos: alimentación, salud, higiene y enriquecimiento ambiental.</li>
            <li>Proceso de adaptación al hogar para gatos adoptados.</li>
            <li>Consejos para la adopción responsable.</li>
            <li>Cómo preparar tu casa para un gato nuevo.</li>
            <li className="font-semibold text-primary">Enlace útil: <a href="https://www.hillspet.com.mx/cat-care" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">Guía de cuidados para gatos</a></li>
          </ul>
          <div className="mt-6 flex flex-col gap-2">
            <div className="bg-primary/10 rounded-lg p-4 flex items-center gap-4">
              <img src="https://cdn-icons-png.flaticon.com/512/616/616408.png" alt="Alimentación" className="w-10 h-10" />
              <span className="text-primary font-semibold">Alimentación balanceada: consulta siempre con tu veterinario.</span>
            </div>
            <div className="bg-primary/10 rounded-lg p-4 flex items-center gap-4">
              <img src="https://cdn-icons-png.flaticon.com/512/616/616408.png" alt="Juguetes" className="w-10 h-10" />
              <span className="text-primary font-semibold">Juguetes y rascadores ayudan a evitar el estrés y el aburrimiento.</span>
            </div>
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=500&q=80" alt="Gato cuidado" className="rounded-2xl shadow-lg w-full object-cover h-64" />
      </div>
      {/* Tips interactivos sobre refugios */}
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-primary mb-6 text-center animate-pulse">🐾 30+ Tips para Refugios Felinos 🐾</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tipsRefugio.map((tip, i) => (
            <div
              key={i}
              className="group bg-white border-2 border-primary/20 hover:border-primary/60 rounded-2xl shadow-lg p-5 flex flex-col items-center text-center transition-all duration-300 cursor-pointer hover:scale-105 hover:bg-primary/5 relative overflow-hidden"
            >
              <span className="absolute top-2 right-4 text-primary/30 text-3xl font-extrabold group-hover:text-primary/70 transition-all select-none">#{i+1}</span>
              <span className="text-primary font-extrabold text-lg md:text-xl mb-2 group-hover:text-primary/90 transition-colors drop-shadow">{tip.title}</span>
              <span className="text-gray-700 text-base md:text-lg font-medium group-hover:text-primary/80 transition-colors">{tip.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  faq: (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-primary">Preguntas Frecuentes (FAQ)</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 text-base md:text-lg">
          <li>¿Qué debo considerar antes de adoptar un gato?</li>
          <li>¿Cómo es el proceso de adopción?</li>
          <li>¿Qué vacunas necesita un gato?</li>
          <li>¿Cómo adapto a mi gato a otros animales?</li>
          <li>¿Qué hago si mi gato se enferma?</li>
          <li>¿Es necesario esterilizar a mi gato?</li>
        </ul>
        <div className="mt-6 bg-primary/10 rounded-lg p-4">
          <span className="text-primary font-semibold">¿Tienes más preguntas? <a href="mailto:info@adocat.com" className="underline text-blue-600">Contáctanos aquí</a></span>
        </div>
      </div>
      <img src="https://images.unsplash.com/photo-1518715308788-3005759c41c8?auto=format&fit=crop&w=500&q=80" alt="Gato curioso" className="rounded-2xl shadow-lg w-full object-cover h-64" />
    </div>
  ),
  videos: (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-primary">Videos e Infografías</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 text-base md:text-lg">
          <li><a href="https://www.youtube.com/watch?v=J---aiyznGQ" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Cómo cuidar a tu gato (video)</a></li>
          <li>Infografía: Señales de alerta en la salud felina.</li>
          <li><a href="https://www.youtube.com/watch?v=5dsGWM5XGdg" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Juegos para gatos en casa (video)</a></li>
        </ul>
        <div className="mt-6 bg-primary/10 rounded-lg p-4">
          <span className="text-primary font-semibold">¡Mira más videos en nuestro <a href='https://www.youtube.com/results?search_query=cuidados+gatos' target='_blank' className='underline text-blue-600'>canal recomendado</a>!</span>
        </div>
      </div>
      <img src="https://images.unsplash.com/photo-1518715308788-3005759c41c8?auto=format&fit=crop&w=500&q=80" alt="Infografía de gatos" className="rounded-2xl shadow-lg w-full object-cover h-64" />
    </div>
  ),
  glosario: (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-primary">Glosario Felino</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 text-base md:text-lg">
          <li><b>Esterilización:</b> Procedimiento para evitar la reproducción.</li>
          <li><b>Desparasitación:</b> Eliminación de parásitos internos y externos.</li>
          <li><b>Socialización:</b> Proceso de adaptación del gato a personas y otros animales.</li>
          <li><b>Enriquecimiento ambiental:</b> Estrategias para mejorar el bienestar del gato en casa.</li>
        </ul>
        <div className="mt-6 bg-primary/10 rounded-lg p-4">
          <span className="text-primary font-semibold">¿Conoces otro término? <a href="mailto:info@adocat.com" className="underline text-blue-600">¡Envíanoslo!</a></span>
        </div>
      </div>
      <img src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=500&q=80" alt="Glosario felino" className="rounded-2xl shadow-lg w-full object-cover h-64" />
    </div>
  ),
  mitos: (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-primary">Mitos y Realidades</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 text-base md:text-lg">
          <li>"Los gatos no se encariñan con las personas" — <span className="text-green-600 font-bold">FALSO</span>.</li>
          <li>"Todos los gatos odian el agua" — <span className="text-green-600 font-bold">FALSO</span>.</li>
          <li>"Un gato siempre cae de pie" — <span className="text-yellow-600 font-bold">MITO</span>, pueden lesionarse.</li>
          <li>"Los gatos negros traen mala suerte" — <span className="text-green-600 font-bold">FALSO</span>.</li>
        </ul>
        <div className="mt-6 bg-primary/10 rounded-lg p-4">
          <span className="text-primary font-semibold">¿Conoces otro mito? <a href="mailto:info@adocat.com" className="underline text-blue-600">¡Compártelo!</a></span>
        </div>
      </div>
      <img src="https://images.unsplash.com/photo-1518715308788-3005759c41c8?auto=format&fit=crop&w=500&q=80" alt="Mitos de gatos" className="rounded-2xl shadow-lg w-full object-cover h-64" />
    </div>
  ),
  recursos: (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-primary">Recursos Descargables y Enlaces</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 text-base md:text-lg">
          <li><a href="#" className="text-blue-600 underline">Guía PDF para nuevos adoptantes</a></li>
          <li><a href="https://www.anacat.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Asociación Nacional de Amigos de los Gatos</a></li>
          <li><a href="https://www.hogarperu.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Hogar Perú - Adopción y rescate</a></li>
        </ul>
        <div className="mt-6 bg-primary/10 rounded-lg p-4">
          <span className="text-primary font-semibold">¿Tienes un recurso útil? <a href="mailto:info@adocat.com" className="underline text-blue-600">¡Envíanoslo!</a></span>
        </div>
      </div>
      <img src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=500&q=80" alt="Recursos felinos" className="rounded-2xl shadow-lg w-full object-cover h-64" />
    </div>
  ),
};

const Knowledge = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("articulos");

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl md:text-5xl font-extrabold mb-8 text-primary text-center drop-shadow-lg">Módulo de Conocimiento Felino</h1>
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as TabKey)}
            className={`px-4 py-2 rounded-full border-2 font-semibold text-sm md:text-base shadow-md transition-all duration-200 ${activeTab === tab.key ? "bg-primary text-white border-primary scale-105" : "bg-white text-primary border-primary hover:bg-primary/10"}`}
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
