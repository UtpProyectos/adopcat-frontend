import { IconUsers, IconCat, IconBuildingCommunity, IconInbox } from "@tabler/icons-react"

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Panel de Administración</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Usuarios" icon={<IconUsers size={32} />} value="128" />
        <Card title="Gatos" icon={<IconCat size={32} />} value="42" />
        <Card title="Organizaciones" icon={<IconBuildingCommunity size={32} />} value="7" />
        <Card title="Solicitudes" icon={<IconInbox size={32} />} value="19" />
      </div>

      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-primary p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Resumen</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Bienvenido al panel administrativo de AdoCat. Aquí podrás gestionar usuarios,
          publicaciones, solicitudes de organizaciones y más.
        </p>
      </div>
    </div>
  )
}

const Card = ({ title, icon, value }: { title: string; icon: React.ReactNode; value: string }) => (
  <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-primary p-4 flex items-center gap-4">
    <div className="p-2 rounded-full bg-primary/10 text-primary">{icon}</div>
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-300">{title}</p>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{value}</h3>
    </div>
  </div>
)

export default Dashboard
