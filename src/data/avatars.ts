export interface AvatarPreset {
  id: string;
  name: string;
  url: string;
  category: 'women' | 'men' | 'business' | 'creators';
}

export const AVATAR_PRESETS: AvatarPreset[] = [
  {
    id: 'avatar-user-ref',
    name: 'Ana Martínez (Testimonial)',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80',
    category: 'women'
  },
  {
    id: 'avatar-w-1',
    name: 'Elena Gómez',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80',
    category: 'women'
  },
  {
    id: 'avatar-w-2',
    name: 'Sofía Rodríguez',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    category: 'women'
  },
  {
    id: 'avatar-w-3',
    name: 'Valeria Morales',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=80',
    category: 'women'
  },
  {
    id: 'avatar-m-1',
    name: 'Carlos Mendoza',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
    category: 'men'
  },
  {
    id: 'avatar-m-2',
    name: 'Mateo Silva',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
    category: 'men'
  },
  {
    id: 'avatar-m-3',
    name: 'Diego Fernández',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&h=256&q=80',
    category: 'men'
  },
  {
    id: 'avatar-b-1',
    name: 'Nabori Corp / Tech Brand',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=256&h=256&q=80',
    category: 'business'
  },
  {
    id: 'avatar-b-2',
    name: 'Support Team',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
    category: 'business'
  },
  {
    id: 'avatar-c-1',
    name: 'Lucas Creator',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    category: 'creators'
  }
];

export const SAMPLE_ATTACHMENTS = {
  receipt: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
  product: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
  delivery: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
  screenshot: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
  travel: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
};
