import { CheckCircle, XCircle } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import {
  Chip,
  Tooltip,
  Tabs,
  Tab,
  Card,
  CardBody,
  Progress,
} from "@heroui/react";
import { Link, useLocation } from "react-router-dom";
import InfoTab from "./components/Tabs/InfoTab";
import CatsTab from "./components/Tabs/CatsTab";
import RequestTab from "./components/Tabs/RequestTab";
import { useEffect, useState } from "react";
import OrganizationTab from "./components/Tabs/OrganizationTab"; 
import { UserProfile } from "../../../models/user";
import MyCatsTab from "./components/Tabs/MyCatsTab";

const Profile = () => {
  const location = useLocation();
  const { user } = useAuth();

  const [fullProfile, setFullProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState("info");
  
  // Leer tab desde query param y sincronizar estado del tab activo
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab) setActiveTab(tab);
  }, [location.search]);

  const totalFields = 8;
  const completedFields = [
    fullProfile?.firstName,
    fullProfile?.lastName,
    fullProfile?.dni,
    fullProfile?.phoneNumber,
    fullProfile?.address,
    fullProfile?.dniUrl,
    fullProfile?.emailVerified,
    fullProfile?.phoneVerified,
  ].filter((val) => val && val !== "").length;

  const progressValue = Math.round((completedFields / totalFields) * 100);

  const tabs = [
    { id: "info", label: "Información", component: <InfoTab onProfileLoad={setFullProfile} /> },
    { id: "mis-gatos", label: "Mis Gatos", component: <MyCatsTab /> },
    { id: "solicitudes", label: "Solicitudes", component: <RequestTab /> },
    { id: "planes", label: "Planes", component: <RequestTab /> },
    { id: "donaciones", label: "Donaciones", component: <RequestTab /> }, 
    { id: "organizaciones", label: "Organizaciones", component: <OrganizationTab /> },
  ];

  const filteredTabs = tabs.filter((tab) => {
    // Tabs que requieren usuario verificado
    const needsVerified = ["mis-gatos", "solicitudes", "rescatados", "organizaciones"];

    if (needsVerified.includes(tab.id)) {
      return user?.verified;
    }
    return true;
  });

  const profileImage = user?.profilePhoto
    ? user.profilePhoto
    : `https://ui-avatars.com/api/?name=${user?.firstName || ""}+${user?.lastName || ""}&background=0D8ABC&color=fff`;

  return (
    <div className="container mx-auto flex flex-col items-center gap-8 pt-30">
      {/* Perfil */}
      <section className="flex items-center justify-center gap-6 w-full m-auto max-w-6xl " >
        <img
          src={profileImage}
          alt="Foto de perfil"
          className="md:w-20 md:h-20 lg:w-40 lg:h-40 rounded-full object-cover"
        />
        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold md:text-3xl">
                  {user?.firstName || ""} {user?.lastName || ""}
                </h1>

                {/* Estado de verificación */}
                {user?.verified ? (
                  <Tooltip content="Usuario verificado">
                    <CheckCircle size={24} className="text-blue-500 cursor-pointer" />
                  </Tooltip>
                ) : (
                  <Tooltip content="Usuario no verificado">
                    <XCircle size={24} className="text-gray-400 cursor-pointer" />
                  </Tooltip>
                )}
              </div>

              {/* Plan */}
              <Link to="/planes">
                <Chip color="success" className="text-body md:text-xs text-sm">
                  Free
                </Chip>
              </Link>
            </div>

            {/* Email */}
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>

          {/* Progreso de perfil */}
          {fullProfile && progressValue < 100 && (
            <div className="w-full max-w-md">
              <span className="text-sm text-gray-500">Completa tu perfil</span>
              <Progress aria-label="Progreso de perfil" value={progressValue} />
            </div>
          )}

          {fullProfile && progressValue === 100 && (
            <div className="w-full max-w-md">
              <span className="text-sm text-green-600 font-medium flex items-center gap-2">
                <CheckCircle size={18} className="text-green-500" />
                Perfil completo 🎉
              </span>
              <Progress aria-label="Progreso de perfil" value={100} color="success" />
            </div>
          )}
        </div>
      </section>

      {/* Tabs */}
      <section className="w-full px-4 sm:px-6 md:px-8 max-w-6xl ">
        <div className="flex w-full flex-col items-center ">
          <Tabs
            aria-label="Tabs de perfil"
            items={filteredTabs}
            radius="lg"
            className="w-full flex items-center justify-center "
            selectedKey={activeTab}  // Aquí está el cambio importante
            onSelectionChange={(key) => setActiveTab(String(key))}
          >
            {(item) => (
              <Tab key={item.id} title={item.label} className="w-full md:w-auto">
                <Card className="shadow-primary mt-4 w-full max-w-full px-1 py-1 rounded-4xl">
                 <CardBody className="w-full max-w-full flex-1 overflow-x-auto overflow-y-auto min-h-0">
                    {item.component}
                  </CardBody>
                </Card>


              </Tab>
            )}
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Profile;
