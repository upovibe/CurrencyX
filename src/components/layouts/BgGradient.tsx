import USD from "@/assets/images/usd-svgrepo-com.png";
import EURO from "@/assets/images/euro-svgrepo-com.png";
import YEN from "@/assets/images/yen-svgrepo-com.png";

const BgGradient = () => {
  return (
    <div className="w-full h-screen flex items-center justify-centerrelative">
    <div className="flex items-center space-x-4">
      <img src={USD} alt="USD" className="absolute top-0 left-20 size-4/12 blur-xl" />
      <img src={EURO} alt="EURO" className="absolute right-10 top-1/2 transform -translate-y-1/2 size-4/12 blur-xl" />
      <img src={YEN} alt="YEN" className="absolute bottom-0 left-20  size-4/12 blur-xl" />
    </div>
  </div>
  )
}

export default BgGradient