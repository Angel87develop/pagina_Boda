# 💒 Página Web de Boda - Invitación Digital Elegante

Una página web de boda extremadamente elegante, moderna y sofisticada diseñada para anunciar el matrimonio e invitar formalmente a familiares y amigos.

## 🎨 Características del Diseño

### Paleta de Colores
- **Verde oliva oscuro**: `#556B2F`
- **Verde oliva medio**: `#6B8E23`
- **Verde oliva claro**: `#9CAF88`
- **Verde oliva acento**: `#8FBC8F`
- **Blanco**: Base para limpieza y elegancia

### Estilo Visual
- Minimalista y refinado
- Inspiración en invitaciones de boda de alta gama
- Sombras suaves, transparencias y degradados sutiles
- Tipografías elegantes:
  - **Serif**: Cormorant Garamond (títulos)
  - **Sans-serif**: Montserrat (textos)

### Diseño Responsive
- 100% responsive
- Optimizado para móvil, tablet y escritorio
- Animaciones suaves y transiciones elegantes

## 📋 Secciones Incluidas

1. **Hero / Portada**
   - Nombres de la pareja con animación
   - Frase romántica o versículo
   - Fecha del evento destacada
   - Indicador de scroll

2. **Nuestra Historia**
   - Línea de tiempo elegante
   - Bloques narrativos con animaciones
   - Diseño visual atractivo

3. **Cuenta Regresiva**
   - Contador dinámico hasta el día de la boda
   - Actualización en tiempo real
   - Diseño acorde al estilo elegante

4. **Detalles del Evento**
   - Fecha, hora y lugar
   - Iconos elegantes
   - Espacio para mapa (Google Maps)

5. **Galería**
   - Grid refinado de fotos
   - Lightbox al hacer clic
   - Navegación con teclado (flechas)
   - Animaciones suaves

6. **Confirmación de Asistencia (RSVP)**
   - Formulario estilizado
   - Validación completa con JavaScript
   - Mensaje de confirmación elegante
   - Preparado para integración con backend

7. **Sección Final**
   - Mensaje de agradecimiento
   - Firma de la pareja
   - Elementos decorativos sutiles

## 🎼 Música Ambiental

- Reproducción automática al entrar (con consentimiento del navegador)
- Control visible para pausar/reanudar
- Volumen bajo para no ser intrusivo
- Icono animado cuando está reproduciendo

## 🚀 Instalación y Uso

### 1. Estructura de Archivos

```
web_marry/
├── index.html          # Página principal
├── css/
│   └── style.css      # Estilos principales
├── js/
│   └── main.js        # JavaScript principal
├── assets/
│   ├── audio/
│   │   └── wedding-music.mp3  # Música ambiental (agregar tu archivo)
│   └── img/
│       └── gallery/    # Imágenes de la galería
└── README.md
```

### 2. Configuración Personalizada

#### Cambiar la Fecha de la Boda

Edita el archivo `js/main.js` y modifica estas constantes:

```javascript
const WEDDING_DATE = new Date('2025-06-15T17:00:00');
const WEDDING_DAY = 15;
const WEDDING_MONTH = 'Junio';
const WEDDING_YEAR = 2025;
```

#### Personalizar Nombres y Textos

Edita el archivo `index.html` para cambiar:
- Nombres de la pareja en la sección Hero
- Frase romántica y versículo
- Textos de "Nuestra Historia"
- Detalles del evento
- Mensajes personalizados

#### Agregar Música

1. Coloca tu archivo de música en `assets/audio/`
2. Renombra el archivo a `wedding-music.mp3` (o actualiza las referencias en `index.html`)
3. Formatos soportados: MP3, OGG

#### Agregar Imágenes a la Galería

1. Coloca tus imágenes en `assets/img/gallery/`
2. Nombra las imágenes como: `image-1.jpg`, `image-2.jpg`, etc.
3. O edita el HTML en la sección de galería para usar tus propias rutas

#### Integrar Google Maps

1. Ve a [Google Maps](https://www.google.com/maps)
2. Busca la ubicación de tu evento
3. Haz clic en "Compartir" → "Insertar un mapa"
4. Copia el código del iframe
5. Reemplaza el contenido del div con id `map` en `index.html`

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables CSS, flexbox, grid
- **JavaScript Vanilla**: Sin frameworks, código puro
- **Google Fonts**: Tipografías elegantes

## ✨ Características Técnicas

- **Código limpio y comentado**: Fácil de entender y modificar
- **Separación de responsabilidades**: HTML, CSS y JS en archivos separados
- **Accesibilidad**: Buenas prácticas de accesibilidad web
- **Rendimiento**: Optimizado con lazy loading y animaciones eficientes
- **SEO friendly**: Meta tags y estructura semántica
- **Responsive design**: Mobile-first approach

## 📱 Compatibilidad

- ✅ Chrome/Edge (últimas versiones)
- ✅ Firefox (últimas versiones)
- ✅ Safari (últimas versiones)
- ✅ Dispositivos móviles iOS y Android

## 🎯 Personalización Avanzada

### Cambiar Colores

Edita las variables CSS en `css/style.css`:

```css
:root {
    --olive-dark: #556B2F;
    --olive-medium: #6B8E23;
    --olive-light: #9CAF88;
    /* ... más variables */
}
```

### Integrar con Backend (RSVP)

En `js/main.js`, función `initRSVPForm()`, encuentra la sección donde se envían los datos:

```javascript
// Aquí puedes enviar los datos a un backend
const formData = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    // ... más campos
};

// Ejemplo con Fetch API:
fetch('/api/rsvp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
    // Manejar respuesta
});
```

## 📝 Notas Importantes

1. **Música automática**: Los navegadores modernos bloquean la reproducción automática de audio. El usuario debe hacer clic en el botón de música para reproducir.

2. **Imágenes de ejemplo**: Las imágenes en la galería son placeholders. Reemplázalas con tus propias fotos.

3. **Fecha de la boda**: Asegúrate de actualizar la fecha en JavaScript para que la cuenta regresiva funcione correctamente.

4. **Formulario RSVP**: Actualmente guarda los datos en consola. Implementa tu propio backend para almacenar las respuestas.

## 📄 Licencia

Este proyecto es de uso libre para tu boda. Siéntete libre de personalizarlo según tus necesidades.

## 💝 Créditos

Diseñado y desarrollado con ❤️ para crear una experiencia memorable e inolvidable.

---

**¡Felicidades por tu boda!** 🎉

