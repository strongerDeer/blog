export interface UserDataInterface {
  uid: string | null;
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
}

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
