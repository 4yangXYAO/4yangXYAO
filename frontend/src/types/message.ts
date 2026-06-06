export interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface CreateMessageInput {
  name: string;
  email: string;
  message: string;
}
