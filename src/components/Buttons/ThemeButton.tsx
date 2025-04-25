import { useTheme } from "../../context/ThemeContext"

 

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white transition hover:scale-105"
      aria-label="Cambiar modo"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}

export default ThemeButton
