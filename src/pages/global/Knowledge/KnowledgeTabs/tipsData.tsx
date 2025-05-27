// Aquí puedes poner los arrays tipsRefugioFree, tipsRefugioPremium y tipSources
export const tipsRefugioFree = [
  { title: "Esteriliza a todos los gatos", desc: "Evita la sobrepoblación.", more: "La esterilización es fundamental para la salud y el control poblacional." },
  { title: "Limpieza diaria", desc: "Mantén el refugio limpio.", more: "La higiene previene enfermedades y mejora el bienestar de los gatos." }
];

export const tipsRefugioPremium = [
  ...tipsRefugioFree,
  { title: "Registra cada gato", desc: "Lleva fichas de salud.", more: "El registro ayuda a un mejor seguimiento veterinario." }
];

export const tipSources = [
  "https://www.hogarperu.org/esterilizacion-gatos",
  "https://www.hogarperu.org/limpieza-diaria",
  "https://www.hogarperu.org/registro-gatos"
];

// Correcto en un archivo .tsx
import React, { useState } from "react";

const tabs = [
  { label: "Tab 1", key: "tab1" },
  { label: "Tab 2", key: "tab2" }
];

const MyComponent = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <div>
      {tabs.map((tab) => (
        <button key={tab.key} onClick={() => setActiveTab(tab.key)}>
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default MyComponent;