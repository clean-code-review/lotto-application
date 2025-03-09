import { useState } from 'react';
import { checkValidPurchasePrice } from '../utils/lotto';

function LottoPurchase({
  onPurchase,
}: {
  onPurchase: (lottoPurchasePrice: number) => void;
}) {
  const [lottoPurchasePrice, setLottoPurchasePrice] = useState(0);

  const handleLottoPurchase = () => {
    const isValidPrice = checkValidPurchasePrice(lottoPurchasePrice);

    if (!isValidPrice) {
      alert('1000원 단위로 입력해주세요.');
      return setLottoPurchasePrice(0);
    }

    onPurchase(lottoPurchasePrice);
  };

  return (
    <div className="input">
      <label htmlFor="lotto-input">로또 구매 금액</label>
      <input
        id="lotto-input"
        type="number"
        value={lottoPurchasePrice}
        onChange={e => setLottoPurchasePrice(parseInt(e.target.value))}
      />
      <button onClick={handleLottoPurchase}>구매</button>
    </div>
  );
}

export default LottoPurchase;
