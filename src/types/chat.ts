export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  displayContent: string;
  timestamp: number;
  feedback?: 'up' | 'down' | null;
  isTyping?: boolean;
  isError?: boolean;
  imageUrl?: string;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}
