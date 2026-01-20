import { useEffect, useState } from "react";
import { fetchPricing } from "./PricingAPI";
import Button from "../../components/Button/Button";

export default function ShowPricing({ showId, onCategorySelect }) {
  const [pricing, setPricing] = useState(null);

  useEffect(() => {
    fetchPricing(showId).then(setPricing);
  }, [showId]);

  if (!pricing) return <p>Loading pricing...</p>;

  return (
    <div className="bg-white border border-[#E5E7EB] p-4 rounded-lg">
      <h3 className="text-[18px] font-semibold text-[#111827] mb-2">
        Seat Categories
      </h3>
      <div className="flex flex-wrap gap-3">
        {Object.entries(pricing.prices).map(([category, price]) => (
          <Button key={category} onClick={() => onCategorySelect(category)}>
            {category}: ₹{price} {pricing.currency}
          </Button>
        ))}
      </div>
    </div>
  );
}
