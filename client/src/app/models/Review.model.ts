import Review from "../schemas/Review.schema";

export default interface Reviews {

  createReview: (userId: string | undefined, content: string | undefined, score: number | undefined, title: string | undefined, description: string | undefined) => Promise<Review> | null

  deleteReview: (id: string) => Promise<void> | null

  editReview: (id: string, updatedReview: Review) => Promise<void> | null

  likeReview(id: string, userId: string) : Promise<void> | null

  dislikeReview: (id: string, userId: string) => Promise<void> | null

}
