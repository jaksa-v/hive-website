import hiveLogo from "../assets/hive-logo-nav.png";
import menuIcon from "../assets/menu-icon.png";

export default function MobileNavigation() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 text-white py-2 px-4 flex justify-between items-center bg-[#2B2B2B]/80 backdrop-blur-sm">
      <img className="h-10 w-10" src={hiveLogo.src} alt="Hive logo" />
      <img
        className="h-8 w-8 cursor-pointer"
        src={menuIcon.src}
        alt="Menu icon"
      />
    </div>
  );
}
