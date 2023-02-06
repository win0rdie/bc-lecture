import { useState } from "react";

import { Wrapper } from "components";
import ControlledForm from "components/ControlledForm/ControlledForm";
import Header from "components/Header/Header";
import News from "components/News/News";
import { ThemeContext } from "contexts/theme";

export const App = () => {
  const [themeLight, setThemeLight] = useState(false);
  const toggleTheme = () => setThemeLight((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ themeLight, toggleTheme }}>
      <Header />
      <Wrapper themeLight={themeLight}>
        <ControlledForm />
        <News />
      </Wrapper>
    </ThemeContext.Provider>
  );
};
