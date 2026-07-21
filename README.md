# HealthyScreen

HealthyScreen es una aplicación web de bienestar digital para estudiantes y trabajadores que pasan largas jornadas frente al computador. Acompaña los momentos de estudio o trabajo con sesiones de enfoque, pausas activas y ejercicios breves para crear hábitos más saludables.

## Problema que resuelve

Pasar muchas horas frente a una pantalla puede contribuir a la fatiga visual, tensión muscular, sedentarismo y agotamiento mental. En medio de una jornada ocupada es fácil olvidar hacer una pausa o no saber qué actividad breve realizar.

HealthyScreen convierte esos descansos en una rutina simple: mide el tiempo de concentración, propone una pausa al completar la sesión, recomienda un ejercicio y registra el progreso de forma local.

## Características principales

- Temporizador de sesiones de estudio o trabajo.
- Temporizador independiente de pausas activas.
- Recomendaciones de ejercicios para vista, cuello, espalda, manos y movimiento.
- Dashboard con progreso diario, pausas y bienestar del día.
- Sistema de logros basado en sesiones y pausas completadas.
- Configuración personalizada de la duración de las sesiones, pausas y meta diaria.
- Persistencia de preferencias y progreso mediante LocalStorage.

## Tecnologías utilizadas

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/)
- CSS Modules
- LocalStorage
- TypeScript

## Cómo ejecutar el proyecto

### Requisitos

- Node.js 20 o superior.
- npm.

### Instalación

```bash
npm install
```

### Desarrollo local

```bash
npm run dev
```

Vite mostrará en la terminal la dirección local para abrir la aplicación en el navegador.

### Build de producción

```bash
npm run build
```

## Estructura del proyecto

```text
src/
├── app/                 # Proveedores globales y definición de rutas
├── components/          # Layout y componentes reutilizables de interfaz
├── features/            # Funcionalidades organizadas por dominio
│   ├── about/           # Información del producto y del equipo
│   ├── achievements/    # Logros y progreso
│   ├── breaks/          # Ciclo y temporizador de pausas activas
│   ├── dashboard/       # Resumen de bienestar y progreso diario
│   ├── exercises/       # Biblioteca de ejercicios
│   ├── focus-session/  # Temporizador de concentración
│   └── settings/        # Preferencias del usuario
├── lib/                 # Utilidades de fechas y persistencia
├── stores/              # Estado global con Context y reducer
└── types/               # Tipos del dominio de la aplicación
```

## Persistencia de datos

HealthyScreen no requiere backend para el MVP. Las preferencias, sesiones finalizadas, pausas completadas y ejercicios realizados se guardan en el navegador bajo una clave versionada de LocalStorage. Los datos permanecen disponibles mientras se use el mismo navegador y dispositivo.

## Trabajo futuro

- Extensión para Chrome que recuerde las pausas desde cualquier sitio web.
- Sincronización en la nube entre dispositivos.
- Estadísticas semanales y tendencias de bienestar.
- Recomendaciones personalizadas con integración de IA.
- Integración con smartwatches y otras fuentes de actividad.

## Equipo

Proyecto académico de la asignatura **Estrategias de pensamiento**, dirigido por **David Eduardo Murcia Lesmes**.

- Andrés Torres Londoño
- María Ángel Soto Martínez
- Laura Valentina Luna Mateus
- Edwin Alejandro Navarrete Molina
- Darien Leandro Tibaquira Rodríguez
