module.exports = {
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          marmota: {
            primary: '#4361ee',     // Azul principal - cor da marca
            secondary: '#3f37c9',   // Azul escuro para ações secundárias
            light: '#f0f4ff',       // Azul muito claro para backgrounds
            accent: '#4cc9f0',      // Azul turquesa para destaques
            gray: '#6c757d',        // Cinza médio para textos secundários
            dark: '#212529',        // Cinza escuro para textos principais
            surface: '#ffffff',     // Branco para superfícies
          }
        },
        boxShadow: {
          'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          'soft-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    plugins: [],
  }