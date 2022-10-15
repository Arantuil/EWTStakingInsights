module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'np1': '400px',
        'np2': '500px',
        'np3': '600px',
        'np4': '800px',
        'np5': '900px',
        'np6': '1000px',
        'np7': '1050px',
        'xs': {'max': '400px'},
        '2xs': {'max': '350px'},
        '3xs': {'max': '300px'},
      },
      animation: {
        'pingslow': 'ping 4s cubic-bezier(0, 0, 0.2, 1) infinite'
      },
      colors: {
        bgprimary: 'rgb(255,255,252)',
        bgsecondary: 'rgb(248,248,245)',
        textprimary: '#05050c',
        textaccent: '#2b6cb0',
        accent1: 'rgb(90, 229, 103)',
        accent2: 'rgb(68, 190, 212)',
        accent3: 'rgb(166, 101, 250)',

        darkbgprimary: 'rgb(15,23,35)',
        darkbgsecondary: 'rgb(13,19,32)',
        darktextprimary: '#F5F5E6',
        darktextaccent: '#81e6d9',
        darkaccent1: 'rgb(54, 139, 62)',
        darkaccent2: 'rgb(41, 115, 128)',
        darkaccent3: 'rgb(100, 61, 151)',
      },
      backgroundImage: {
        'backgroundimagepage': 'url("./assets/images/backgroundoverlaycolors.png")',
      }
    }
  },
  plugins: [],
}
