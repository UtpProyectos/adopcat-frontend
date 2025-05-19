import { IconBuildingCommunity } from "@tabler/icons-react"

const OrganizationLoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-neutral-900">
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <IconBuildingCommunity size={48} className="text-primary animate-spin" />
        <p className="text-lg font-medium text-gray-700 dark:text-white">
          Ingresando a Organizaciones...
        </p>
      </div>
    </div>
  )
}

export default OrganizationLoadingScreen
