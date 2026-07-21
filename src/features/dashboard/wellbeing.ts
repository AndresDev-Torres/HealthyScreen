export const wellbeingTips = [
  'Mantener una buena postura ayuda a prevenir dolores musculares durante jornadas largas.',
  'La regla 20-20-20 puede ayudar a reducir la fatiga visual.',
  'Beber agua durante el estudio favorece la concentración.',
  'Descansar un minuto cada hora ayuda a recuperar energía y atención.',
  'Relajar los hombros de forma consciente reduce la tensión acumulada.',
]

export function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Buenos días'
  if (hour < 19) return 'Buenas tardes'
  return 'Buenas noches'
}
