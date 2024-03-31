import Review from "../schemas/Review.schema";
import Content from "../schemas/Content.schema";

export default interface Reviews {
  findById: (id: string | null) => Promise<Review> | null;
  createReview: (userId: string , content: string, score: number, title: string, description: string) => Promise<Review> | null;
  deleteReview: (id: string) => Promise<void> | null;
  editReview: (id: string,  title: string, description: string, score?: number) => Promise<void> | null;
  fetchReviewsByIds: (reviewIds: string[]) => Promise<Review[]> | null;
}
