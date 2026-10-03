import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
  showValue?: boolean;
}

export function StarRating({ rating, size = 16, className, showValue = false }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const roundUp = rating % 1 >= 0.75;

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {[0, 1, 2, 3, 4].map((i) => {
        const isFull = i < fullStars || (i === fullStars && roundUp);
        const isHalf = i === fullStars && hasHalf;
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Star size={size} className="absolute inset-0 text-muted-foreground/30" fill="currentColor" />
            {(isFull || isHalf) && (
              <Star
                size={size}
                className="absolute inset-0 text-amber-400"
                fill="currentColor"
                style={isHalf ? { clipPath: 'inset(0 50% 0 0)' } : undefined}
              />
            )}
          </span>
        );
      })}
      {showValue && (
        <span className="ml-1 text-sm font-medium text-foreground/80">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
