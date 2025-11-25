import createIconSet from "@expo/vector-icons/createIconSet";
export const glyphMap = {
  // tab
  "home-fill": 59479,
  "company-fill": 59471,
  "customization-fill": 59474,
  "global-fill": 59478,
  "customer-businessman-fill": 59431,

  // 首页菜单
  "export-service": 59480,
  "money-currency-converter-fill": 59440,
  "product-list-fill": 59443,
  "live-fill": 59484,
  "name-card-fill": 59485,
  "customer-group-fill": 59432,
};
interface CustomIconProps {
  name?: keyof typeof glyphMap;
  size?: number;
  color?: string;
}
const CustomIcon: React.FC<CustomIconProps> = ({
  name = "home-fill",
  size = 20,
  color = "white",
}) => {
  const CustomIcon = createIconSet(
    glyphMap,
    "iconfont",
    require("@assets/fonts/iconfont.ttf")
  );
  return <CustomIcon name={name} size={size} color={color} />;
};

export default CustomIcon;
