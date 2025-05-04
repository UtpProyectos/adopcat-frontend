import zxcvbn from "zxcvbn"

export type PasswordStrength = {
  score: number
  strengthLabel: string
  suggestions: string[]
  color: "danger" | "warning" | "success"
}

const strengthLabels = ["Muy débil", "Débil", "Aceptable", "Fuerte", "Muy fuerte"]
const colorMap = ["danger", "danger", "warning", "success", "success"]

const traducciones: Record<string, string> = {
  // Advertencias
  "This is a top-10 common password": "Esta es una de las 10 contraseñas más comunes.",
  "This is a top-100 common password": "Esta es una de las 100 contraseñas más comunes.",
  "This is a very common password": "Esta es una contraseña muy común.",
  "This is similar to a commonly used password": "Esta contraseña es similar a una comúnmente usada.",
  "A word by itself is easy to guess": "Una palabra por sí sola es fácil de adivinar.",
  "Names and surnames by themselves are easy to guess": "Los nombres y apellidos por sí solos son fáciles de adivinar.",
  "Common names and surnames are easy to guess": "Los nombres y apellidos comunes son fáciles de adivinar.",
  "Straight rows of keys are easy to guess": "Filas rectas de teclas (como 'qwerty') son fáciles de adivinar.",
  "Short keyboard patterns are easy to guess": "Los patrones de teclado cortos son fáciles de adivinar.",
  "Use a longer keyboard pattern with more turns": "Usa un patrón de teclado más largo con más giros.",
  "Repeats like \"aaa\" are easy to guess": "Repeticiones como \"aaa\" son fáciles de adivinar.",
  "Repeats like \"abcabcabc\" are only slightly harder to guess than \"abc\"": "Repeticiones como \"abcabcabc\" son solo un poco más difíciles de adivinar que \"abc\".",
  "Avoid repeated words and characters": "Evita palabras y caracteres repetidos.",
  "Sequences like abc or 6543 are easy to guess": "Secuencias como abc o 6543 son fáciles de adivinar.",
  "Avoid sequences": "Evita secuencias.",
  "Recent years are easy to guess": "Los años recientes son fáciles de adivinar.",
  "Dates are often easy to guess": "Las fechas suelen ser fáciles de adivinar.",
  "Avoid recent years": "Evita años recientes.",
  "Avoid years that are associated with you": "Evita años que estén asociados contigo.",
  "Avoid dates and years that are associated with you": "Evita fechas y años que estén asociados contigo.",
  "This is a recently exposed password": "Esta contraseña fue filtrada recientemente.",
  // Sugerencias
  "Add another word or two. Uncommon words are better.": "Agrega otra palabra o dos. Las palabras poco comunes son mejores.",
  "Capitalization doesn't help very much": "Usar mayúsculas no ayuda mucho.",
  "All-uppercase is almost as easy to guess as all-lowercase": "Usar solo mayúsculas es casi tan fácil de adivinar como solo minúsculas.",
  "Reversed words aren't much harder to guess": "Las palabras invertidas no son mucho más difíciles de adivinar.",
  "Predictable substitutions like '@' instead of 'a' don't help very much": "Sustituciones predecibles como '@' en lugar de 'a' no ayudan mucho.",
  "Use a few words, avoid common phrases": "Usa algunas palabras, evita frases comunes.",
  "No need for symbols, digits, or uppercase letters": "No es necesario usar símbolos, dígitos o letras mayúsculas.",
};

export function validarPassword(password: string): PasswordStrength {
  const result = zxcvbn(password)
  const translatedSuggestions = result.feedback.suggestions.map(s =>
    traducciones[s] || s
  )

  const translatedWarning = result.feedback.warning
    ? traducciones[result.feedback.warning] || result.feedback.warning
    : null

  if (translatedWarning) {
    translatedSuggestions.unshift(translatedWarning)
  }

  return {
    score: result.score,
    strengthLabel: strengthLabels[result.score],
    suggestions: translatedSuggestions,
    color: colorMap[result.score],
  }
}
