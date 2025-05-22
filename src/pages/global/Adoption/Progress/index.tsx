import catsAdoptionProgress from "../../../../assets/bg/cats_adoption-progress.png";
import catsAdoptionProgressDark from "../../../../assets/bg/cats_adoption-progress-dark.png";
import { FaMapMarkerAlt } from "react-icons/fa";
import StepCard from "../../../../components/Cards/StepCard";
import { useTheme } from "../../../../context/ThemeContext";


export default function CurvedRoadTimeline() {
   const { theme } = useTheme();

  return (
    <div className="w-full overflow-x-auto">
      <div
        className="relative w-full h-[680px] md:h-[1000px] bg-center bg-no-repeat bg-contain"
        style={{
          backgroundImage: `url(${theme === "dark" ? catsAdoptionProgressDark : catsAdoptionProgress})`,
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start pt-24 md:pt-40 ">
          <div className=" min-w-xs max-w-xs md:min-w-xl md:max-w-xl p-4 relative">
            <div className="grid grid-cols-1 gap-4">

              <div className="flex flex-col items-end pe-8 md:pe-25 md:items-end ">
                <FaMapMarkerAlt className="w-8 h-8 md:w-12 md:h-12 " color="orange" />
                <StepCard
                  number="01"
                  title="Búsqueda y selección del gato"
                  description="Explora el catálogo con filtros por edad, raza, ubicación y estado de salud. Visualiza perfiles completos y fotos reales."
                  className="absolute left-10 md:left-25"
                />
              </div>


              <div className="flex justify-center pt-16 md:pt-18" >
                <FaMapMarkerAlt className="w-8 h-8 md:w-12 md:h-12 icon-step2 me-14 md:me-20" color="orange" />
                <StepCard
                  number="02"
                  title="Solicitud de adopción"
                  description="Llena el formulario de adopción y adjunta los documentos requeridos. El refugio recibe y registra tu solicitud para revisión."
                  className="absolute right-5 md:right-20 step2 "
                  textAlign="start"
                />
              </div>

              <div className="flex pt-0 md:pt-8 justify-center">
                <FaMapMarkerAlt className="w-8 h-8 md:w-12 md:h-12 md:ml-20  ml-5" color="orange" />
                <StepCard
                  number="03"
                  title="Revisión y validación del adoptante"
                  description="El refugio revisa tu documentación y perfil para verificar que cumples los requisitos. Solo adoptantes validados pueden continuar."
                  className="absolute right-45 md:right-77"
                  textAlign="start"
                />

              </div>

              <div className="flex pt-4 md:pt-8 justify-center">
                <FaMapMarkerAlt className="w-8 h-8 md:w-12 md:h-12 ml-25 md:ml-40" color="orange" />
                <StepCard
                  number="04"
                  title="Entrevista de validación"
                  description="Se agenda una entrevista (Zoom o presencial) para conocer tu entorno y compromiso. Se resuelven dudas y se explica el proceso de adopción responsable."
                  className="absolute right-35 md:right-60"
                  textAlign="end"
                />

              </div>

              <div className="flex pt-10 md:pt-16 justify-start">
                <FaMapMarkerAlt className="w-8 h-8 md:w-12 md:h-12 md:ml-10" color="orange" />
                <StepCard
                  number="05"
                  title="Aprobación y formalización"
                  description="El refugio aprueba tu solicitud tras entrevista exitosa.Se envía el contrato para firma digital o física y se coordina la entrega. Puedes recibir un kit de bienvenida y materiales educativos."
                  className="absolute right-20 md:right-45"
                  textAlign="start"
                />

              </div>

              <div className="flex pt-1 md:pt-4 justify-start">
                <FaMapMarkerAlt className="w-8 h-8 md:w-12 md:h-12 md:ml-30 ml-20" color="orange" />
                <StepCard
                  number="06"
                  title="Entrega y recepción del gato"
                  description="Recibes al gato en la fecha acordada y firmas el contrato final. Todo queda formalizado y registrado oficialmente."
                  className="absolute right-40 md:right-90 top-100 md:top-150 "
                  textAlign="end"
                />

              </div>
              <div className="flex pt-5 md:pt-12 justify-center">
                <FaMapMarkerAlt className="w-8 h-8 md:w-12 md:h-12 md:ml-32  ml-20" color="orange" />
                <StepCard
                  number="07"
                  title="Adaptación y seguimiento"
                  description="Comienza la adaptación del gato a su nuevo hogar con recomendaciones. Mantienes comunicación con el refugio para soporte y evaluación."
                  className="absolute left-55 md:left-100"
                  textAlign="start"
                />

              </div>
              <div className="flex pt-4 md:pt-10 justify-center">
                <FaMapMarkerAlt className="w-8 h-8 md:w-12 md:h-12 md:me-40 me-25" color="orange" />
                <StepCard
                  number="08"
                  title="Seguimiento post-adopción"
                  description="Recibes recordatorios de vacunación y cuidados personalizados. Accedes a guías, soporte veterinario y participas en encuestas para asegurar el bienestar."
                  className="absolute right-3 md:right-20"
                  textAlign="start"
                />

              </div>


            </div>

          </div>
        </div>
      </div>
    </div>
  );
}