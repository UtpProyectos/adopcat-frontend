import catsAdoptionProgress from "../../../../assets/bg/cats_adoption-progress.png";

const steps = [
  {
    title: "Búsqueda y selección del gato",
    desc: "Explora el catálogo con filtros por edad, raza, ubicación y estado de salud.",
    pos: { x: 50, y: 280 },
  },
  {
    title: "Registro y verificación",
    desc: "Completa tu perfil con datos personales y verifica identidad.",
    pos: { x: 140, y: 180 },
  },
  {
    title: "Solicitud de adopción",
    desc: "Llena el formulario y adjunta documentos requeridos.",
    pos: { x: 260, y: 260 },
  },
  {
    title: "Entrevista o llamada",
    desc: "Agenda entrevista por Zoom o presencial.",
    pos: { x: 360, y: 170 },
  },
  {
    title: "Aprobación y formalización",
    desc: "Firma contrato y coordina entrega.",
    pos: { x: 470, y: 270 },
  },
  {
    title: "Confirmación y entrega",
    desc: "Recibe al gato y formaliza la entrega.",
    pos: { x: 570, y: 180 },
  },
  {
    title: "Adaptación y acogida",
    desc: "Período de adaptación y recomendaciones.",
    pos: { x: 690, y: 280 },
  },
  {
    title: "Seguimiento post-adopción",
    desc: "Recordatorios, guías y soporte continuo.",
    pos: { x: 800, y: 180 },
  },
];

export default function CurvedRoadTimeline() {
 return (
        <div className="w-full overflow-x-auto">
      <div
        className="relative w-full h-screen md:h-[1000px] bg-center bg-no-repeat bg-contain"
        style={{ backgroundImage: `url(${catsAdoptionProgress})` }}
      >
         
      </div>
    </div>
  );
}