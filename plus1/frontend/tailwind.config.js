/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // cord.com "deep ocean signal station" palette (DESIGN_edit.md)
        navy: '#0b3658', // Midnight Harbor — primary text, headings, dark CTA banner
        blue: '#4e9ad9', // Signal Blue — primary action, logo, active states
        line: '#dde7ee', // Sea Fog — borders, hairlines, dividers
        ink: '#0b3658', // primary text — navy is the voice, never pure black
        muted: '#486984', // Slate Channel — secondary text, muted icon strokes
        canvas: '#f1f7fc', // barely-there blue wash so white cards float
        green: '#16a34a',
        amber: '#f59e0b',
        red: '#dc2626',
        // extended cord tokens
        signal: '#4e9ad9', // alias of blue for intent clarity
        slate: '#486984', // Slate Channel
        steel: '#688dac', // Pale Steel — tertiary text, meta labels
        fog: '#dde7ee', // Sea Fog (alias of line)
        ice: '#e6f1fa', // Ice Tint — hover surfaces, tinted washes
        mist: '#c8d8e4', // Light Mist — disabled/secondary fill
        teal: '#42b3b1', // Active Teal — status/presence accent only
        // role accent colors (radar polygons)
        'role-dept': '#2563eb',
        'role-admin': '#d97706',
        'role-exec': '#7c3aed',
      },
      fontFamily: {
        // Figtree for latin/display feel, Pretendard for Korean glyphs
        sans: ['Figtree', 'Pretendard', '"Noto Sans KR"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // enforce 12px minimum; base body 14-15px
        xs: ['12px', { lineHeight: '1.5' }],
        sm: ['13px', { lineHeight: '1.55' }],
        base: ['14px', { lineHeight: '1.6' }],
        md: ['15px', { lineHeight: '1.6' }],
        lg: ['17px', { lineHeight: '1.5' }],
        xl: ['20px', { lineHeight: '1.4' }],
        '2xl': ['24px', { lineHeight: '1.3' }],
        '3xl': ['30px', { lineHeight: '1.2', letterSpacing: '-0.03em' }],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px', // cord card radius
        '4xl': '24px', // cord input/button radius
        pill: '35px',
      },
      boxShadow: {
        // blue-tinted elevation — rgba(11,54,88) per cord, never gray shadows
        card: '0 1px 2px rgba(11,54,88,.04), 0 12px 48px rgba(11,54,88,.08)',
        soft: '0 4px 32px rgba(11,54,88,.08)',
        lift: '0 18px 48px rgba(11,54,88,.14)', // card hover-lift elevation
        float: '0 18px 50px rgba(11,54,88,.12)',
        header: '0 8px 30px rgba(11,54,88,.22)',
        focus: '0 0 0 4px rgba(78,154,217,.18)', // signal-blue focus ring/input glow
      },
      transitionTimingFunction: {
        // cord signature reveal/transition curve
        ocean: 'cubic-bezier(.16,1,.3,1)',
      },
      maxWidth: {
        shell: '1440px',
        report: '1050px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'draw': {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .5s cubic-bezier(.16,1,.3,1) both',
        'fade-in': 'fade-in .4s ease both',
        'draw': 'draw .6s cubic-bezier(.16,1,.3,1) both',
      },
    },
  },
  plugins: [],
};
