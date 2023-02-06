import css from "./Wrapper.module.css";
import { useThemeContext } from "contexts/theme";

const Wrapper = ({ children }) => {
  const { themeLight } = useThemeContext();

  return (
    <div
      style={{ backgroundColor: themeLight ? "#fff" : "#000" }}
      className={css.wrap}
    >
      {children}
    </div>
  );
};

export default Wrapper;
