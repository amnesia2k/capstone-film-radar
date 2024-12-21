import { skeletonCard } from "@/assets";

const CardSkeleton = () => {
  return (
    <div>
      <img src={skeletonCard} className="animate-pulse" alt="card-skeleton" />
    </div>
  );
};

export default CardSkeleton;
