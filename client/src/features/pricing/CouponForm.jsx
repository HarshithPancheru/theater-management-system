import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Alert from "../../components/Alert/Alert";
import { useState } from "react";
import { applyCoupon } from "./PricingAPI";

export default function CouponsForm({ showId, category, onDiscount }) {
  const [couponCode, setCouponCode] = useState("");
  const [result, setResult] = useState(null);

  const handleApply = async () => {
    try {
      const data = await applyCoupon(showId, category, couponCode);
      setResult(data);
      onDiscount(data);
    } catch (err) {
      setResult({ message: "Coupon invalid or expired" });
    }
  };

  return (
    <div className="bg-white border border-[#E5E7EB] p-4 rounded-lg mt-4">
      <h3 className="text-[18px] font-semibold text-[#111827] mb-2">
        Apply Coupon
      </h3>
      <div className="flex gap-2">
        <Input
          value={couponCode}
          onChange={setCouponCode}   
          placeholder="Enter coupon code"
        />
        <Button onClick={handleApply}>Apply</Button>
      </div>

      {result && (
        <Alert type="info" message={result.message}>
          <p>Base Price: ₹{result.basePrice}</p>
          <p>Discount: ₹{result.discountApplied}</p>
          <p>Final Price: ₹{result.finalPrice}</p>
        </Alert>
      )}
    </div>
  );
}
