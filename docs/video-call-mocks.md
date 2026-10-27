# Mocks de videollamadas

Las plataformas tienen componentes independientes; no sustituirlas por una pantalla genérica con colores distintos.

| Plataforma | Variante | Composición |
| --- | --- | --- |
| WhatsApp | Móvil individual | Vídeo completo, vista propia flotante, cifrado y controles superpuestos |
| Zoom | Workplace escritorio | Ventana, galería rectangular, orador verde, controles etiquetados |
| Google Meet | Web escritorio | Mosaicos redondeados, orador azul, código/hora y controles inferiores |

Referencias oficiales:

- https://www.whatsapp.com/calling?lang=en
- https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0062674
- https://support.google.com/meet/answer/10550593?hl=en

Son recreaciones de esas variantes, no una garantía de coincidencia píxel a píxel con todas las versiones, sistemas operativos o personalizaciones. Los iconos son Lucide. No se realizan llamadas reales.

## Organización

- Cada vista controla cabecera, distribución y herramientas.
- CallParts comparte sólo fotogramas y contenido del chat; calls.css aísla los estilos.
- getCallConfig completa campos ausentes de proyectos antiguos tanto al mostrar como al editar, sin mutar el objeto original.
- VideoCallEditor persiste participantes, fotos, cámara/micrófono, diseño y chat.
- Zoom y Meet usan un lienzo de 960 × 600 sin marco de teléfono. MeetingPreviewFit escala el contenedor exterior; html-to-image conserva los píxeles del nodo exportado.

Las imágenes son fotogramas estáticos. Las subidas se almacenan como data URL con límite de 1 MB por imagen; el total está sujeto a la cuota del navegador. Las URL remotas requieren disponibilidad y CORS al exportar. Los controles dentro de la captura son decorativos: se editan desde Llamada. La vista propia de WhatsApp usa meUser.avatar.

## Verificación manual

1. Alternar las tres plataformas y comprobar estructuras distintas.
2. Editar nombres y fotos desde Llamada.
3. Probar estados entrante/activa/perdida de WhatsApp y vista propia.
4. Probar galería/orador, participantes y chat de reuniones.
5. Recargar para comprobar persistencia y abrir un proyecto antiguo.
6. Exportar PNG y comprobar tamaño de escritorio sin recortes.
7. Ejecutar npm run lint y npm run build antes de publicar.
