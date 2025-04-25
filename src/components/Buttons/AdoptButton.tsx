import { Button } from "@heroui/react"
import iconPataCat from "../../assets/icons/icon-patacat.png"

type AdoptButtonProps = {
  label?: string
  isLoading?: boolean
  variant?: "primary" | "secondary"
  type?: "button" | "submit" | "reset"
  onPress?: () => void // ✅ correcto para HeroUI
  fullWidth?: boolean
  iconPosition?: "left" | "right"
}

const AdoptButton = ({
  onPress,
  variant = "primary",
  label = "Adóptame",
  isLoading = false,
  fullWidth = false,
  iconPosition = "right",
  type = "button",
}: AdoptButtonProps) => {
  const color = variant === "primary" ? "primary" : "secondary"

  return (
    <Button
      isLoading={isLoading}
      color={color}
      onPress={onPress}
      type={type}
      className={`font-semibold text-sm rounded-xl flex items-center gap-2 ${
        fullWidth ? "w-full justify-center" : ""
      }`}
    >
      {iconPosition === "left" && (
        <img src={iconPataCat} alt="pata" className="w-4 h-4" />
      )}
      {label}
      {iconPosition === "right" && (
        <img src={iconPataCat} alt="pata" className="w-4 h-4" />
      )}
    </Button>
  )
}

export default AdoptButton
