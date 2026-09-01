export type PlatformId =
  | 'whatsapp'
  | 'telegram'
  | 'instagram_dm'
  | 'instagram_comment'
  | 'imessage'
  | 'messenger'
  | 'android_sms'
  | 'tiktok_comment'
  | 'twitter_dm';

export type MockType = 'chat' | 'comment';

export type ThemeMode = 'light' | 'dark';

export type DeviceType =
  | 'iphone_16_pro'
  | 'iphone_classic'
  | 'android'
  | 'frameless'
  | 'social_card';

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read';
export type MessageSender = 'me' | 'other' | 'system';
export type MessageType = 'text' | 'image' | 'voice' | 'system';

export interface MessageReaction {
  emoji: string;
  count?: number;
  userLiked?: boolean;
}

export interface QuotedReply {
  senderName: string;
  text: string;
  mediaUrl?: string;
  isMe?: boolean;
}

export interface Message {
  id: string;
  sender: MessageSender;
  type: MessageType;
  text: string;
  time: string;
  status: MessageStatus;
  mediaUrl?: string;
  voiceDuration?: string;
  voiceProgress?: number; // 0-100
  isVoicePlayed?: boolean;
  voiceWaveform?: number[]; // alturas 10-100 para grafica, editable por usuario
  reactions?: MessageReaction[];
  replyTo?: QuotedReply;
  senderName?: string; // For group chats
  senderAvatar?: string;
}

export interface MockComment {
  id: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  isVerified: boolean;
  content: string;
  timeAgo: string;
  likesCount: string;
  isLiked: boolean;
  pinned?: boolean;
  isAuthor?: boolean;
  replies?: MockComment[];
}

export interface StatusBarConfig {
  time: string;
  batteryLevel: number;
  isCharging: boolean;
  showBatteryPercentage: boolean;
  wifiSignal: number; // 1-4
  cellularSignal: number; // 1-4
  networkType: '5G' | '4G' | 'LTE' | 'WiFi' | 'None';
  showAirplane: boolean;
  carrier: string;
  showDynamicIsland: boolean;
  showStatusBar: boolean;
}

export interface ContactConfig {
  name: string;
  username: string;
  avatar: string;
  statusText: string;
  isVerified: boolean;
  isOnline: boolean;
  isTyping?: boolean;
  customSubtext?: string;
  phoneOrEmail?: string;
}

export interface MeUserConfig {
  name: string;
  username: string;
  avatar: string;
}

export interface ChatConfig {
  chatWallpaper: 'default' | 'whatsapp_pattern' | 'solid' | 'custom_image';
  customWallpaperUrl?: string;
  wallpaperColor?: string;
  showDateHeader: boolean;
  dateHeaderText: string;
  showEncryptionNotice: boolean;
  encryptionNoticeText: string;
  inputPlaceholder: string;
  showBottomBar: boolean;
  isSMSMode?: boolean; // For iMessage (Green bubble vs Blue bubble)
  instagramGradientBubbles?: boolean;
}

export interface CommentConfig {
  postOwnerUsername: string;
  postOwnerAvatar: string;
  postDescription?: string;
  postTimeAgo?: string;
  comments: MockComment[];
  totalCommentsCount?: string;
}

export interface ExportSettings {
  format: 'png' | 'jpeg' | 'webp';
  scale: 1 | 2 | 3 | 4;
  padding: number;
  backgroundStyle: 'transparent' | 'gradient_purple' | 'gradient_ocean' | 'gradient_sunset' | 'dark' | 'light' | 'none';
  showShadow: boolean;
  roundedCanvas: boolean;
  aspectRatio: 'auto' | '1:1' | '9:16' | '4:5';
}

export interface MockState {
  id: string;
  title: string;
  platform: PlatformId;
  mockType: MockType;
  theme: ThemeMode;
  device: DeviceType;
  statusBar: StatusBarConfig;
  contact: ContactConfig;
  meUser: MeUserConfig;
  chat: ChatConfig;
  messages: Message[];
  commentConfig: CommentConfig;
  exportSettings: ExportSettings;
}

export interface TemplatePreset {
  id: string;
  title: string;
  category: 'testimonial' | 'sales' | 'support' | 'viral' | 'instagram' | 'whatsapp';
  description: string;
  platform: PlatformId;
  mockType: MockType;
  previewThumbnail?: string;
  data: Partial<MockState>;
}
