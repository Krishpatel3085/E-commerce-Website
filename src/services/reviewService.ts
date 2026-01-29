import api from '../api/config';

export interface Review {
  _id: string;
  productId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  images: File[]; // New field
  createdAt: string;
}


export const reviewService = {
  getReviewsByProduct: async (productId: string): Promise<Review[]> => {
    const response = await api.get(`api/review/product-reviews/${productId}`);
    console.log('Fetched reviews:', response.data);
    return response.data.data;
  },

  submitReview: async (reviewData: Partial<Review>) => {
    console.log('Submitted review data:', reviewData,);

    const response = await api.post('api/review/add-review', reviewData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};


