import Review from "../schemas/Review.schema";

export default interface Reviews {
  findById: (id: string) => Promise<Review> | null
  create: (review: Review) => Promise<Review> | null
}
