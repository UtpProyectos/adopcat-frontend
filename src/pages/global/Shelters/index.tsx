import { useState, ReactNode } from "react";
import type { FC } from "react";
import { motion } from "framer-motion";

const tabs = [
  { label: "Listado", key: "listado" },
  { label: "Buscar", key: "buscar" },
  { label: "Mapa", key: "mapa" }
];

const shelters = [
  {
    id: 1,
    name: "Refugio Felino Miraflores",
    location: "Miraflores, Lima, Perú",
    description: "Refugio dedicado al rescate y adopción de gatos en Miraflores.",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80",
    cats: 10,
    rating: 4.9,
    lat: -12.1211,
    lng: -77.0297
  },
  {
    id: 2,
    name: "Gatitos de Surco",
    location: "Santiago de Surco, Lima, Perú",
    description: "Rescate y adopción de gatos en Surco.",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80",
    cats: 8,
    rating: 4.7,
    lat: -12.1530,
    lng: -76.9717
  },
  {
    id: 3,
    name: "Refugio San Borja",
    location: "San Borja, Lima, Perú",
    description: "Refugio con enfoque en gatos adultos y mayores.",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80",
    cats: 12,
    rating: 4.8,
    lat: -12.1011,
    lng: -77.0047
  },
  {
    id: 4,
    name: "Gatos de Barranco",
    location: "Barranco, Lima, Perú",
    description: "Refugio artístico y cultural para gatos rescatados.",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80",
    cats: 6,
    rating: 4.6,
    lat: -12.1467,
    lng: -77.0200
  },
  {
    id: 5,
    name: "Casa Gatuna La Molina",
    location: "La Molina, Lima, Perú",
    description: "Refugio familiar con adopciones responsables.",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80",
    cats: 9,
    rating: 4.5,
    lat: -12.0885,
    lng: -76.9480
  },
  {
    id: 6,
    name: "Refugio San Isidro",
    location: "San Isidro, Lima, Perú",
    description: "Refugio con atención veterinaria y adopciones seguras.",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80",
    cats: 11,
    rating: 4.9,
    lat: -12.0972,
    lng: -77.0365
  },
  {
    id: 7,
    name: "Gatitos de Pueblo Libre",
    location: "Pueblo Libre, Lima, Perú",
    description: "Refugio comunitario con voluntariado activo.",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80",
    cats: 7,
    rating: 4.4,
    lat: -12.0732,
    lng: -77.0677
  },
  {
    id: 8,
    name: "Refugio Lince Felino",
    location: "Lince, Lima, Perú",
    description: "Refugio urbano con campañas de esterilización.",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80",
    cats: 13,
    rating: 4.7,
    lat: -12.0850,
    lng: -77.0340
  },
  {
    id: 9,
    name: "Gatos de Magdalena",
    location: "Magdalena del Mar, Lima, Perú",
    description: "Refugio costero con adopciones y educación.",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80",
    cats: 5,
    rating: 4.3,
    lat: -12.0900,
    lng: -77.0730
  }
];

type TabKey = "listado" | "buscar" | "mapa";

const ShelterCard: FC<{ shelter: typeof shelters[0]; onClick?: () => void }> = ({ shelter, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.08, boxShadow: "0 8px 32px 0 rgba(0,0,0,0.2)" }}
    whileTap={{ scale: 0.97 }}
    className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center border-2 border-primary/10 hover:border-primary/40 cursor-pointer group transition-all duration-300"
    onClick={onClick}
  >
    <motion.div
      initial={{ rotate: 0 }}
      whileHover={{ rotate: 8 }}
      className="relative w-32 h-32 mb-4"
    >
      <img src={shelter.image} alt={shelter.name} className="w-full h-full object-cover rounded-full border-4 border-primary shadow-lg group-hover:shadow-2xl transition-shadow duration-300" />
      <motion.span
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute -bottom-2 right-2 bg-primary text-white text-xs px-3 py-1 rounded-full shadow-md font-bold"
      >
        {shelter.cats} gatos
      </motion.span>
    </motion.div>
    <h3 className="text-xl font-bold text-primary mb-1 text-center">{shelter.name}</h3>
    <p className="text-gray-600 mb-1 text-center">{shelter.location}</p>
    <p className="text-gray-500 text-sm text-center mb-2">{shelter.description}</p>
    <motion.div className="flex items-center gap-1" initial={{ scale: 1 }} whileHover={{ scale: 1.2 }}>
      <span className="text-yellow-400 text-lg">★</span>
      <span className="font-semibold text-gray-700">{shelter.rating}</span>
    </motion.div>
  </motion.div>
);

// Ordenar refugios por rating descendente y tomar los 3 mejores
const MOST_VISITED = [...shelters].sort((a, b) => b.rating - a.rating).slice(0, 3);

const BannerMostVisited = () => (
  <motion.div
    className="w-full bg-gradient-to-r from-primary/80 to-primary/60 text-white text-center py-4 rounded-xl shadow-lg mb-8 flex items-center justify-center gap-4"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <span className="text-2xl md:text-3xl font-bold tracking-wide">🐾 Refugios mejor calificados 🐾</span>
  </motion.div>
);

const ShelterList: FC<{ onSelect: (shelter: typeof shelters[0]) => void }> = ({ onSelect }) => (
  <div>
    <BannerMostVisited />
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } }
      }}
    >
      {MOST_VISITED.map((shelter) => (
        <motion.div key={shelter.id} variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}>
          <ShelterCard shelter={shelter} onClick={() => onSelect(shelter)} />
        </motion.div>
      ))}
    </motion.div>
  </div>
);

const ShelterDetail: FC<{ shelter: typeof shelters[0]; onClose: () => void }> = ({ shelter, onClose }) => (
  <motion.div
    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full relative flex flex-col items-center animate-fade-in"
      initial={{ scale: 0.9, y: 40 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 40 }}
      transition={{ duration: 0.3 }}
    >
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-primary text-2xl font-bold">×</button>
      <img src={shelter.image} alt={shelter.name} className="w-32 h-32 rounded-full border-4 border-primary shadow-lg mb-4" />
      <h2 className="text-2xl font-bold text-primary mb-2 text-center">{shelter.name}</h2>
      <p className="text-gray-600 mb-1 text-center">{shelter.location}</p>
      <p className="text-gray-500 text-center mb-4">{shelter.description}</p>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-yellow-400 text-lg">★</span>
        <span className="font-semibold text-gray-700">{shelter.rating}</span>
        <span className="text-gray-500 ml-2">({shelter.cats} gatos)</span>
      </div>
      <div className="w-full bg-primary/10 rounded-xl p-4 mt-2 text-primary text-center font-semibold">
        <span>Contacto: info@{shelter.name.toLowerCase().replace(/ /g, "")}.org</span>
      </div>
      <div className="mt-4 flex flex-col gap-2 w-full">
        <span className="text-sm text-gray-500">¿Quieres saber más? <a href="#" className="text-primary underline">Visita su página</a></span>
      </div>
    </motion.div>
  </motion.div>
);

const ShelterSearchBar: FC = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<typeof shelters>(shelters);
  const handleSearch = () => {
    setResults(
      shelters.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.location.toLowerCase().includes(search.toLowerCase())
      )
    );
  };
  return (
    <div className="w-full flex flex-col items-center">
      <motion.div
        className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar refugio por nombre o ciudad..."
          className="w-full md:w-96 px-4 py-2 rounded-full border-2 border-primary/30 focus:border-primary outline-none shadow-sm transition-all"
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          className="bg-primary text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-primary/90 transition-colors"
          onClick={handleSearch}
        >
          Buscar
        </motion.button>
      </motion.div>
      <div className="w-full">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } }
          }}
        >
          {results.length === 0 ? (
            <motion.div className="col-span-3 text-center text-gray-500 font-semibold py-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>No se encontraron refugios.</motion.div>
          ) : (
            results.map((shelter) => (
              <motion.div key={shelter.id} variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}>
                <ShelterCard shelter={shelter} />
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};

const ShelterMap: FC = () => (
  <motion.div
    className="w-full h-96 rounded-2xl shadow-inner overflow-hidden relative"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.7 }}
  >
    <iframe
      title="Mapa de Refugios en Lima"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      src="https://www.openstreetmap.org/export/embed.html?bbox=-77.12,-12.20,-76.90,-12.05&amp;layer=mapnik"
      className="absolute top-0 left-0 w-full h-full rounded-2xl"
    ></iframe>
    {/* Marcadores personalizados sobre el mapa */}
    {shelters.map((shelter) => {
      const left = ((shelter.lng + 77.12) / (76.90 + 77.12)) * 100;
      const top = ((-shelter.lat - 12.05) / (-12.20 + 12.05)) * 100;
      return (
        <motion.div
          key={shelter.id}
          style={{ left: `${left}%`, top: `${top}%` }}
          className="absolute z-10 flex flex-col items-center group"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={shelter.image}
            alt={shelter.name}
            className="w-10 h-10 rounded-full border-2 border-primary shadow-md group-hover:scale-125 transition-transform duration-200"
            title={shelter.name}
          />
          <motion.span
            className="bg-primary text-white text-xs px-2 py-1 rounded shadow-md mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ y: 10, opacity: 0 }}
            whileHover={{ y: -10, opacity: 1 }}
          >
            {shelter.name}
          </motion.span>
        </motion.div>
      );
    })}
  </motion.div>
);

const SheltersModule: FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("listado");
  const [selectedShelter, setSelectedShelter] = useState<typeof shelters[0] | null>(null);

  const content: Record<TabKey, ReactNode> = {
    listado: selectedShelter ? (
      <ShelterDetail shelter={selectedShelter} onClose={() => setSelectedShelter(null)} />
    ) : (
      <ShelterList onSelect={setSelectedShelter} />
    ),
    buscar: selectedShelter ? (
      <ShelterDetail shelter={selectedShelter} onClose={() => setSelectedShelter(null)} />
    ) : (
      <><ShelterSearchBar /><ShelterList onSelect={setSelectedShelter} /></>
    ),
    mapa: <ShelterMap />,
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-extrabold mb-8 text-primary text-center drop-shadow-lg">Refugios Felinos en Lima, Perú</h1>
      <div className="flex flex-wrap gap-3 mb-10 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key as TabKey);
              setSelectedShelter(null);
            }}
            className={`px-6 py-2 rounded-full border-2 font-bold text-base shadow-md transition-all duration-200 ${activeTab === tab.key ? "bg-primary text-white border-primary scale-105" : "bg-white text-primary border-primary hover:bg-primary/10"}`}
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

export default SheltersModule;
