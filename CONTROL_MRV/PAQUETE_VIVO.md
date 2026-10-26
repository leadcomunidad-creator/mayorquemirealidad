# Paquete Vivo de Continuidad

Un Paquete Vivo no es un ZIP. Es el conjunto versionado que permite recuperar el estado operativo exacto del proyecto.

| Documento | Función | Cuándo actualizarlo |
| --- | --- | --- |
| `README.md` | Punto de entrada humano | Si cambia la estructura del paquete |
| `AGENTS.md` | Reglas obligatorias para agentes | Si cambia el flujo o una regla permanente |
| `00_START_HERE.md` | Secuencia de reinicio de chat | Si cambia el protocolo de lectura |
| `ESTADO_ACTUAL.md` | Estado técnico y editorial vigente | Después de cada entrega o cambio relevante |
| `FLUJO_DE_ENTREGA.md` | Procedimiento repetible por recurso | Si el proceso se mejora |
| `HANDOFF_ACTIVO.md` | Punto exacto para continuar | Al cerrar una sesión de trabajo |
| `REGISTRO_DE_PUBLICACIONES.md` | Evidencia de commits y rutas publicadas | Tras cada push verificado |

## Reglas del paquete

- Todos estos archivos viven en Git y se publican junto con su actualización.
- El hash remoto se consulta en tiempo real con `git ls-remote origin refs/heads/main`; no se considera canónico un hash escrito a mano si el remoto difiere.
- Un agente nuevo no depende de la conversación anterior: estos documentos son su fuente de continuidad.
- No crear paquetes paralelos, ZIPs operativos, repositorios espejo ni carpetas de respaldo dentro de la raíz.
