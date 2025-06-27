# Unfriendzoned Blueprint Landing Page

Una landing page de alta conversión desarrollada con **Astro.js** para el producto digital "Unfriendzoned Blueprint" - Una guía completa para escapar de la friendzone y crear conexiones románticas significativas.

## 🚀 Características

- **Landing page optimizada para conversión** con todas las secciones esenciales
- **Diseño responsive** que se ve perfecto en todos los dispositivos
- **Sistema de temas** (light/dark/system) con nanostores
- **Optimización SEO** completa con meta tags y schema markup
- **Animaciones suaves** y efectos de hover para mejor UX
- **Formulario funcional** listo para integrar con procesadores de pago
- **Componentes modulares** fáciles de personalizar

## 📋 Secciones Incluidas

1. **Hero Section** - Propuesta de valor única y CTA principal
2. **Social Proof** - Badges de medios, logros y garantías
3. **Testimonios** - Historias reales de éxito con resultados
4. **Clarificación** - Qué es y qué NO es el producto
5. **Pricing/Compra** - Producto principal + bonuses con formulario
6. **Comunidad** - Beneficios de la membresía exclusiva
7. **FAQ** - Respuestas a objeciones comunes
8. **Footer** - CTA final y información legal

## 🛠️ Tecnologías Utilizadas

- **Astro.js** - Framework principal
- **React** - Para componentes interactivos
- **Tailwind CSS** - Styling y responsive design
- **Nanostores** - Gestión de estado para temas
- **TypeScript** - Tipado estático

## 📦 Instalación

### Prerrequisitos

- Node.js 16.0+ 
- npm o yarn

### Pasos de Instalación

1. **Clona el repositorio**
   ```bash
   git clone <repository-url>
   cd unfriendzoned-blueprint-landing
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abre en tu navegador**
   ```
   http://localhost:4321
   ```

## 🔧 Configuración

### Personalización de Contenido

1. **Colores y Temas**
   - Modifica los colores en `tailwind.config.mjs`
   - El tema por defecto es dark mode como se especifica en la memoria

2. **Contenido de Testimonios**
   - Edita `src/components/TestimonialsSection.astro`
   - Reemplaza con testimonios reales

3. **Información de Precios**
   - Modifica `src/components/PurchaseSection.astro`
   - Actualiza precios y bonuses según necesites

4. **FAQ**
   - Personaliza `src/components/FAQSection.astro`
   - Añade/modifica preguntas relevantes para tu producto

### Integración de Pagos

Para integrar un procesador de pagos real:

1. **Stripe** (Recomendado)
   ```bash
   npm install @stripe/stripe-js
   ```

2. **PayPal**
   ```bash
   npm install @paypal/react-paypal-js
   ```

3. **Modificar el formulario**
   - Edita el form en `src/components/PurchaseSection.astro`
   - Añade la lógica de procesamiento de pagos

### Analytics

Para añadir tracking de conversiones:

1. **Google Analytics**
   ```html
   <!-- Añadir en src/layouts/Layout.astro -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   ```

2. **Facebook Pixel**
   ```html
   <!-- Añadir pixel de Facebook en el head -->
   ```

## 🚀 Construcción y Despliegue

### Construcción para Producción

```bash
npm run build
```

Los archivos estáticos se generarán en la carpeta `dist/`.

### Opciones de Despliegue

#### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### GitHub Pages
```bash
npm run build
# Subir contenido de dist/ a gh-pages branch
```

## 📁 Estructura del Proyecto

```
unfriendzoned-blueprint/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── HeroSection.astro
│   │   ├── TestimonialsSection.astro
│   │   ├── PurchaseSection.astro
│   │   ├── ThemeToggle.tsx
│   │   └── ...
│   ├── layouts/             # Layouts de página
│   │   └── Layout.astro
│   ├── pages/               # Páginas de la aplicación
│   │   └── index.astro
│   ├── stores/              # Gestión de estado
│   │   └── theme.ts
│   └── styles/              # Estilos globales
│       └── global.css
├── public/                  # Archivos estáticos
├── astro.config.mjs         # Configuración de Astro
├── tailwind.config.mjs      # Configuración de Tailwind
└── package.json
```

## 🎨 Personalización de Diseño

### Esquema de Colores

El tema sigue el esquema definido en la memoria:

- **Light theme**: fondos blancos, texto blue-dark, acentos azul
- **Dark theme**: fondos blue-dark, texto blanco, acentos amarillo

### Fuentes

- **Inter**: Fuente principal para texto
- **Poppins**: Fuente display para títulos

### Componentes Principales

- `btn-primary`: Botón principal con colores de tema
- `btn-secondary`: Botón secundario outline
- `text-gradient`: Texto con gradiente
- `section-padding`: Padding consistente para secciones

## 🔍 SEO y Optimización

### Meta Tags Incluidos

- Title y description optimizados
- Open Graph para redes sociales
- Twitter Cards
- Schema markup para productos

### Mejores Prácticas Implementadas

- Lazy loading de imágenes
- Fonts preload para velocidad
- Smooth scrolling
- Responsive design
- Accessibility (ARIA labels, alt text)

## 📊 Seguimiento de Conversiones

El proyecto incluye tracking básico de:

- Vistas de secciones
- Interacciones con formularios
- Clics en CTAs
- Tiempo en página

## 🛡️ Seguridad

- SSL requerido para producción
- Validación de formularios
- Headers de seguridad recomendados
- No almacenamiento de datos sensibles

## 📞 Soporte

Para dudas sobre implementación:

- Revisa la documentación de [Astro.js](https://docs.astro.build/)
- Consulta la guía de [Tailwind CSS](https://tailwindcss.com/docs)
- Documentación de [Nanostores](https://github.com/nanostores/nanostores)

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo `LICENSE` para más detalles.

## ✨ Próximas Mejoras

- [ ] Integración con CMS headless
- [ ] A/B testing automático
- [ ] PWA capabilities
- [ ] Optimización automática de imágenes
- [ ] Chat en vivo integrado
- [ ] Analytics avanzados de conversión

---

**¡Tu landing page está lista para convertir visitantes en clientes!** 🎯 # unfrienzonedblueprint
