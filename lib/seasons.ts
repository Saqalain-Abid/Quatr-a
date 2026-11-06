export type Season = {
  slug: string;
  n: string;
  name: string;
  months: string;
  perfume: string;
  line: string;
  story: string;
  img: string;
  accent: string;
  top: string[];
  heart: string[];
  base: string[];
};

export const seasons: Season[] = [
  {
    slug: "spring", n: "01", name: "Spring", months: "March — May", perfume: "Primeur",
    line: "The first morning the windows stay open.",
    story: "Rain on warm stone, a plum tree in bloom, green stems snapped between the fingers. Primeur smells like a beginning you did not plan.",
    img: "/images/spring.jpg", accent: "#f0a7bd",
    top: ["Green pear", "Rhubarb"], heart: ["Plum blossom", "Lily of the valley"], base: ["White musk", "Cedar"],
  },
  {
    slug: "summer", n: "02", name: "Summer", months: "June — August", perfume: "Méridienne",
    line: "Noon light on salt skin.",
    story: "Apricot warmed on a sun-hot terrace, fig leaves, a swim that runs long past dinner. Méridienne is bright, golden and a little reckless.",
    img: "/images/summer.jpg", accent: "#ffbf4d",
    top: ["Bergamot", "Apricot"], heart: ["Fig leaf", "Orange blossom"], base: ["Ambergris", "Sandalwood"],
  },
  {
    slug: "autumn", n: "03", name: "Autumn", months: "September — November", perfume: "Ambrée Noire",
    line: "Woodsmoke, wool and the last of the plums.",
    story: "Leaf mould, roasted chestnut, a coat that still smells of last night's fire. Ambrée Noire is dense and slow, made for early dark.",
    img: "/images/autumn.jpg", accent: "#e0872f",
    top: ["Plum", "Pink pepper"], heart: ["Chestnut", "Smoked tea"], base: ["Amber", "Oakmoss", "Vetiver"],
  },
  {
    slug: "winter", n: "04", name: "Winter", months: "December — February", perfume: "Givre",
    line: "Breath you can see, and quiet.",
    story: "Frost on young pine, juniper, a candle across a snowed-in room. Givre is clear and still, with a soft, warm centre.",
    img: "/images/winter.jpg", accent: "#9cc3e6",
    top: ["Juniper", "Frozen mint"], heart: ["Iris", "Incense"], base: ["Benzoin", "Vanilla", "White woods"],
  },
];

export const getSeason = (slug: string) => seasons.find((s) => s.slug === slug);
export const HERO_IMG = "/images/hero.jpg";
