import { CheckCircle, XCircle } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { Chip, Tooltip, Tabs, Tab, Card, CardBody, Progress } from "@heroui/react";
import { Link } from "react-router-dom";
import InfoTab from "./components/Tabs/InfoTab";
import CatsTab from "./components/Tabs/CatsTab";
import RequestTab from "./components/Tabs/RequestTab";
import { useState } from "react";
import type { UserProfile } from "./components/Tabs/InfoTab";


const Profile = () => {
  const { user } = useAuth();

  const [fullProfile, setFullProfile] = useState<UserProfile | null>(null);

  const totalFields = 7;
  const completedFields = [
    fullProfile?.firstName,
    fullProfile?.lastName,
    fullProfile?.dni,
    fullProfile?.phoneNumber,
    fullProfile?.address,
    fullProfile?.dniUrl,
    fullProfile?.emailVerified
  ].filter((val) => val && val !== "" && val !== false).length;

  const progressValue = Math.round((completedFields / totalFields) * 100);



  const tabs = [
    { id: "info", label: "Información", component: <InfoTab onProfileLoad={setFullProfile} /> },

    { id: "mis-gatos", label: "Mis Gatos", component: <CatsTab /> },
    { id: "solicitudes", label: "Solicitudes", component: <RequestTab /> },
    { id: "planes", label: "Planes", component: <RequestTab /> },
    { id: "organizaciones", label: "Organizaciones", component: <RequestTab /> },
    { id: "donaciones", label: "Donaciones", component: <RequestTab /> },
    { id: "rescatados", label: "Rescatados", component: <RequestTab /> },
  ];


  const profileImage = user?.profilePhoto
    ? user.profilePhoto
    : `https://ui-avatars.com/api/?name=${user?.firstName || ""}+${user?.lastName || ""}&background=0D8ABC&color=fff`;

  return (
    <div className="container mx-auto flex flex-col items-center gap-8 pt-30">

      {/* Perfil */}
      <section className="flex items-center justify-center gap-6">
        <img
          src={profileImage}
          alt="Foto de perfil"
          className="w-40 h-40 rounded-full object-cover"
        />

        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">
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
                <Chip color="success" className="text-body">
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
      <section className="w-full">
        <div className="flex w-full flex-col items-center">
          <Tabs aria-label="Tabs de perfil" items={tabs} radius="lg">
            {(item) => (
              <Tab key={item.id} title={item.label}>

                <Card className="shadow-primary mt-4 w-full max-w-6xl px-5 py-5 rounded-4xl">
                  <CardBody>{item.component}</CardBody>
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
