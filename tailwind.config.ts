
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Custom design system colors
				'system-bg-1': 'var(--background-1)',
				'system-bg-2': 'var(--background-2)',
				'mina-bg': 'var(--mina-background)',
				'table-col-1': 'var(--table-column-1)',
				'table-col-2': 'var(--table-column-2)',
				'outline-1': 'var(--outline-1)',
				'outline-2': 'var(--outline-2)',
				'outline-3': 'var(--outline-3)',
				'font-primary': 'var(--font-primary)',
				'font-secondary': 'var(--font-secondary)',
				'font-tertiary': 'var(--font-tertiary)',
				'font-alternate': 'var(--font-alternate)',
				'purple-primary': 'var(--purple-primary)',
				'purple-secondary': 'var(--purple-secondary)',
				'purple-tertiary': 'var(--purple-tertiary)',
				'blue-primary': 'var(--blue-primary)',
				'blue-secondary': 'var(--blue-secondary)',
				'blue-tertiary': 'var(--blue-tertiary)',
				'semantic-info': 'var(--semantic-info)',
				'semantic-confirm': 'var(--semantic-confirm)',
				'semantic-warning': 'var(--semantic-warning)',
				'semantic-error': 'var(--semantic-error)',
				'semantic-focus': 'var(--semantic-focus)',
				'semantic-neutral': 'var(--semantic-neutral)',
				'graph-purple-1': 'var(--graph-purple-1)',
				'graph-purple-2': 'var(--graph-purple-2)',
				'graph-purple-3': 'var(--graph-purple-3)',
				'graph-blue-1': 'var(--graph-blue-1)',
				'graph-blue-2': 'var(--graph-blue-2)',
				'graph-blue-3': 'var(--graph-blue-3)',
				'graph-grey': 'var(--graph-grey)',
			},
			fontFamily: {
				'display-1': 'var(--font-display-1)',
				'display-2': 'var(--font-display-2)',
				'h1': 'var(--font-h1)',
				'h2': 'var(--font-h2)',
				'h3': 'var(--font-h3)',
				'body-1': 'var(--font-body-1)',
				'body-2': 'var(--font-body-2)',
				'poppins': ['Poppins', 'sans-serif'],
				'inter': ['Inter', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in': {
					'0%': { 
						transform: 'translateX(-100%)' 
					},
					'100%': { 
						transform: 'translateX(0)' 
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in': 'slide-in 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
