import React from "react";

// Aquí importa los datos y componentes necesarios (puedes mover los arrays y componentes auxiliares aquí o importarlos)
import { tipsRefugioFree, tipsRefugioPremium, tipSources } from "./tipsData";
import { TipCard, TipModal, TipsSection } from "./TipsComponents";


type TabKey = "articulos" | "videos" | "glosario" | "mitos" | "recursos";
type PlanType = "free" | "premium";

interface TabsContentProps {
  userPlan: PlanType;
  openTip: number | null;
  setOpenTip: (i: number | null) => void;
}

export const TabsContent: React.FC<TabsContentProps & { activeTab: TabKey }> = ({
  userPlan,
  openTip,
  setOpenTip,
  activeTab,
}) => {
  const tips = userPlan === "premium" ? tipsRefugioPremium : tipsRefugioFree;

  const content: Record<TabKey, React.ReactNode> = {
    articulos: (
      <div className="flex flex-col gap-10">
        {/* ...igual que antes, puedes importar TipsSection... */}
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
      // ...tu sección de videos...
      <div>Videos aquí</div>
    ),
    glosario: (
      // ...tu sección de glosario...
      <div>Glosario aquí</div>
    ),
    mitos: (
      // ...tu sección de mitos...
      <div>Mitos aquí</div>
    ),
    recursos: (
      // ...tu sección de recursos...
      <div>Recursos aquí</div>
    ),
  };

  return <>{content[activeTab]}</>;
};