import Review from "../schemas/Review.schema";

export default interface IReviews {
  createReview: (userId: string , content: string, score: number, title: string, description: string) => Promise<Review> | null;
  deleteReview: (id: string) => Promise<void> | null;
  editReview: (id: string, user: string, content:string, title: string, description: string, score?: number) => Promise<void> | null;
  likeReview: (id: string, userId: string) => Promise<void> | null;
  dislikeReview: (id: string, userId: string) => Promise<void> | null;
}
