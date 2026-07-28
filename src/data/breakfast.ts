// Bombay Adda breakfast menu — transcribed from the printed menu.
// All prices inclusive of VAT.

export type BreakfastCategoryId =
  | "signature"
  | "indian"
  | "eggs-brunch"
  | "sweet"
  | "baps-wraps"
  | "combos"
  | "drinks";

export interface BreakfastChoice {
  label: string;
  options: string[];
}

export interface BreakfastItem {
  id: string;
  name: string;
  category: BreakfastCategoryId;
  price: number;
  /** Set when the price varies by selection — the final price is confirmed by the team. */
  priceMax?: number;
  description?: string;
  includes?: string[];
  choices?: BreakfastChoice[];
}

export const breakfastCategories: {
  id: BreakfastCategoryId;
  label: string;
  blurb?: string;
}[] = [
  {
    id: "signature",
    label: "Signature Breakfasts",
    blurb: "Full plates to start the day properly.",
  },
  {
    id: "indian",
    label: "Indian Breakfasts",
    blurb: "Desi mornings, Kampala style.",
  },
  { id: "eggs-brunch", label: "Eggs & Brunch" },
  { id: "sweet", label: "Sweet Breakfasts" },
  { id: "baps-wraps", label: "Breakfast Baps & Wraps" },
  {
    id: "combos",
    label: "Grab & Go Combos",
    blurb: "Main plus a drink — in and out in minutes.",
  },
  { id: "drinks", label: "Morning Favourites" },
];

const COMBO_DRINKS_BASIC = ["Tea", "Americano", "Bottled Water"];
const COMBO_DRINKS_CHAI = ["Tea", "Americano", "Masala Chai"];
const COMBO_DRINKS_FULL = [
  "Tea",
  "Americano",
  "Cappuccino",
  "Latte",
  "Masala Chai",
];

export const breakfastItems: BreakfastItem[] = [
  // Signature breakfasts
  {
    id: "kampala-breakfast",
    name: "The Kampala Breakfast",
    category: "signature",
    price: 42000,
    description:
      "A generous breakfast platter bringing together local favourites and international classics.",
    includes: [
      "Eggs",
      "Sausages",
      "Bacon",
      "Toast",
      "Plantain",
      "Baked Beans",
      "Grilled Tomato",
      "Hot Drink",
    ],
  },
  {
    id: "bombay-adda-breakfast",
    name: "Bombay Adda Breakfast",
    category: "signature",
    price: 35000,
    description:
      "A vibrant Indian-style breakfast packed with flavour and café charm.",
    includes: ["Masala Omelette", "Aloo Paratha", "Pickle", "Masala Chai"],
  },
  {
    id: "curry-leaf-breakfast",
    name: "Curry Leaf Breakfast",
    category: "signature",
    price: 38000,
    description: "A comforting Indian breakfast perfect with a hot cup of chai.",
    includes: [
      "2 Parathas",
      "Egg Bhurji (scrambled)",
      "Salad",
      "Plantain or Sweet Potatoes",
      "Masala Chai",
    ],
  },

  // Indian breakfasts
  {
    id: "bombay-rolex",
    name: "Bombay Rolex",
    category: "indian",
    price: 20000,
    description:
      "Uganda's favourite street food infused with Indian spices and bold desi flavours.",
  },
  {
    id: "parathas",
    name: "Parathas",
    category: "indian",
    price: 15000,
    priceMax: 20000,
    description: "Served with pickle and yoghurt.",
    choices: [
      {
        label: "Filling",
        options: [
          "Aloo (Potato)",
          "Paneer",
          "Onion",
          "Gobi (Cauliflower)",
          "Mixed Vegetable",
        ],
      },
    ],
  },

  // Eggs & brunch
  {
    id: "shakshuka",
    name: "Shakshuka",
    category: "eggs-brunch",
    price: 32000,
    description:
      "Eggs gently poached in a rich spiced tomato and pepper sauce, served with toasted bread.",
  },
  {
    id: "avocado-toast",
    name: "Avocado Toast",
    category: "eggs-brunch",
    price: 28000,
    description:
      "Crispy toast topped with creamy avocado and perfectly cooked eggs.",
  },
  {
    id: "hearty-start",
    name: "Hearty Start",
    category: "eggs-brunch",
    price: 35000,
    description:
      "Spanish omelette served with creamy spinach, avocado, artisan bread and homemade jam.",
  },
  {
    id: "rolex-plate",
    name: "Rolex Plate",
    category: "eggs-brunch",
    price: 25000,
    description: "A plated version of Uganda's favourite breakfast.",
    includes: ["Eggs", "Chapati", "Kachumbari", "Avocado"],
  },

  // Sweet breakfasts
  {
    id: "seasonal-fruit-pancakes",
    name: "Seasonal Fruit Pancakes",
    category: "sweet",
    price: 28000,
    description:
      "Fluffy pancakes served with seasonal fruit and maple flavour syrup.",
  },
  {
    id: "french-toast",
    name: "French Toast",
    category: "sweet",
    price: 28000,
    description:
      "Golden French toast served with seasonal fruit, maple syrup and whipped cream.",
  },
  {
    id: "tropical-fruit-plate",
    name: "Tropical Fruit Plate",
    category: "sweet",
    price: 20000,
    description:
      "A vibrant selection of Uganda's finest seasonal fruits, freshly prepared and served chilled.",
  },

  // Baps & wraps
  {
    id: "breakfast-wrap",
    name: "Breakfast Wrap",
    category: "baps-wraps",
    price: 22000,
    includes: ["Egg", "Chicken", "Cheese", "House Sauce", "Tortilla Wrap"],
  },
  {
    id: "bacon-bap",
    name: "Bacon Bap",
    category: "baps-wraps",
    price: 18000,
    includes: ["Crispy Bacon", "House Sauce", "Soft Bun"],
  },
  {
    id: "sausage-bap",
    name: "Sausage Bap",
    category: "baps-wraps",
    price: 18000,
    includes: ["Breakfast Sausage", "House Sauce", "Soft Bun"],
  },
  {
    id: "bacon-egg-bap",
    name: "Bacon & Egg Bap",
    category: "baps-wraps",
    price: 20000,
    includes: ["Bacon", "Egg", "House Sauce", "Soft Bun"],
  },
  {
    id: "sausage-egg-bap",
    name: "Sausage & Egg Bap",
    category: "baps-wraps",
    price: 20000,
    includes: ["Breakfast Sausage", "Egg", "House Sauce", "Soft Bun"],
  },
  {
    id: "egg-cheese-bap",
    name: "Egg & Cheese Bap",
    category: "baps-wraps",
    price: 18000,
    includes: ["Egg", "Cheese", "House Sauce", "Soft Bun"],
  },

  // Grab & go combos
  {
    id: "quick-bite-combo",
    name: "Quick Bite Combo",
    category: "combos",
    price: 12000,
    description: "Choose 1 main and 1 drink.",
    choices: [
      { label: "Main", options: ["Vegetable Samosa", "Aloo Paratha Roll"] },
      { label: "Drink", options: COMBO_DRINKS_BASIC },
    ],
  },
  {
    id: "breakfast-combo",
    name: "Breakfast Combo",
    category: "combos",
    price: 25000,
    description: "Choose 1 main and 1 drink.",
    choices: [
      {
        label: "Main",
        options: [
          "Rolex",
          "Bombay Rolex",
          "Bacon Bap",
          "Sausage Bap",
          "Egg & Cheese Bap",
        ],
      },
      { label: "Drink", options: COMBO_DRINKS_CHAI },
    ],
  },
  {
    id: "breakfast-wrap-combo",
    name: "Breakfast Wrap Combo",
    category: "combos",
    price: 28000,
    description: "Breakfast Wrap plus 1 drink.",
    choices: [{ label: "Drink", options: COMBO_DRINKS_FULL }],
  },

  // Morning favourites
  { id: "masala-chai", name: "Masala Chai", category: "drinks", price: 10000 },
  {
    id: "english-breakfast-tea",
    name: "English Breakfast Tea",
    category: "drinks",
    price: 10000,
  },
  { id: "americano", name: "Americano", category: "drinks", price: 12000 },
  { id: "cappuccino", name: "Cappuccino", category: "drinks", price: 12000 },
  { id: "latte", name: "Latte", category: "drinks", price: 12000 },
  { id: "chai-latte", name: "Chai Latte", category: "drinks", price: 16000 },
  { id: "golden-latte", name: "Golden Latte", category: "drinks", price: 16000 },
  { id: "fresh-juice", name: "Fresh Juice", category: "drinks", price: 14000 },
];

/** Pickup/delivery slots offered during breakfast service. */
export const breakfastSlots = [
  "7:00 am",
  "7:30 am",
  "8:00 am",
  "8:30 am",
  "9:00 am",
  "9:30 am",
  "10:00 am",
  "10:30 am",
  "11:00 am",
];
