import ThemeSwitcher from "components/ThemeSwitcher/ThemeSwitcher";
import css from "./Header.module.css";

const Header = () => {
  return (
    <div className={css.container}>
      <h2>Context</h2>
      <ThemeSwitcher />
    </div>
  );
};

export default Header;
