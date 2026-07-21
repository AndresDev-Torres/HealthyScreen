export type ExerciseCategory = 'Descanso visual' | 'Cuello' | 'Espalda' | 'Manos y muñecas' | 'Movimiento'

export interface Exercise {
  id: string
  icon: string
  title: string
  category: ExerciseCategory
  duration: string
  difficulty: 'Suave' | 'Fácil' | 'Moderado'
  description: string
}

export const categoryMeta: Record<ExerciseCategory, { icon: string; description: string }> = {
  'Descanso visual': { icon: '👀', description: 'Dale un respiro a tus ojos y a tu enfoque.' },
  Cuello: { icon: '💆', description: 'Libera suavemente la tensión acumulada.' },
  Espalda: { icon: '🪑', description: 'Recupera movilidad sin alejarte del escritorio.' },
  'Manos y muñecas': { icon: '✋', description: 'Cuida las zonas que más usas al escribir.' },
  Movimiento: { icon: '🚶', description: 'Activa tu cuerpo y renueva tu energía.' },
}

export const exercises: Exercise[] = [
  { id: '20-20-20', icon: '◉', title: 'Regla 20-20-20', category: 'Descanso visual', duration: '1 min', difficulty: 'Suave', description: 'Mira un punto lejano durante 20 segundos y repite tres veces.' },
  { id: 'blink', icon: '◌', title: 'Parpadeo consciente', category: 'Descanso visual', duration: '1 min', difficulty: 'Suave', description: 'Cierra y abre los ojos lentamente para aliviar la sequedad.' },
  { id: 'far-point', icon: '↗', title: 'Mirar un punto lejano', category: 'Descanso visual', duration: '30 seg', difficulty: 'Suave', description: 'Deja la pantalla y enfoca un objeto a varios metros.' },
  { id: 'neck-side', icon: '↝', title: 'Inclinación lateral', category: 'Cuello', duration: '2 min', difficulty: 'Fácil', description: 'Acerca suavemente una oreja a cada hombro, sin forzar.' },
  { id: 'neck-rotations', icon: '⟳', title: 'Rotaciones suaves', category: 'Cuello', duration: '1 min', difficulty: 'Fácil', description: 'Gira la cabeza lentamente hacia ambos lados.' },
  { id: 'neck-back', icon: '↓', title: 'Estiramiento posterior', category: 'Cuello', duration: '1 min', difficulty: 'Suave', description: 'Lleva suavemente el mentón hacia el pecho y respira.' },
  { id: 'lower-back', icon: '⌁', title: 'Estiramiento lumbar', category: 'Espalda', duration: '2 min', difficulty: 'Fácil', description: 'Inclínate hacia delante sentado y deja descansar los brazos.' },
  { id: 'torso', icon: '↔', title: 'Rotación de torso', category: 'Espalda', duration: '2 min', difficulty: 'Fácil', description: 'Rota el torso de forma controlada hacia cada lado.' },
  { id: 'extension', icon: '↑', title: 'Extensión de espalda', category: 'Espalda', duration: '1 min', difficulty: 'Moderado', description: 'Entrelaza las manos detrás y abre suavemente el pecho.' },
  { id: 'wrist-rotations', icon: '⟳', title: 'Rotaciones de muñecas', category: 'Manos y muñecas', duration: '1 min', difficulty: 'Suave', description: 'Dibuja círculos lentos con ambas muñecas.' },
  { id: 'fingers', icon: '✦', title: 'Estiramiento de dedos', category: 'Manos y muñecas', duration: '1 min', difficulty: 'Suave', description: 'Abre las manos y estira los dedos con suavidad.' },
  { id: 'wrist-flex', icon: '⌄', title: 'Flexión de muñecas', category: 'Manos y muñecas', duration: '2 min', difficulty: 'Fácil', description: 'Extiende un brazo y acompaña la mano con la otra.' },
  { id: 'walk', icon: '↗', title: 'Caminar un momento', category: 'Movimiento', duration: '3 min', difficulty: 'Fácil', description: 'Levántate y camina a un ritmo cómodo por tu espacio.' },
  { id: 'breathing', icon: '◌', title: 'Respiración profunda', category: 'Movimiento', duration: '2 min', difficulty: 'Suave', description: 'Inhala profundo, sostén un instante y exhala despacio.' },
  { id: 'squats', icon: '⌄', title: 'Sentadillas suaves', category: 'Movimiento', duration: '2 min', difficulty: 'Moderado', description: 'Realiza sentadillas lentas y cómodas, respetando tu cuerpo.' },
]
