# Flujo repetible de entrega

## Infografía recibida

1. Confirmar nombre del mensaje, fase, autor y recurso entregado.
2. Integrar el HTML recibido sin rediseñar ni modificar su contenido editorial o apariencia.
3. Añadir únicamente la capa técnica MRV: metadata social, canonical, favicon de Taller y barra de recursos.
4. Crear o actualizar la tarjeta: Video, Blog, Infografía y La Mesa siempre visibles; solo los recursos aprobados se activan.
5. Actualizar menú F3, catálogo de la barra, archivo local y `_redirects` en ambas capitalizaciones.
6. Si es el mensaje más reciente, actualizar el distintivo y el botón “Último mensaje”.
7. Validar sintaxis, rutas, tarjeta, botones, título social y favicon.
8. Hacer commit solo de los archivos afectados. Hacer push únicamente si el usuario lo solicita.
9. Tras el push, verificar commit remoto y URL pública; registrar el resultado en `REGISTRO_DE_PUBLICACIONES.md` y actualizar `ESTADO_ACTUAL.md` y `HANDOFF_ACTIVO.md`.

## Convenciones fijas

- Infografía: `Nombre · Infografía`
- Blog: `Nombre · Blog`
- La Mesa: `Nombre · La Mesa`
- Nunca exponer códigos internos (`MRV`, `F3`, `MSG`) en el título de compartir.
- Favicon de páginas nuevas: `/assets/pwa/icon-192.png`.
- Barra para una infografía: `data-type="info"` y el slug correspondiente.
