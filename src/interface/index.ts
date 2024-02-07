export interface UserDataInterface {
  uid?: string | null;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  provider?: string | null;
  followingList?: string[] | null;
  followerList?: string[] | null;
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

export interface PostInterface {
  id?: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createdAt: string;
  updateAt: string;
  uid: string;
  // category: CategoryType;
  comments: CommentsInterface[];
  commentsCount?: number;
  imgUrl: string;
  like?: string;
  likeCount?: number;
  hashTags?: string[];
}

export interface FollowInterface {
  uid: string;
  id?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
}

export interface CommentsInterface {
  content: string;
  uid: string;
  email: string;
  nickname: string;
  profileURL: string;
  createdAt: string;
}
