import ContainerHeader from "../../../components/Containers/ContainerHeader"
import CatCatalogo from "../../../assets/cats/cat-catalogo.png" 
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { NavLink } from "react-router-dom"; 
import VerificationAlert from "../../../components/Alerts/VerificationAlert";

const Home = () => {
  return (
    <div>
      <ContainerHeader
        classP="h-[600px] align-bottomw"
        childrenLeft={
          <>
            <div className="flex flex-col justify-center">
              <Breadcrumbs>
                <BreadcrumbItem>
                  <NavLink to="/">
                  <span className="text-primary font-bold  ">Home</span>
                  </NavLink>
                </BreadcrumbItem> 
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

      <section>
        <VerificationAlert/>
      </section>
    </div>
  )
}

export default Home
