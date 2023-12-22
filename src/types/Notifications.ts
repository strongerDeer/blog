export interface NotificationsInterface {
  id: string;
  uid: string;
  url: string;
  createdAt: string;
  isRead: boolean;
  type: string;
  content: string;
  author?: string;
  post?: string;
}
