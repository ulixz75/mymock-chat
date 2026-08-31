import { MockState, TemplatePreset } from '../types';

export const DEFAULT_MOCK_STATE: MockState = {
  id: 'instagram-comment-testimonial',
  title: 'Instagram Testimonio de Cliente',
  platform: 'instagram_comment',
  mockType: 'comment',
  theme: 'dark',
  device: 'social_card',
  statusBar: {
    time: '9:41',
    batteryLevel: 88,
    isCharging: false,
    showBatteryPercentage: true,
    wifiSignal: 4,
    cellularSignal: 4,
    networkType: '5G',
    showAirplane: false,
    carrier: 'Carrier',
    showDynamicIsland: true,
    showStatusBar: false,
  },
  contact: {
    name: 'Ana Martínez',
    username: 'amrtinez_3450',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80',
    statusText: 'activo(a) ahora',
    isVerified: false,
    isOnline: true,
  },
  meUser: {
    name: 'Nabori Corp',
    username: 'naboricorp',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=256&h=256&q=80',
  },
  chat: {
    chatWallpaper: 'default',
    showDateHeader: true,
    dateHeaderText: 'HOY',
    showEncryptionNotice: true,
    encryptionNoticeText: 'Los mensajes y las llamadas están cifrados de extremo a extremo.',
    inputPlaceholder: 'Mensaje...',
    showBottomBar: true,
    isSMSMode: false,
    instagramGradientBubbles: false,
  },
  commentConfig: {
    postOwnerUsername: 'naboricorp',
    postOwnerAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=256&h=256&q=80',
    postDescription: 'Resultados reales de nuestros alumnos de este mes 🚀',
    postTimeAgo: '18w',
    totalCommentsCount: '248 comentarios',
    comments: [
      {
        id: 'c-1',
        authorName: 'Ana Martínez',
        authorUsername: 'amrtinez_3450',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80',
        isVerified: false,
        content: 'Gracias, ha sido una experiencia maravillosa. El cambio que ha dado ha sido del cielo a la tierra. El interes que le pone a las clases , lo que antes no hacía. Nabori Corp fue muy buena decisión.',
        timeAgo: '18w',
        likesCount: '1.3k likes',
        isLiked: false,
      }
    ]
  },
  messages: [
    {
      id: 'm-1',
      sender: 'other',
      type: 'text',
      text: '¡Hola! Vi sus cursos y me gustaría saber cómo inscribir a mi hijo.',
      time: '10:15 AM',
      status: 'read',
    },
    {
      id: 'm-2',
      sender: 'me',
      type: 'text',
      text: '¡Hola Ana! Un gusto saludarte 😊 Tenemos inscripciones abiertas para el grupo intensivo. Te paso toda la info:',
      time: '10:17 AM',
      status: 'read',
    },
    {
      id: 'm-3',
      sender: 'me',
      type: 'text',
      text: 'Incluye acceso a la plataforma 24/7, asesorías en vivo y certificación oficial.',
      time: '10:17 AM',
      status: 'read',
    },
    {
      id: 'm-4',
      sender: 'other',
      type: 'text',
      text: '¡Excelente! Ya realicé la transferencia. Adjunto el comprobante.',
      time: '10:24 AM',
      status: 'read',
    },
    {
      id: 'm-5',
      sender: 'other',
      type: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
      text: 'Comprobante_Pago_9482.jpg',
      time: '10:25 AM',
      status: 'read',
    },
    {
      id: 'm-6',
      sender: 'me',
      type: 'text',
      text: '¡Pago confirmado con éxito! 🎉 Bienvenido a la familia. En breve recibirás los accesos a tu correo.',
      time: '10:28 AM',
      status: 'read',
      reactions: [{ emoji: '❤️', count: 1, userLiked: true }]
    }
  ],
  exportSettings: {
    format: 'png',
    scale: 3,
    padding: 24,
    backgroundStyle: 'none',
    showShadow: true,
    roundedCanvas: true,
    aspectRatio: 'auto',
  }
};

export const TEMPLATES_LIBRARY: TemplatePreset[] = [
  {
    id: 'tpl-ig-comment-nabori',
    title: 'Instagram Testimonio de Reseña (Ejemplo adjunto)',
    category: 'testimonial',
    description: 'Comentario estilo Instagram idéntico a la referencia con likes, tiempo y texto destacado.',
    platform: 'instagram_comment',
    mockType: 'comment',
    data: {
      platform: 'instagram_comment',
      mockType: 'comment',
      theme: 'dark',
      device: 'social_card',
      commentConfig: {
        postOwnerUsername: 'naboricorp',
        postOwnerAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=256&h=256&q=80',
        postDescription: 'Resultados reales de nuestros alumnos 🚀',
        postTimeAgo: '18w',
        totalCommentsCount: '248 comentarios',
        comments: [
          {
            id: 'c-1',
            authorName: 'Ana Martínez',
            authorUsername: 'amrtinez_3450',
            authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80',
            isVerified: false,
            content: 'Gracias, ha sido una experiencia maravillosa. El cambio que ha dado ha sido del cielo a la tierra. El interes que le pone a las clases , lo que antes no hacía. Nabori Corp fue muy buena decisión.',
            timeAgo: '18w',
            likesCount: '1.3k likes',
            isLiked: false,
          }
        ]
      }
    }
  },
  {
    id: 'tpl-whatsapp-sales',
    title: 'WhatsApp Cierre de Ventas & Comprobante',
    category: 'sales',
    description: 'Conversación de WhatsApp con cliente que consulta, recibe atención rápida y envía comprobante de pago.',
    platform: 'whatsapp',
    mockType: 'chat',
    data: {
      platform: 'whatsapp',
      mockType: 'chat',
      theme: 'dark',
      device: 'iphone_16_pro',
      contact: {
        name: 'Camila Morales',
        username: 'camila_m',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
        statusText: 'en línea',
        isVerified: false,
        isOnline: true,
      },
      chat: {
        chatWallpaper: 'whatsapp_pattern',
        showDateHeader: true,
        dateHeaderText: 'HOY',
        showEncryptionNotice: true,
        encryptionNoticeText: 'Los mensajes y las llamadas están cifrados de extremo a extremo.',
        inputPlaceholder: 'Mensaje',
        showBottomBar: true,
      },
      messages: [
        {
          id: 'w-1',
          sender: 'other',
          type: 'text',
          text: '¡Hola! ¿Aún tienen disponible la promoción del 50% de descuento?',
          time: '11:40 AM',
          status: 'read',
        },
        {
          id: 'w-2',
          sender: 'me',
          type: 'text',
          text: '¡Hola Camila! Sí, nos quedan solo 2 cupos para hoy con ese beneficio exclusivo 🔥',
          time: '11:42 AM',
          status: 'read',
        },
        {
          id: 'w-3',
          sender: 'other',
          type: 'text',
          text: '¡Perfecto! Pásame el link de pago o datos de transferencia para apartarlo ya mismo.',
          time: '11:43 AM',
          status: 'read',
        },
        {
          id: 'w-4',
          sender: 'me',
          type: 'text',
          text: 'Puedes transferir directo a la cuenta CLABE: 012180015948293847 o pagar con tarjeta aquí: pay.link/nabori-promo',
          time: '11:44 AM',
          status: 'read',
        },
        {
          id: 'w-5',
          sender: 'other',
          type: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
          text: 'Listo! Ya quedó transferido ✅',
          time: '11:46 AM',
          status: 'read',
        },
        {
          id: 'w-6',
          sender: 'me',
          type: 'text',
          text: '¡Felicidades y bienvenida! 🥳 Tu acceso ya está activado. Te envié el link al correo.',
          time: '11:48 AM',
          status: 'read',
          reactions: [{ emoji: '❤️', count: 1, userLiked: true }]
        }
      ]
    }
  },
  {
    id: 'tpl-whatsapp-voicenote',
    title: 'WhatsApp Mensaje de Voz & Testimonio Real',
    category: 'whatsapp',
    description: 'WhatsApp con nota de voz realista, ondas de audio y mensaje de agradecimiento.',
    platform: 'whatsapp',
    mockType: 'chat',
    data: {
      platform: 'whatsapp',
      mockType: 'chat',
      theme: 'light',
      device: 'iphone_16_pro',
      contact: {
        name: 'Dr. Roberto Vargas',
        username: 'dr_roberto',
        avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=256&h=256&q=80',
        statusText: 'activo hace 5 min',
        isVerified: true,
        isOnline: false,
      },
      messages: [
        {
          id: 'wv-1',
          sender: 'other',
          type: 'voice',
          text: '',
          voiceDuration: '0:42',
          voiceProgress: 75,
          isVoicePlayed: true,
          time: '2:15 PM',
          status: 'read',
        },
        {
          id: 'wv-2',
          sender: 'other',
          type: 'text',
          text: 'Quería enviarte ese audio para agradecerte en persona. Los resultados en las primeras dos semanas han sido increíbles.',
          time: '2:16 PM',
          status: 'read',
        },
        {
          id: 'wv-3',
          sender: 'me',
          type: 'text',
          text: '¡Muchísimas gracias Roberto! Qué alegría enorme escuchar eso 🙌 Seguimos con todo.',
          time: '2:18 PM',
          status: 'read',
          reactions: [{ emoji: '🙏', count: 1, userLiked: true }]
        }
      ]
    }
  },
  {
    id: 'tpl-imessage-apple',
    title: 'Apple iMessage (iOS SMS Azul & Fotos)',
    category: 'testimonial',
    description: 'Auténtica interfaz de Apple iMessage con burbujas azules, FaceTime y confirmación de entrega.',
    platform: 'imessage',
    mockType: 'chat',
    data: {
      platform: 'imessage',
      mockType: 'chat',
      theme: 'dark',
      device: 'iphone_16_pro',
      contact: {
        name: 'Sofía Valenzuela',
        username: 'sofia_v',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=80',
        statusText: 'iMessage',
        isVerified: false,
        isOnline: true,
      },
      chat: {
        chatWallpaper: 'default',
        showDateHeader: true,
        dateHeaderText: 'Hoy 12:30',
        showEncryptionNotice: false,
        encryptionNoticeText: '',
        inputPlaceholder: 'iMessage',
        showBottomBar: true,
        isSMSMode: false,
      },
      messages: [
        {
          id: 'im-1',
          sender: 'other',
          type: 'text',
          text: 'Amigaaa no sabes!! Acabo de recibir el paquete y la calidad está insuperable 😍✨',
          time: '12:31 PM',
          status: 'read',
        },
        {
          id: 'im-2',
          sender: 'other',
          type: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
          text: '',
          time: '12:32 PM',
          status: 'read',
        },
        {
          id: 'im-3',
          sender: 'me',
          type: 'text',
          text: '¡Ayyy qué emoción! Te dije que te iba a encantar 💖 ¿Llegó todo a tiempo?',
          time: '12:34 PM',
          status: 'read',
          reactions: [{ emoji: '❤️', count: 1 }]
        },
        {
          id: 'im-4',
          sender: 'other',
          type: 'text',
          text: 'Sii, tardó solo 24 horas. ¡Mil gracias por la recomendación!',
          time: '12:35 PM',
          status: 'read',
        }
      ]
    }
  },
  {
    id: 'tpl-instagram-dm',
    title: 'Instagram Direct Message (DM & Reacciones)',
    category: 'instagram',
    description: 'Mockup de DM de Instagram con burbujas de gradiente, botón de corazón y estado "Visto".',
    platform: 'instagram_dm',
    mockType: 'chat',
    data: {
      platform: 'instagram_dm',
      mockType: 'chat',
      theme: 'dark',
      device: 'iphone_16_pro',
      contact: {
        name: 'Valentina Rossi',
        username: 'valen_rossi',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80',
        statusText: 'Activo(a) ahora',
        isVerified: true,
        isOnline: true,
      },
      chat: {
        chatWallpaper: 'default',
        showDateHeader: true,
        dateHeaderText: '14:20',
        showEncryptionNotice: false,
        encryptionNoticeText: '',
        inputPlaceholder: 'Enviar mensaje...',
        showBottomBar: true,
        instagramGradientBubbles: true,
      },
      messages: [
        {
          id: 'ig-1',
          sender: 'other',
          type: 'text',
          text: '¡Hola! Acabo de probar el producto en mis historias y a mi comunidad le fascinó 🔥',
          time: '2:20 PM',
          status: 'read',
        },
        {
          id: 'ig-2',
          sender: 'me',
          type: 'text',
          text: '¡Hola Valen! Vimos las historias, quedaron increíbles 😍 Muchas gracias por la mención.',
          time: '2:22 PM',
          status: 'read',
          reactions: [{ emoji: '❤️', count: 1, userLiked: true }]
        },
        {
          id: 'ig-3',
          sender: 'other',
          type: 'text',
          text: '¿Podemos armar un código de descuento especial para ellos? Me están lloviendo DMs preguntando dónde comprarlo.',
          time: '2:25 PM',
          status: 'read',
        },
        {
          id: 'ig-4',
          sender: 'me',
          type: 'text',
          text: '¡Claro que sí! Ya te activamos el código "VALEN20" con 20% OFF para tus seguidores 🚀',
          time: '2:26 PM',
          status: 'read',
        }
      ]
    }
  },
  {
    id: 'tpl-telegram-channel',
    title: 'Telegram Mensajería & Grupo Privado',
    category: 'viral',
    description: 'Telegram con diseño moderno en modo oscuro, checks dobles y soporte para enlaces.',
    platform: 'telegram',
    mockType: 'chat',
    data: {
      platform: 'telegram',
      mockType: 'chat',
      theme: 'dark',
      device: 'iphone_16_pro',
      contact: {
        name: 'Comunidad VIP de Inversiones',
        username: 'crypto_vip_channel',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=256&h=256&q=80',
        statusText: '14,520 suscriptores',
        isVerified: true,
        isOnline: true,
      },
      messages: [
        {
          id: 'tg-1',
          sender: 'other',
          type: 'text',
          text: '🚨 SEÑAL CERRADA CON ÉXITO: +34.8% de beneficio en las últimas 48 horas.',
          time: '08:30',
          status: 'read',
        },
        {
          id: 'tg-2',
          sender: 'other',
          type: 'text',
          text: 'Gracias a todos los que entraron en la posición. Nueva señal programada para hoy a las 15:00 UTC.',
          time: '08:31',
          status: 'read',
          reactions: [{ emoji: '🔥', count: 842 }, { emoji: '🚀', count: 419 }]
        },
        {
          id: 'tg-3',
          sender: 'me',
          type: 'text',
          text: '¡Operación ejecutada a la perfección! Saludos desde México 🇲🇽',
          time: '08:35',
          status: 'read',
        }
      ]
    }
  },
  {
    id: 'tpl-android-sms',
    title: 'Android SMS / Google Messages (RCS)',
    category: 'support',
    description: 'Estilo Material You de Google Messages / Android SMS con burbujas redondeadas y estado RCS.',
    platform: 'android_sms',
    mockType: 'chat',
    data: {
      platform: 'android_sms',
      mockType: 'chat',
      theme: 'dark',
      device: 'android',
      contact: {
        name: 'Banco Notificaciones',
        username: 'banco_app',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
        statusText: 'Chat RCS con Banco Notificaciones',
        isVerified: true,
        isOnline: true,
      },
      messages: [
        {
          id: 'as-1',
          sender: 'other',
          type: 'text',
          text: 'BANCO NOTIFICA: Has recibido una transferencia SPEI por $15,450.00 MXN de NABORI CORP. Folio: 83920194.',
          time: '16:04',
          status: 'read',
        },
        {
          id: 'as-2',
          sender: 'other',
          type: 'text',
          text: 'Tu saldo disponible actual es de $48,920.50 MXN. Para consultar tu estado de cuenta entra a la app oficial.',
          time: '16:04',
          status: 'read',
        }
      ]
    }
  },
  {
    id: 'tpl-messenger-fb',
    title: 'Facebook Messenger Chat',
    category: 'support',
    description: 'Facebook Messenger con avatar en miniatura, botón de me gusta y estado activo.',
    platform: 'messenger',
    mockType: 'chat',
    data: {
      platform: 'messenger',
      mockType: 'chat',
      theme: 'dark',
      device: 'iphone_16_pro',
      contact: {
        name: 'Tienda Oficial Express',
        username: 'tienda_oficial',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
        statusText: 'Activo(a) hace 2 min',
        isVerified: true,
        isOnline: true,
      },
      messages: [
        {
          id: 'fb-1',
          sender: 'other',
          type: 'text',
          text: '¡Hola! Tu pedido #8491 ya fue despachado y está en camino con DHL Express 📦',
          time: '10:00 AM',
          status: 'read',
        },
        {
          id: 'fb-2',
          sender: 'me',
          type: 'text',
          text: '¡Genial! ¿Tienen el número de guía para rastrearlo?',
          time: '10:02 AM',
          status: 'read',
        },
        {
          id: 'fb-3',
          sender: 'other',
          type: 'text',
          text: 'Claro que sí, es: DHL-84920148. Fecha estimada de llegada: Mañana antes de las 2:00 PM.',
          time: '10:03 AM',
          status: 'read',
        },
        {
          id: 'fb-4',
          sender: 'me',
          type: 'text',
          text: '¡Súper rápidos! Muchísimas gracias 👍',
          time: '10:05 AM',
          status: 'read',
          reactions: [{ emoji: '👍', count: 1 }]
        }
      ]
    }
  }
];
