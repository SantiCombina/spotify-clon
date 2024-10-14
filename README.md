# Spotify Clone

Este proyecto es una aplicación desarrollada en React y TypeScript que simula la funcionalidad básica de Spotify, permitiendo buscar artistas, agregar a favoritos y navegar por los detalles de cada uno. La aplicación utiliza la API de Spotify para obtener información en tiempo real.

## Objetivo

El objetivo de esta aplicación es demostrar la capacidad para implementar funcionalidades avanzadas en React, como el manejo de rutas, estado global, y el consumo de APIs externas.

## Requisitos Técnicos Generales

- **Componentes:**
  - La aplicación está dividida en varios componentes reutilizables, como `Artist`, `ArtistDetail`, y otros elementos como el campo de búsqueda y los botones de favoritos.
  
- **Context API:**
  - Se utiliza Context API para gestionar el estado global, específicamente para manejar la lista de artistas favoritos en la aplicación.

- **React Router:**
  - Implementa `React Router` para gestionar la navegación entre las distintas vistas de la aplicación, como la vista de detalles del artista.

## Requisitos Técnicos Específicos

- **Búsqueda de artistas:**
  - La aplicación permite buscar artistas a través de un campo de búsqueda que está vinculado a la API de Spotify. Los resultados se muestran en una lista de tarjetas con los nombres e imágenes de los artistas.

- **Artistas favoritos:**
  - Los usuarios pueden agregar o eliminar artistas de su lista de favoritos, que se guarda en el estado global. Los favoritos se muestran en un contenedor dedicado en la interfaz.

- **Detalles del artista:**
  - Al hacer clic en un artista, se navega a una vista de detalles que incluye más información sobre el artista y sus álbumes.

- **Estilos:**
  - La aplicación utiliza Tailwind CSS para los estilos, lo que facilita la personalización y el diseño responsivo.

## Funcionalidades Implementadas

- **Búsqueda dinámica:**
  - Los resultados de búsqueda se actualizan automáticamente conforme el usuario escribe, gracias a la implementación de un debounced input, que optimiza las llamadas a la API.

- **Sistema de favoritos:**
  - Los usuarios pueden agregar o eliminar artistas de su lista de favoritos con un solo clic. Estos favoritos se guardan en un estado global manejado por Context API.

- **Navegación con rutas:**
  - Se utiliza React Router para navegar entre las diferentes vistas, como la lista de artistas y la página de detalles de cada uno.

## Librerías Utilizadas

- **Tailwind CSS:** para los estilos de la interfaz.
- **Lucide React:** para los íconos.
- **React Router:** para la navegación entre páginas.
- **Spotify API:** para obtener los datos de los artistas en tiempo real.

## Despliegue

La aplicación está desplegada en Vercel. Puedes probar la aplicación directamente desde este enlace: [Spotify Clone](https://spotify-clon-nine.vercel.app)