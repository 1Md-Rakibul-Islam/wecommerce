import { Review } from '@/types/product';
import { StarRating } from '@/components/products/star-rating';
import { formatDate } from '@/lib/format';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';

interface ReviewListProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

export function ReviewList({ reviews, rating, reviewCount }: ReviewListProps) {
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { star, count, percentage };
  });

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-[200px_1fr] gap-8 pb-8 border-b border-border">
        <div className="text-center md:text-left">
          <div className="text-4xl font-bold">{rating.toFixed(1)}</div>
          <StarRating rating={rating} size={20} className="mt-2 justify-center md:justify-start" />
          <p className="text-sm text-muted-foreground mt-2">
            Based on {reviewCount} reviews
          </p>
        </div>
        <div className="space-y-2">
          {ratingDistribution.map(({ star, count, percentage }) => (
            <div key={star} className="flex items-center gap-3">
              <span className="text-sm font-medium w-12">{star} stars</span>
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-8 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="pb-6 border-b border-border/60 last:border-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{review.author}</span>
                  {review.verified && (
                    <Badge variant="secondary" className="text-xs font-normal">
                      <CheckCircle2 size={12} className="mr-1 text-success" />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <StarRating rating={review.rating} size={14} />
                  <span className="text-xs text-muted-foreground">
                    {formatDate(review.date)}
                  </span>
                </div>
              </div>
            </div>
            <h4 className="font-medium mt-3">{review.title}</h4>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
