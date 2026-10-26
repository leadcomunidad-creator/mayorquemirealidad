# MRV WEB — Guía operativa permanente

## Fuente única

- La única carpeta canónica de trabajo y publicación es esta raíz: `D:\01_JUAN_MEJIA\ECOSISTEMA_LHSCOL\13_MRV_WEB_PUBLICO`.
- La web pública vive directamente en esta raíz: `index.html`, `infografias/`, `blogs/`, `mesa/`, `assets/` y `_redirects`.
- Antes de editar, comprobar que `git rev-parse --show-toplevel` devuelve exactamente esta ruta.
- No buscar, elegir ni editar carpetas anidadas, ZIPs, backups u otras copias como si fueran repositorios. Si aparece una copia, no se usa como destino de publicación.

## Reinicio de un chat: paquete vivo obligatorio

Antes de analizar, editar o publicar, un chat nuevo debe leer íntegramente y en este orden:

1. `README.md`
2. `CONTROL_MRV/00_START_HERE.md`
3. `CONTROL_MRV/PAQUETE_VIVO.md`
4. `CONTROL_MRV/ESTADO_ACTUAL.md`
5. `CONTROL_MRV/FLUJO_DE_ENTREGA.md`
6. `CONTROL_MRV/HANDOFF_ACTIVO.md`
7. `CONTROL_MRV/REGISTRO_DE_PUBLICACIONES.md`

Después debe ejecutar `git status --short --branch` y `git ls-remote origin refs/heads/main`, informar el estado encontrado y no modificar, borrar, resetear ni publicar nada antes de identificar el alcance autorizado por el usuario.

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
