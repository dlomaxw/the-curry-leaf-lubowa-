// Bombay Adda drinks menu — transcribed from the printed bar menu.
// All prices inclusive of VAT.

export interface BarDrink {
  name: string;
  /** Simple single price, in UGX. */
  price?: number;
  /** Used when pricing isn't a single number (glass/bottle, single/double, a range). */
  priceLabel?: string;
  description?: string;
}

export interface BarSubcategory {
  label: string;
  items: BarDrink[];
}

export interface BarCategory {
  id: string;
  label: string;
  blurb?: string;
  items?: BarDrink[];
  subcategories?: BarSubcategory[];
  note?: string;
}

export interface BarOffer {
  name: string;
  includes: string;
  priceLabel: string;
}

export const barOffers: BarOffer[] = [
  {
    name: "Beer & Curry",
    includes: "Chicken Curry or Dal + rice or naan + selected beer",
    priceLabel: "UGX 35,000",
  },
  {
    name: "Match Bucket",
    includes: "5 selected beers for the price of 4",
    priceLabel: "UGX 40,000–48,000 depending on beer",
  },
  {
    name: "Match Platter",
    includes:
      "Indian Tapas for 2–3: Chicken Tikka, Chicken Lollipops, Samosas, Onion Bhaji, Okra Fries + chutneys",
    priceLabel: "UGX 65,000",
  },
  {
    name: "Happy Hour",
    includes: "Buy One Get One Free on selected cocktails and drinks",
    priceLabel: "6:00–8:00pm",
  },
];

export interface BarScheduleRow {
  date: string;
  day: string;
  time: string;
  event: string;
  offer: string;
  isQuiz?: boolean;
  isBigMatch?: boolean;
}

// Live sports & events schedule, with the matching Bombay Adda offer for that slot.
export const barSchedule: BarScheduleRow[] = [
  { date: "21 Aug", day: "Fri", time: "10:00pm", event: "Arsenal v Coventry", offer: "Beer + Curry" },
  { date: "22 Aug", day: "Sat", time: "2:30pm", event: "Hull v Man United", offer: "Beer Bucket + Match Platter" },
  { date: "22 Aug", day: "Sat", time: "7:30pm", event: "Brentford v Spurs", offer: "Beer Bucket + Match Platter" },
  { date: "23 Aug", day: "Sun", time: "4:00pm", event: "Man City v Bournemouth", offer: "Beer + Curry" },
  { date: "23 Aug", day: "Sun", time: "6:30pm", event: "Newcastle v Liverpool", offer: "Beer Bucket + Match Platter" },
  { date: "24 Aug", day: "Mon", time: "10:00pm", event: "Fulham v Chelsea", offer: "Beer + Curry" },
  { date: "26 Aug", day: "Wed", time: "7:30pm", event: "Bombay Adda Quiz Night", offer: "Happy Hour + Quiz Prizes", isQuiz: true },
  { date: "28 Aug", day: "Fri", time: "10:00pm", event: "Crystal Palace v Man City", offer: "Beer + Curry" },
  { date: "29 Aug", day: "Sat", time: "2:30pm", event: "Liverpool v Nottingham Forest", offer: "Beer Bucket + Match Platter" },
  { date: "29 Aug", day: "Sat", time: "7:30pm", event: "Spurs v Newcastle", offer: "Beer Bucket + Match Platter" },
  { date: "30 Aug", day: "Sun", time: "4:00pm", event: "Chelsea v Brighton", offer: "Beer + Curry" },
  { date: "30 Aug", day: "Sun", time: "6:30pm", event: "Man United v Ipswich", offer: "Beer Bucket + Match Platter" },
  { date: "31 Aug", day: "Mon", time: "10:00pm", event: "Aston Villa v Arsenal", offer: "Beer + Curry" },
  { date: "2 Sep", day: "Wed", time: "7:30pm", event: "Bombay Adda Quiz Night", offer: "Happy Hour + Quiz Prizes", isQuiz: true },
  { date: "4 Sep", day: "Fri", time: "10:00pm", event: "Ipswich v Liverpool", offer: "Beer + Curry" },
  { date: "6 Sep", day: "Sun", time: "4:00pm", event: "Everton v Man United", offer: "Beer Bucket + Match Platter" },
  { date: "6 Sep", day: "Sun", time: "6:30pm", event: "Arsenal v Chelsea", offer: "Big Match Special", isBigMatch: true },
  { date: "9 Sep", day: "Wed", time: "7:30pm", event: "Bombay Adda Quiz Night", offer: "Happy Hour + Quiz Prizes", isQuiz: true },
  { date: "12 Sep", day: "Sat", time: "5:00pm", event: "Liverpool v Fulham", offer: "Beer Bucket + Match Platter" },
  { date: "13 Sep", day: "Sun", time: "6:30pm", event: "Man United v Man City – Derby", offer: "Big Match Special", isBigMatch: true },
  { date: "16 Sep", day: "Wed", time: "7:30pm", event: "Bombay Adda Quiz Night", offer: "Happy Hour + Quiz Prizes", isQuiz: true },
  { date: "18 Sep", day: "Fri", time: "10:00pm", event: "Brentford v Chelsea", offer: "Beer + Curry" },
  { date: "19 Sep", day: "Sat", time: "2:30pm", event: "Spurs v Aston Villa", offer: "Beer Bucket + Match Platter" },
  { date: "19 Sep", day: "Sat", time: "5:00pm", event: "Brighton v Arsenal", offer: "Beer + Curry" },
  { date: "20 Sep", day: "Sun", time: "4:00pm", event: "Bournemouth v Liverpool", offer: "Beer Bucket + Match Platter" },
  { date: "20 Sep", day: "Sun", time: "6:30pm", event: "Fulham v Man United", offer: "Beer + Curry" },
  { date: "23 Sep", day: "Wed", time: "7:30pm", event: "Bombay Adda Quiz Night", offer: "Happy Hour + Quiz Prizes", isQuiz: true },
];

export const barCategories: BarCategory[] = [
  {
    id: "signature-cocktails",
    label: "Signature Cocktails",
    items: [
      { name: "Margarita", price: 32000, description: "Gin, citrus, honey and warming cardamom." },
      { name: "Mango Chilli Margarita", price: 34000, description: "Tequila, mango, chilli and lime." },
      { name: "Masala Espresso Martini", price: 32000, description: "Vodka, espresso and chai spice." },
      { name: "Bombay Adda Old Fashioned", price: 38000, description: "Spiced whisky old fashioned." },
      { name: "Monsoon Martini", price: 32000, description: "Passion fruit, ginger, lime and cardamom." },
    ],
  },
  {
    id: "classic-cocktails",
    label: "Classic Cocktails",
    items: [
      { name: "Mojito", price: 32000, description: "White rum, mint, lime and soda." },
      { name: "Margarita", price: 30000, description: "Tequila, triple sec and lime." },
      { name: "Espresso Martini", price: 30000, description: "Vodka, coffee liqueur and espresso." },
      { name: "Whisky Sour", price: 30000, description: "Whisky, lemon and sugar." },
      { name: "Old Fashioned", price: 30000, description: "Whisky, bitters and a touch of sweetness." },
    ],
  },
  {
    id: "mocktails",
    label: "Mocktails",
    items: [
      { name: "Mango Mint Cooler", price: 18000, description: "Refreshing mango, mint and citrus." },
      { name: "Watermelon Refresher", price: 18000, description: "Watermelon, lime and mint." },
      { name: "Ginger Lemon Fizz", price: 18000, description: "Zesty lemon, warming ginger and sparkling soda." },
      { name: "Virgin Mojito", price: 18000, description: "Fresh mint, lime and soda." },
    ],
  },
  {
    id: "indian-favourites",
    label: "Indian Favourites",
    items: [
      { name: "Mango Lassi", price: 15000 },
      { name: "Sweet Lassi", price: 15000 },
      { name: "Salted Lassi", price: 15000 },
      { name: "Fresh Lime Soda", price: 12000, description: "Sweet, salted or mixed." },
      { name: "Masala Chai", price: 10000, description: "Traditional Indian tea brewed with milk and aromatic spices." },
    ],
  },
  {
    id: "fresh-juices",
    label: "Fresh Juices",
    items: [
      { name: "Pineapple", price: 14000 },
      { name: "Watermelon", price: 14000 },
      { name: "Mango", price: 15000 },
      { name: "Passion", price: 15000 },
      { name: "Pineapple & Mint", price: 15000 },
      { name: "Mixed Fruit Juice", price: 16000 },
    ],
  },
  {
    id: "milkshakes",
    label: "Milkshakes",
    items: [
      { name: "Vanilla", price: 18000 },
      { name: "Chocolate", price: 18000 },
      { name: "Strawberry", price: 18000 },
    ],
  },
  {
    id: "beers-ciders",
    label: "Beers & Ciders",
    items: [
      { name: "Bell Lager", price: 9000 },
      { name: "Nile Special", price: 9000 },
      { name: "Club", price: 9000 },
      { name: "Tusker Malt", price: 9000 },
      { name: "Tusker Lite", price: 9000 },
      { name: "Heineken", price: 15000 },
      { name: "Guinness Stout", price: 10000 },
      { name: "Tusker Cider", price: 10000 },
      { name: "Smirnoff Ice (Black)", price: 10000 },
    ],
  },
  {
    id: "soft-drinks-mixers",
    label: "Soft Drinks & Mixers",
    items: [
      { name: "Soda", price: 5000 },
      { name: "Diet Soda", price: 5000 },
      { name: "Mineral Water", price: 5000 },
      { name: "Soda Water", price: 5000 },
      { name: "Tonic Water", price: 5000 },
      { name: "Red Bull", price: 12000 },
    ],
  },
  {
    id: "wine",
    label: "Wine",
    subcategories: [
      {
        label: "White",
        items: [
          { name: "Four Cousins Sweet White", priceLabel: "Glass UGX 18,000 · Bottle UGX 95,000" },
          { name: "KWV Chenin Blanc", priceLabel: "Glass UGX 20,000 · Bottle UGX 110,000" },
          { name: "Nederburg Chardonnay", priceLabel: "Glass UGX 22,000 · Bottle UGX 125,000" },
        ],
      },
      {
        label: "Red",
        items: [
          { name: "Four Cousins Sweet Red", priceLabel: "Glass UGX 18,000 · Bottle UGX 95,000" },
          { name: "KWV Merlot", priceLabel: "Glass UGX 20,000 · Bottle UGX 115,000" },
          { name: "Nederburg Cabernet Sauvignon", priceLabel: "Glass UGX 22,000 · Bottle UGX 130,000" },
        ],
      },
      {
        label: "Rosé",
        items: [{ name: "Excelsior Rosé", priceLabel: "Glass UGX 20,000 · Bottle UGX 110,000" }],
      },
      {
        label: "Sparkling",
        items: [
          { name: "Sign Giuseppe Prosecco White", priceLabel: "Bottle UGX 140,000" },
          { name: "Sign Giuseppe Prosecco Rosé", priceLabel: "Bottle UGX 150,000" },
          { name: "Moët & Chandon Champagne", priceLabel: "Bottle UGX 500,000" },
        ],
      },
    ],
  },
  {
    id: "spirits",
    label: "Spirits",
    note: "Spirits available as Single (30ml) / Double (60ml).",
    subcategories: [
      {
        label: "House Pour",
        items: [
          { name: "Gordon's Gin", price: 10000 },
          { name: "Smirnoff Vodka", price: 10000 },
          { name: "Johnnie Walker Red", price: 10000 },
          { name: "Bacardi White Rum", price: 10000 },
        ],
      },
      {
        label: "Premium",
        items: [
          { name: "Bombay Sapphire Gin", price: 12000 },
          { name: "Absolut Vodka", price: 12000 },
          { name: "Jameson Whiskey", price: 12000 },
          { name: "Olmeca Blanco Tequila", price: 12000 },
        ],
      },
      {
        label: "Reserve",
        items: [
          { name: "Grey Goose Vodka", price: 15000 },
          { name: "Johnnie Walker Black", price: 15000 },
          { name: "Glenfiddich 12 Year", price: 20000 },
          { name: "Martell VS Cognac", price: 22000 },
        ],
      },
      {
        label: "Liqueurs",
        items: [
          { name: "Baileys", price: 15000 },
          { name: "Kahlúa", price: 12000 },
          { name: "Campari", price: 10000 },
          { name: "Aperol", price: 12000 },
        ],
      },
    ],
  },
  {
    id: "hot-drinks",
    label: "Hot Drinks",
    items: [
      { name: "Masala Chai", price: 10000 },
      { name: "English Breakfast Tea", price: 10000 },
      { name: "Hot Chocolate", price: 14000 },
      { name: "Americano", price: 12000 },
      { name: "Espresso", priceLabel: "UGX 8,000 / 10,000", description: "Single / Double" },
      { name: "Cappuccino", priceLabel: "UGX 12,000 / 14,000", description: "Single / Double" },
      { name: "Latte", priceLabel: "UGX 12,000 / 14,000", description: "Single / Double" },
      { name: "Irish Coffee", price: 26000 },
    ],
  },
];
