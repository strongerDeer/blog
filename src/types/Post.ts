import { CategoryType } from './Category';
import { CommentsInterface } from './Comments';

export interface PostInterface {
  id?: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createdAt: string;
  updateAt: string;
  uid: string;
  category: CategoryType;
  comments: CommentsInterface[];
  commentsCount?: number;
  imgUrl: string;

  like?: string;
  likeCount?: number;
  hashTags?: string[];
}
