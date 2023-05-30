export const colorList = ["white", "pink", "red", "orange", "green", "blue", "purple", "brown", "black"] as const;

export const shapeList = ["heart", "diamond", "earth", "home", "key", "lock", "happy face", "sad face"] as const;

export const colorStyles = [
"text-white",
"text-pink-400",
"text-red-600",
"text-orange-600",
"text-green-600",
"text-blue-600",
"text-fuchsia-700",
"text-yellow-800",
"text-black"
] as const;

export const colorPairs = {
  white:"text-white",
  pink:"text-pink-400",
  red:"text-red-600",
  orange:"text-orange-600",
  green:"text-green-600",
  blue:"text-blue-600",
  purple:"text-fuchsia-700",
  brown:"text-yellow-800",
  black:"text-black"
} as const;

export const stylePairsInArrays = [
  ["white","text-white"],
  ["pink","text-pink-400"],
  ["red","text-red-600"],
  ["orange","text-orange-600"],
  ["green","text-green-600"],
  ["blue","text-blue-600"],
  ["purple","text-fuchsia-700"],
  ["brown","text-yellow-800"],
  ["black","text-black"]
  ] as const;