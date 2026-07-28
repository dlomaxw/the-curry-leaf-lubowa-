export type Dietary = "veg" | "non-veg" | "vegan";
export type Spice = 0 | 1 | 2 | 3;

export interface Dish {
  id: string;
  name: string;
  category: CategoryId;
  price: number; // UGX
  description: string;
  dietary: Dietary;
  spice: Spice;
  featured?: boolean;
  accent?: string; // decorative glow colour for showcase sections
  image?: string; // dish photograph for showcase sections
  containsNuts?: boolean;
  glutenFree?: boolean;
  dairyFree?: boolean;
}

export type CategoryId =
  | "appetisers-veg"
  | "appetisers-nonveg"
  | "veg-curries"
  | "curries"
  | "biryani-rice"
  | "tandoor-breads"
  | "desserts"
  | "thalis";

export const categories: { id: CategoryId; label: string }[] = [
  { id: "appetisers-veg", label: "Vegetarian Appetisers" },
  { id: "appetisers-nonveg", label: "Non-Veg Appetisers" },
  { id: "veg-curries", label: "Vegetarian Curries" },
  { id: "curries", label: "Curries" },
  { id: "biryani-rice", label: "Biryani & Rice" },
  { id: "tandoor-breads", label: "Tandoor Breads" },
  { id: "desserts", label: "Desserts" },
  { id: "thalis", label: "Thali Lunches" },
];

// Prices transcribed from The Curry Leaf launch menu (all inclusive of VAT).
export const dishes: Dish[] = [
  // Vegetarian appetisers
  { id: "onion-bhaji", name: "Onion Bhaji", category: "appetisers-veg", price: 18000, dietary: "veg", spice: 1, glutenFree: false, description: "Crisp golden fritters of sliced onion in spiced gram-flour batter." },
  { id: "paneer-tikka", name: "Paneer Tikka", category: "appetisers-veg", price: 28000, dietary: "veg", spice: 2, description: "Cubes of cottage cheese marinated in yoghurt and spices, charred in the tandoor." },
  { id: "crispy-spinach-chaat", name: "Crispy Spinach Chaat", category: "appetisers-veg", price: 28000, dietary: "veg", spice: 1, description: "Flash-fried spinach leaves with yoghurt, tamarind and pomegranate." },
  { id: "chilli-paneer", name: "Chilli Paneer", category: "appetisers-veg", price: 30000, dietary: "veg", spice: 3, description: "Indo-Chinese favourite — paneer tossed with peppers, soy and green chilli." },
  { id: "okra-fries", name: "Okra Fries", category: "appetisers-veg", price: 22000, dietary: "vegan", spice: 1, description: "Shoestring okra dusted in spiced chickpea flour, fried until crackling." },

  // Non-vegetarian appetisers
  { id: "chicken-tikka", name: "Chicken Tikka", category: "appetisers-nonveg", price: 30000, dietary: "non-veg", spice: 2, glutenFree: true, description: "Smoky tandoor-grilled chicken in a classic yoghurt and spice marinade." },
  { id: "tandoori-chicken-half", name: "Tandoori Chicken (Half)", category: "appetisers-nonveg", price: 38000, dietary: "non-veg", spice: 2, glutenFree: true, description: "Half chicken marinated overnight, roasted over tandoor flame." },
  { id: "mutton-tikka", name: "Mutton Tikka", category: "appetisers-nonveg", price: 48000, dietary: "non-veg", spice: 2, description: "Tender marinated mutton pieces, char-grilled in the clay oven." },
  { id: "chilli-chicken", name: "Chilli Chicken", category: "appetisers-nonveg", price: 32000, dietary: "non-veg", spice: 3, description: "Crispy chicken wok-tossed with green chilli, garlic and spring onion." },
  { id: "fish-amritsari", name: "Fish Amritsari", category: "appetisers-nonveg", price: 35000, dietary: "non-veg", spice: 2, description: "Punjabi-style battered fish with carom seeds and a squeeze of lime." },
  { id: "curry-leaf-fried-chicken", name: "Curry Leaf Fried Chicken", category: "appetisers-nonveg", price: 32000, dietary: "non-veg", spice: 2, featured: true, accent: "#A63827", image: "/images/dishes/curry-leaf-fried-chicken.jpg", description: "Our signature crispy chicken perfumed with fresh curry leaves and cracked pepper." },

  // Vegetarian curries
  { id: "dal-makhani", name: "Dal Makhani", category: "veg-curries", price: 32000, dietary: "veg", spice: 1, glutenFree: true, description: "Black lentils simmered overnight with butter, cream and slow spice." },
  { id: "curry-leaf-dal", name: "Curry Leaf Dal", category: "veg-curries", price: 30000, dietary: "vegan", spice: 1, glutenFree: true, dairyFree: true, description: "Yellow dal tempered with mustard seed, garlic and fresh curry leaves." },
  { id: "paneer-butter-masala", name: "Paneer Butter Masala", category: "veg-curries", price: 38000, dietary: "veg", spice: 1, glutenFree: true, containsNuts: true, description: "Paneer in a silky tomato-cashew gravy finished with butter." },
  { id: "palak-paneer", name: "Palak Paneer", category: "veg-curries", price: 38000, dietary: "veg", spice: 1, glutenFree: true, description: "Fresh spinach purée with soft paneer and gentle garlic tadka." },
  { id: "paneer-tikka-masala", name: "Paneer Tikka Masala", category: "veg-curries", price: 42000, dietary: "veg", spice: 2, glutenFree: true, featured: true, accent: "#53633F", image: "/images/dishes/paneer-tikka-masala.webp", description: "Tandoor-charred paneer folded into a rich, spiced masala gravy." },

  // Curries
  { id: "butter-chicken", name: "Butter Chicken", category: "curries", price: 45000, dietary: "non-veg", spice: 1, glutenFree: true, containsNuts: true, featured: true, accent: "#C99528", image: "/images/dishes/butter-chicken.jpg", description: "The Delhi classic — tandoori chicken in velvet tomato-butter gravy." },
  { id: "chicken-tikka-masala", name: "Chicken Tikka Masala", category: "curries", price: 45000, dietary: "non-veg", spice: 2, glutenFree: true, description: "Char-grilled chicken tikka in a robust onion-tomato masala." },
  { id: "chicken-curry", name: "Chicken Curry", category: "curries", price: 42000, dietary: "non-veg", spice: 2, glutenFree: true, dairyFree: true, description: "Home-style chicken curry with whole spices and browned onions." },
  { id: "house-curry-leaf-chicken", name: "House Curry Leaf Chicken", category: "curries", price: 48000, dietary: "non-veg", spice: 2, glutenFree: true, featured: true, accent: "#53633F", image: "/images/dishes/house-curry-leaf-chicken.jpg", description: "The house signature — South Indian pepper chicken with a shower of crisp curry leaves." },
  { id: "goat-curry", name: "Goat Curry", category: "curries", price: 55000, dietary: "non-veg", spice: 2, glutenFree: true, dairyFree: true, description: "Slow-cooked goat on the bone in a deep, aromatic gravy." },
  { id: "lamb-rogan-josh", name: "Lamb Rogan Josh", category: "curries", price: 58000, dietary: "non-veg", spice: 2, glutenFree: true, description: "Kashmiri lamb braise with Kashmiri chilli, fennel and yoghurt." },
  { id: "fish-curry", name: "Fish Curry", category: "curries", price: 48000, dietary: "non-veg", spice: 2, glutenFree: true, dairyFree: true, description: "Coastal-style fish curry with tamarind and coconut." },
  { id: "tandoori-chicken-full", name: "Tandoori Chicken (Full)", category: "curries", price: 68000, dietary: "non-veg", spice: 2, glutenFree: true, description: "Whole chicken, overnight marinade, tandoor-roasted to smoky perfection." },

  // Biryani & rice
  { id: "chicken-biryani", name: "Chicken Biryani", category: "biryani-rice", price: 45000, dietary: "non-veg", spice: 2, featured: true, accent: "#C99528", image: "/images/dishes/chicken-biryani.jpg", description: "Fragrant basmati layered with spiced chicken, saffron and fried onion, sealed and steamed." },
  { id: "lamb-biryani", name: "Lamb Biryani", category: "biryani-rice", price: 58000, dietary: "non-veg", spice: 2, description: "Slow-cooked lamb dum biryani with mint, saffron and whole spices." },
  { id: "steamed-rice", name: "Steamed Rice", category: "biryani-rice", price: 12000, dietary: "vegan", spice: 0, glutenFree: true, dairyFree: true, description: "Fluffy steamed basmati rice." },
  { id: "jeera-rice", name: "Jeera Rice", category: "biryani-rice", price: 15000, dietary: "vegan", spice: 0, glutenFree: true, dairyFree: true, description: "Basmati tossed with toasted cumin and ghee." },
  { id: "curry-leaf-special-rice", name: "Curry Leaf Special Rice", category: "biryani-rice", price: 18000, dietary: "veg", spice: 1, glutenFree: true, description: "Our special rice with curry leaves, mustard seed and cashew." },

  // Tandoor breads
  { id: "plain-naan", name: "Plain Naan", category: "tandoor-breads", price: 8000, dietary: "veg", spice: 0, description: "Soft leavened bread baked on the tandoor wall." },
  { id: "butter-naan", name: "Butter Naan", category: "tandoor-breads", price: 10000, dietary: "veg", spice: 0, description: "Classic naan brushed with melted butter." },
  { id: "garlic-naan", name: "Garlic Naan", category: "tandoor-breads", price: 12000, dietary: "veg", spice: 0, description: "Naan topped with garlic, coriander and butter." },
  { id: "cheese-naan", name: "Cheese Naan", category: "tandoor-breads", price: 18000, dietary: "veg", spice: 0, description: "Naan stuffed with molten cheese." },
  { id: "tandoori-roti", name: "Tandoori Roti", category: "tandoor-breads", price: 6000, dietary: "vegan", spice: 0, dairyFree: true, description: "Wholewheat bread baked in the clay oven." },
  { id: "lachha-paratha", name: "Lachha Paratha", category: "tandoor-breads", price: 12000, dietary: "veg", spice: 0, description: "Flaky, many-layered paratha, crisped on the tandoor." },

  // Desserts
  { id: "ice-cream", name: "Ice Cream (per scoop)", category: "desserts", price: 5000, dietary: "veg", spice: 0, glutenFree: true, description: "Vanilla, chocolate or strawberry." },
  { id: "gulab-jamun", name: "Gulab Jamun", category: "desserts", price: 16000, dietary: "veg", spice: 0, description: "Soft, warm milk dumplings soaked in rose-flavoured syrup." },
  { id: "gulab-jamun-ice-cream", name: "Gulab Jamun with Ice Cream", category: "desserts", price: 22000, dietary: "veg", spice: 0, description: "Warm gulab jamun with a scoop of ice cream." },

  // Thali lunches (12pm–3pm, every day)
  { id: "vegetarian-thali", name: "Vegetarian Thali", category: "thalis", price: 38000, dietary: "veg", spice: 1, description: "Fresh, wholesome and satisfying — curry selection, rice, naan, accompaniments, dessert and masala chai." },
  { id: "vegan-thali", name: "Vegan Thali", category: "thalis", price: 38000, dietary: "vegan", spice: 1, dairyFree: true, description: "Plant-based, vibrant and full of flavour — a complete vegan meal on one platter." },
  { id: "chicken-thali", name: "Chicken Thali", category: "thalis", price: 48000, dietary: "non-veg", spice: 2, featured: true, accent: "#A63827", image: "/images/dishes/chicken-thali.jpeg", description: "A comforting and flavourful classic, our most popular lunch." },
  { id: "signature-thali", name: "Curry Leaf Signature Thali", category: "thalis", price: 58000, dietary: "non-veg", spice: 2, description: "The grand platter — includes Butter Chicken and Goat Curry with all the trimmings." },
];

export const sundayBuffet = {
  name: "Sunday Grand Buffet",
  time: "Every Sunday · 12pm – 3pm",
  adults: 69000,
  children: 35000,
  includes: [
    "Unlimited Indian feast",
    "Wide selection of curries",
    "Fresh naan & rice",
    "Delicious desserts",
    "Masala chai included",
  ],
};

export function formatUGX(amount: number) {
  return `UGX ${amount.toLocaleString("en-US")}`;
}
