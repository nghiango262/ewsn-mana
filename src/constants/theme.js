const colors = {
    primary: "#0AC4BA",
    secondary: "#2BDA8E",
    accent: "#F3534A",
    tertiary: "#FFE358",
    black: "#323643",
    white: "#FFFFFF",
    gray: "#9DA3B4",
    gray2: "#C5CCD6",
  };
  
  const sizes = {
    // global sizes
    base: 16,
    font: 14,
    radius: 6,
    padding: 25,
  
    // font sizes
    h1: 26,
    h2: 20,
    h3: 18,
    title: 18,
    header: 16,
    body: 14,
    caption: 12,
  };

  const metric = {
    icons: {
      tiny: 18,
      small: 24,
      large: 35
    }
  };
  
  const fonts = {
    h1: {
      fontSize: sizes.h1
    },
    h2: {
      fontSize: sizes.h2
    },
    h3: {
      fontSize: sizes.h3
    },
    header: {
      fontSize: sizes.header
    },
    title: {
      fontSize: sizes.title
    },
    body: {
      fontSize: sizes.body
    },
    caption: {
      fontSize: sizes.caption
    },
  };
  
  export { colors, sizes, fonts, metric };