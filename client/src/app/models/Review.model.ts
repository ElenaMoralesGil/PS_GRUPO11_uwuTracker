import Review from "../schemas/Review.schema";
import Content from "../schemas/Content.schema";

export default interface Reviews {
  findById: (id: string | null) => Promise<Review> | null;
  createReview: (userId: string , content: string, score: number, title: string, description: string) => Promise<Review> | null;
  deleteReview: (id: string) => Promise<void> | null;
  editReview: (id: string, user: string, content:string, title: string, description: string, score?: number) => Promise<void> | null;
  fetchReviewsByIds: (reviewIds: string[]) => Promise<Review[]> | null;
  getTitle: (id: string) => Promise<string>
  getDescription: (id: string) => Promise<string>
  getScore: (id: string) => Promise<number>
  getUser: (id: string) => Promise<string>
  getContent: (id: string) => Promise<string>
  getLikes: (id: string) => Promise<number>
  getDislikes: (id: string) => Promise<number>
}
