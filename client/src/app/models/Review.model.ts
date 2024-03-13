import Review from "../schemas/Review.schema";

export default interface Reviews {

  createReview: (userId: string | undefined, content: string | undefined, score: number | undefined, title: string | undefined, description: string | undefined) => Promise<Review> | null

  deleteReview: (id: string) => Promise<void> | null

  editReview: (id: string | undefined, updatedReview: Review) => Promise<void> | null

  likeReview(id: string | undefined, userId: string | undefined) : Promise<void> | null

  dislikeReview: (id: string | undefined, userId: string | undefined) => Promise<void> | null

}
