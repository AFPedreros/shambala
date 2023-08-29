import {
  Roboto as FontHeading,
  JetBrains_Mono as FontMono,
  Roboto as FontSans,
} from "next/font/google"

export const fontSans = FontSans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const fontHeading = FontHeading({
  weight: "900",
  subsets: ["latin"],
  variable: "--font-heading",
})
