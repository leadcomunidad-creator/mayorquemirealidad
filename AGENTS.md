# MRV WEB — Guía operativa permanente

## Fuente única

- La única carpeta canónica de trabajo y publicación es esta raíz: `D:\01_JUAN_MEJIA\ECOSISTEMA_LHSCOL\13_MRV_WEB_PUBLICO`.
- La web pública vive directamente en esta raíz: `index.html`, `infografias/`, `blogs/`, `mesa/`, `assets/` y `_redirects`.
- Antes de editar, comprobar que `git rev-parse --show-toplevel` devuelve exactamente esta ruta.
- No buscar, elegir ni editar carpetas anidadas, ZIPs, backups u otras copias como si fueran repositorios. Si aparece una copia, no se usa como destino de publicación.

## Cuando el usuario entrega una Infografía

El usuario entrega la fuente editorial. El integrador debe realizar el flujo completo sin pedir correcciones rutinarias:

1. Usar el HTML entregado como la infografía. Nunca rediseñarlo, reconstruirlo, resumirlo ni alterar su contenido o apariencia.
2. Conservar su cuerpo, estilos y contenido editorial. Solo se permiten las adiciones técnicas necesarias en el `<head>` y al final del `<body>` para integrarla con MRV:
   - `title`, descripción, canonical, Open Graph y Twitter.
   - favicon real de Taller: `/assets/pwa/icon-192.png`.
   - barra compartida: `<script src="/assets/mrv-resource-bar.js" data-type="info" data-slug="SLUG"></script>`.
3. El título visible al compartir siempre usa únicamente nombre y tipo de documento, sin códigos internos:
   - `Nombre del mensaje · Infografía`
   - `Nombre del mensaje · Blog`
   - `Nombre del mensaje · La Mesa`
4. Guardar el archivo en `infografias/` con un nombre coherente y enlazarlo desde `_redirects` con las rutas mayúscula y minúscula, ambas `200`.
5. Añadir el recurso al catálogo y a los archivos locales de `assets/mrv-resource-bar.js`.
6. Crear o actualizar la tarjeta del mensaje en `index.html`:
   - Debe incluir Video, Blog, Infografía y La Mesa.
   - Los recursos aún no entregados se muestran apagados, no se eliminan.
   - Solo los recursos realmente disponibles se activan.
   - Si es el mensaje más reciente, mover la marca de reciente y el botón “Último mensaje” a esa tarjeta.
7. En toda página nueva, incluir el favicon de Taller y metadatos sociales completos; no esperar a que el usuario lo solicite.

## Control antes de publicar

- Comprobar sintaxis de `assets/mrv-resource-bar.js`.
- Confirmar que cada redirect apunta a un archivo existente.
- Verificar tarjeta, botones activos/apagados, menú de Fase y “Último mensaje”.
- Confirmar que título, Open Graph y Twitter no contienen `MRV`, fase o códigos internos; solo nombre y tipo de documento.
- Hacer commit solo de los archivos de la entrega y push únicamente cuando el usuario lo solicite.
- Tras el push, verificar el commit remoto y la ruta pública, incluidos favicon, metadatos y barra de recursos.

## Regla de seguridad

No incluir cambios ajenos, recursos pendientes, videos no entregados ni archivos de Taller que el usuario no haya pedido publicar.
