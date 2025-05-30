import React from "react";
import { tipsRefugioFree, tipsRefugioPremium } from "./tipsData";

type TabKey = "articulos" | "videos" | "glosario" | "mitos" | "recursos";
type PlanType = "free" | "premium";

interface TabsContentProps {
  userPlan: PlanType;
  openTip: number | null;
  setOpenTip: (i: number | null) => void;
  activeTab: TabKey;
}

export const TipCard = ({ tip, onClick }: any) => (
  <div onClick={onClick} style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}>
    <strong>{tip.title}</strong>
    <div>{tip.desc}</div>
  </div>
);

export const TipModal = ({ tip, onClose }: any) => (
  <div style={{ background: "#fff", border: "1px solid #000", padding: 16, position: "fixed", top: 100, left: "30%" }}>
    <h2>{tip.title}</h2>
    <p>{tip.more}</p>
    <button onClick={onClose}>Cerrar</button>
  </div>
);

export const TipsSection = ({ tips, openTip, setOpenTip }: any) => (
  <div>
    {tips.map((tip: any, i: number) => (
      <React.Fragment key={i}>
        <TipCard tip={tip} index={i} onClick={() => setOpenTip(i)} />
        {openTip === i && <TipModal tip={tip} index={i} onClose={() => setOpenTip(null)} />}
      </React.Fragment>
    ))}
  </div>
);

export const TabsContent: React.FC<TabsContentProps> = ({
  userPlan,
  openTip,
  setOpenTip,
  activeTab,
}) => {
  const tips = userPlan === "premium" ? tipsRefugioPremium : tipsRefugioFree;

  const content: Record<TabKey, React.ReactNode> = {
    articulos: (
      <div>
        <TipsSection tips={tips} openTip={openTip} setOpenTip={setOpenTip} />
      </div>
    ),
    videos: <div>Videos aquí</div>,
    glosario: <div>Glosario aquí</div>,
    mitos: <div>Mitos aquí</div>,
    recursos: <div>Recursos aquí</div>,
  };

  return <>{content[activeTab]}</>;
};