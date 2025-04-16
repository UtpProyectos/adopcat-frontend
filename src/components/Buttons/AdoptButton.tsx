import iconPataCat from '../../assets/icons/icon-patacat.png'

type AdoptButtonProps = {
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  label?: string
}

const AdoptButton = ({
  onClick,
  variant = 'primary',
  label = 'Adóptame'
}: AdoptButtonProps) => {
  const baseClasses = "font-semibold py-2 px-4 rounded-xl text-sm flex items-center gap-2 transition-all duration-200 cursor-pointer"

  const variants = {
    primary: "bg-primary hover:bg-orange-600 text-white",
    secondary: "bg-[#0D4C5D] hover:bg-[#0B3F4D] text-white"
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {label}
      <img src={iconPataCat} alt="icono pata" className="w-4 h-4" />
    </button>
  )
}

export default AdoptButton
