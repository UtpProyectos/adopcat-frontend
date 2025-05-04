import { useState } from "react"
import { Input } from "@heroui/react"
import LockIcon from "../IconsSvg/LockIcon"
import { EyeFilledIcon, EyeSlashFilledIcon } from "../IconsSvg/EyeIcons"

interface InputPasswordProps {
  label?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  name?: string
  autoComplete?: string
  isRequired?: boolean
}

const InputPassword = ({
  label = "Contraseña",
  value,
  onChange,
  placeholder = "••••••••",
  name = "password",
  autoComplete = "new-password",
  isRequired = false
}: InputPasswordProps) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <Input
      label={label}
      labelPlacement="outside"
      value={value}
      onValueChange={onChange}
      name={name}
      placeholder={placeholder}
      autoComplete={autoComplete}
      type={isVisible ? "text" : "password"}
      startContent={<LockIcon className="w-5 h-5 text-default-400" />}
      endContent={
        <button
          type="button"
          aria-label="toggle password visibility"
          onClick={() => setIsVisible(!isVisible)}
          className="focus:outline-none"
        >
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      isRequired={isRequired}
    />
  )
}

export default InputPassword
