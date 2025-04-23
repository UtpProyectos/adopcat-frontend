import ContainerHeader from "../../../components/Containers/ContainerHeader"
import CatDetail1 from "../../../assets/cats/cat-detail-1.png"
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { NavLink } from "react-router-dom";
import AdoptButton from "../../../components/Buttons/AdoptButton";

const CatDetail = () => {
    return (
        <div>
            <ContainerHeader
                classP="h-[600px] align-bottomw"
                childrenLeft={
                    <>
                        <div className="flex flex-col justify-center gap-5">
                            <Breadcrumbs>
                                <BreadcrumbItem>
                                    <NavLink to="/">
                                        Home
                                    </NavLink>
                                </BreadcrumbItem>
                                <BreadcrumbItem>
                                    <NavLink to="/cats">
                                        Cats
                                    </NavLink>
                                </BreadcrumbItem>
                                <BreadcrumbItem><span className="text-primary font-bold  ">Arturito</span></BreadcrumbItem>
                            </Breadcrumbs>

                            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-relaxed ">
                                Encuentra a tu nuevo compañero felino
                            </h1>
                            <p className="text-lg text-gray-500 ">
                                Explora gatos en adopción cerca de ti <br /> y dale un hogar lleno de amor.
                            </p>

                            
                            <div className="flex gap-10">
                                <AdoptButton label="Adoptame" />

                                <AdoptButton
                                    variant="secondary"
                                    label="Dona Aquí" />

                            </div>
                        </div>

                    </>
                }
                childrenRight={
                    <img
                        src={CatDetail1}
                        alt="Gato en adopción"
                        className="w-[180px] md:w-[300px] lg:w-[330px] h-auto object-contain"
                    />


                }
            />
        </div>
    )
}

export default CatDetail
