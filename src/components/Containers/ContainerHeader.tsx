import bannerHeader from '../../assets/banner/banner-header2.png'
import shapeHeader from '../../assets/banner/shape-header.png'

type ContainerHeaderProps = {
    childrenLeft: React.ReactNode
    childrenRight: React.ReactNode
    classP?: string // ej. 'h-[1400px]' o 'min-h-[80vh]'
}

const ContainerHeader = ({
    childrenLeft,
    childrenRight,
    classP = 'min-h-[700px]'
}: ContainerHeaderProps) => {
    return (

        <section className="bg-gray-50 dark:bg-[#212224] pt-32 xl:pt-16">



            <div className={`relative w-full md:${classP} flex items-stretch`}>
                {/* Fondo principal como imagen (detrás de todo) */}
                <img
                    src={bannerHeader}
                    alt="Fondo Principal"
                    className="absolute opacity-0 md:opacity-100 inset-0 w-full h-full object-cover object-top z-0"
                />

                {/* Contenido */}
                <div className="relative container mx-auto px-10 md:px-16 flex flex-col md:flex-row gap-6 z-10 ">

                    {/* Bloque de texto centrado */}
                    <div className="w-full md:w-[60%] flex col justify-end align-bottom">
                        {childrenLeft}
                    </div>

                    {/* Imagen + shape en background detrás */}
                    <div className="w-full md:w-[40%] flex items-end justify-center relative overflow-hidden">
                        {/* Shape decorativo detrás */}
                        <img
                            src={shapeHeader}
                            alt="Decoración Shape"
                            className="absolute top-0 md:top-28 left-0 w-full h-full object-contain z-0"
                        />

                        {/* Imagen del gato o lo que se pase como childrenRight */}
                        <div className="relative z-10">
                            {childrenRight}
                        </div>
                    </div>

                </div>
            </div>

        </section>
    )
}

export default ContainerHeader;
