/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#061627',
        blue: '#0b4ea2',
        line: '#dbe7f4',
        ink: '#0f172a',
        muted: '#64748b',
        green: '#16a34a',
        amber: '#f59e0b',
        red: '#dc2626',
        canvas: '#eef5fb',
        // role accent colors (radar polygons)
        'role-dept': '#2563eb',
        'role-admin': '#d97706',
        'role-exec': '#7c3aed',
      },
      fontFamily: {
        sans: ['Pretendard', '"Noto Sans KR"', 'system-ui', 'sans-serif'],
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
        '3xl': '24px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(6,22,39,.04), 0 8px 24px rgba(6,22,39,.06)',
        float: '0 18px 50px rgba(6,22,39,.12)',
        header: '0 8px 30px rgba(11,78,162,.25)',
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
