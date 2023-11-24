import { CategoryType } from './Category';
import { CommentsInterface } from './Comments';

export interface PostInterface {
  id?: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createAt: string;
  updateAt: string;
  uid: string;
  category: CategoryType;
  comments: CommentsInterface[];
  imgUrl: string;

  like?: string;
  likeCount?: number;
  hashTags?: string[];
}
