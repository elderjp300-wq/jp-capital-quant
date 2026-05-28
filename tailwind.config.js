/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        bg: '#000000',
        ink: '#0A0A0F',
        panel: '#0F1116',
        panel2: '#14171F',
        line: 'rgba(255,255,255,0.06)',
        line2: 'rgba(255,255,255,0.10)',
        fg: '#F4F4F5',
        fg2: '#D4D4D8',
        mute: '#71717A',
        dim: '#52525B',
        blue: '#3B82F6',
        blueDeep: '#2563EB',
        green: '#22C55E',
        greenDim: '#16A34A',
        red: '#EF4444',
        redDim: '#DC2626',
        orange: '#F59E0B',
        orangeDim: '#D97706',
      },
    },
  },
  plugins: [],
};
