import hiveLogo from "../assets/hive-logo-nav.png";
import menuIcon from "../assets/menu-icon.png";

export default function MobileNavigation() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 text-white py-4 px-[30px] flex justify-between bg-[#2B2B2B]/80 backdrop-blur-sm">
      <img className="h-6 w-6" src={hiveLogo.src} alt="Hive logo" />
      <img className="h-6 w-6 cursor-pointer" src={menuIcon.src} alt="Menu icon" />
    </div>
  );
}
