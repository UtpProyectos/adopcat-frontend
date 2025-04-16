import ContainerHeader from "../../../components/Containers/ContainerHeader"
import CatCatalogo from "../../../assets/cats/cat-catalogo.png"
import CatCatalogoOption from "../../../assets/cats/cat-catalogo-option.png"
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { NavLink } from "react-router-dom";
import CatCard from "../../../components/Cards/CatCard";



const Cats = () => {
  return (
    <div >
      <ContainerHeader
        classP="h-[600px] align-bottomw"
        childrenLeft={
          <>
            <div className="flex flex-col justify-center">
              <Breadcrumbs>
                <BreadcrumbItem>
                  <NavLink to="/">
                    Home
                  </NavLink>
                </BreadcrumbItem>
                <BreadcrumbItem><span className="text-primary font-bold  ">Cats</span></BreadcrumbItem>
              </Breadcrumbs>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-relaxed pt-12">
                Encuentra a tu nuevo compañero felino
              </h1>
              <p className="text-lg text-gray-500 ">
                Explora gatos en adopción cerca de ti <br /> y dale un hogar lleno de amor.
              </p>
            </div>

          </>
        }
        childrenRight={
          <img
            src={CatCatalogo}
            alt="Gato en adopción"
            className="w-[180px] md:w-[300px] lg:w-[500px] h-auto object-contain"
          />


        }
      />
      <section className="bg-body  py-10 dark:bg-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            <CatCard
              id="1"
              name="Arturito"
              imageUrl={CatCatalogoOption}
              location="Lima, Perú"
              gender="Macho"
              age="3 meses"
            />


            <CatCard
              id="1"
              name="Arturito"
              imageUrl={CatCatalogoOption}
              location="Lima, Perú"
              gender="Macho"
              age="3 meses"
            />

            <CatCard
              id="1"
              name="Arturito"
              imageUrl={CatCatalogoOption}
              location="Lima, Perú"
              gender="Macho"
              age="3 meses"
            />


            <CatCard
              id="1"
              name="Arturito"
              imageUrl={CatCatalogoOption}
              location="Lima, Perú"
              gender="Macho"
              age="3 meses"
            />

            <CatCard
              id="1"
              name="Arturito"
              imageUrl={CatCatalogoOption}
              location="Lima, Perú"
              gender="Macho"
              age="3 meses"
            />


            <CatCard
              id="1"
              name="Arturito"
              imageUrl={CatCatalogoOption}
              location="Lima, Perú"
              gender="Macho"
              age="3 meses"
            />
          </div>

        </div>


      </section>

    </div>
  )
}

export default Cats
