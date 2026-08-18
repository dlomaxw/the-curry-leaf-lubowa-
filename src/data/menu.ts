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
  | "tandoori-platters"
  | "appetisers-veg"
  | "appetisers-chicken"
  | "appetisers-lamb-mutton"
  | "appetisers-seafood"
  | "veg-curries"
  | "chicken-curries"
  | "lamb-curries"
  | "mutton-curries"
  | "goat-curries"
  | "seafood-curries"
  | "biryanis"
  | "naan-rolls"
  | "rice"
  | "breads"
  | "accompaniments"
  | "desserts"
  | "teas"
  | "coffee";

export const categories: { id: CategoryId; label: string }[] = [
  { id: "tandoori-platters", label: "Tandoori Sharing Platters" },
  { id: "appetisers-veg", label: "Vegetarian Appetisers" },
  { id: "appetisers-chicken", label: "Chicken Appetisers" },
  { id: "appetisers-lamb-mutton", label: "Lamb & Mutton Appetisers" },
  { id: "appetisers-seafood", label: "Seafood Appetisers" },
  { id: "veg-curries", label: "Vegetarian Main Courses" },
  { id: "chicken-curries", label: "Chicken Curries" },
  { id: "lamb-curries", label: "Lamb Curries" },
  { id: "mutton-curries", label: "Mutton Curries" },
  { id: "goat-curries", label: "Goat Curries" },
  { id: "seafood-curries", label: "Seafood Curries" },
  { id: "biryanis", label: "Biryanis" },
  { id: "naan-rolls", label: "Naan Rolls" },
  { id: "rice", label: "Rice" },
  { id: "breads", label: "Indian Breads" },
  { id: "accompaniments", label: "Accompaniments" },
  { id: "desserts", label: "Desserts" },
  { id: "teas", label: "Indian Teas" },
  { id: "coffee", label: "Coffee" },
];

// Transcribed from "The Curry Leaf Final Menu Prices" — all prices inclusive of VAT.
export const dishes: Dish[] = [
  // Tandoori Sharing Platters
  { id: "maharaja-mixed-grill-platter", name: "Maharaja Mixed Grill Platter", category: "tandoori-platters", price: 148000, dietary: "non-veg", spice: 1, description: "Chicken Tikka, Tandoori Chicken, Fish Tikka, King Prawns and Jumbo Prawns with chutneys. A grand tour of the tandoor." },
  { id: "vegetarian-tandoori-platter", name: "Vegetarian Tandoori Platter", category: "tandoori-platters", price: 78000, dietary: "veg", spice: 1, description: "A colourful selection of Paneer Tikka, Tofu Tikka, Hara Bhara Kebab and Tandoori Gobi served with mint and tamarind chutneys. Four tandoori favourites. One very happy table." },

  // Vegetarian Appetisers
  { id: "paneer-tikka", name: "Paneer Tikka", category: "appetisers-veg", price: 34000, dietary: "veg", spice: 1, description: "Indian cottage cheese marinated in yoghurt and aromatic spices, roasted in the tandoor. The superstar of the vegetarian tandoor." },
  { id: "chilli-paneer", name: "Chilli Paneer", category: "appetisers-veg", price: 34000, dietary: "veg", spice: 2, description: "Soft cubes of paneer tossed with peppers, onions and green chillies in a bold Indo-Chinese sauce. India and China had a delicious meeting." },
  { id: "tofu-tikka", name: "Tofu Tikka", category: "appetisers-veg", price: 32000, dietary: "vegan", spice: 1, description: "Tofu marinated in fragrant Indian spices and charcoal roasted. Plant-based, proudly packed with flavour." },
  { id: "hara-bhara-kebab", name: "Hara Bhara Kebab", category: "appetisers-veg", price: 26000, dietary: "vegan", spice: 1, description: "Spinach, green peas and potato patties delicately spiced and pan-seared. The green hero everyone secretly orders." },
  { id: "punjabi-vegetable-samosa", name: "Punjabi Vegetable Samosa", category: "appetisers-veg", price: 18000, dietary: "vegan", spice: 1, description: "Golden pastry parcels filled with spiced potatoes and peas, served with chutneys. India's Golden Triangle." },
  { id: "onion-bhaji", name: "Onion Bhaji", category: "appetisers-veg", price: 18000, dietary: "vegan", spice: 1, description: "Crispy onion fritters coated in lightly spiced gram flour batter and fried until golden. Golden, crunchy and impossible to stop at one." },
  { id: "okra-fries", name: "Okra Fries", category: "appetisers-veg", price: 24000, dietary: "vegan", spice: 1, description: "Fresh okra lightly seasoned, crisp-fried and served with signature sauce. Proof that vegetables can be dangerously addictive." },
  { id: "imli-cashew-nuts", name: "Imli Cashew Nuts", category: "appetisers-veg", price: 34000, dietary: "vegan", spice: 0, containsNuts: true, description: "Premium roasted cashew nuts coated in tamarind glaze. Sweet, tangy and dangerously addictive." },
  { id: "curry-leaf-masala-nuts", name: "Curry Leaf Masala Nuts", category: "appetisers-veg", price: 24000, dietary: "vegan", spice: 1, containsNuts: true, description: "Crunchy mixed roasted nuts seasoned with fragrant spices and curry leaves. Small bites. Big personality." },
  { id: "peanut-masala", name: "Peanut Masala", category: "appetisers-veg", price: 18000, dietary: "vegan", spice: 1, containsNuts: true, description: "Crunchy roasted peanuts tossed with aromatic spices and curry leaves. Proof that peanuts deserve the spotlight too." },
  { id: "masala-papad", name: "Masala Papad", category: "appetisers-veg", price: 14000, dietary: "vegan", spice: 1, description: "Crisp papad topped with tomatoes, onions, coriander and spices. The classic, dressed up for the party." },
  { id: "assorted-papad-basket", name: "Assorted Papad Basket", category: "appetisers-veg", price: 16000, dietary: "veg", spice: 0, description: "Selection of crisp papads served with mint yoghurt and tamarind chutney. The cool sisters of Plain Papad." },
  { id: "plain-papad", name: "Plain Papad", category: "appetisers-veg", price: 8000, dietary: "vegan", spice: 0, description: "Light, crisp lentil wafers freshly roasted and served with house chutneys. Simple. Crispy. Timeless." },

  // Chicken Appetisers
  { id: "chicken-tikka", name: "Chicken Tikka", category: "appetisers-chicken", price: 32000, dietary: "non-veg", spice: 1, description: "Tender chicken marinated overnight in yoghurt, garlic, ginger and spices then roasted in the tandoor. The dish that made the tandoor famous." },
  { id: "chicken-afghani", name: "Chicken Afghani", category: "appetisers-chicken", price: 34000, dietary: "non-veg", spice: 0, description: "Chicken marinated in creamy yoghurt, herbs and delicate spices then charcoal grilled until beautifully tender. Great food knows no boarders." },
  { id: "chicken-angara", name: "Chicken Angara", category: "appetisers-chicken", price: 36000, dietary: "non-veg", spice: 2, description: "Tender chicken finished over an open flame, infused with smoky spices and a beautifully charred finish. For those who like it hot and have no regrets." },
  { id: "sharabi-chicken", name: "Sharabi Chicken", category: "appetisers-chicken", price: 40000, dietary: "non-veg", spice: 1, description: "Slow-braised chicken finished with premium whisky, creating a luxurious curry with remarkable richness. Chicken that has had a drink or two." },
  { id: "tandoori-chicken-half", name: "Tandoori Chicken (Half)", category: "appetisers-chicken", price: 34000, dietary: "non-veg", spice: 1, description: "Half chicken marinated overnight in signature yoghurt and spice blend, then roasted over charcoal. Worth every bite… and a nap after." },
  { id: "tandoori-chicken-full", name: "Tandoori Chicken (Full)", category: "appetisers-chicken", price: 64000, dietary: "non-veg", spice: 1, description: "A whole chicken marinated traditionally and slow-roasted over charcoal. Made for sharing… if you really have to." },
  { id: "punjabi-chicken-samosa", name: "Punjabi Chicken Samosa", category: "appetisers-chicken", price: 22000, dietary: "non-veg", spice: 1, description: "Golden pastry filled with seasoned minced chicken, aromatic herbs and warming spices, served with chutneys. The samosa's bolder sibling." },

  // Lamb & Mutton Appetisers
  { id: "shahi-tandoori-lamb-chops", name: "Shahi Tandoori Lamb Chops", category: "appetisers-lamb-mutton", price: 58000, dietary: "non-veg", spice: 1, description: "Premium lamb chops marinated for 24 hours in fragrant spices and charcoal grilled until tender. Royal treatment for exceptional lamb." },
  { id: "mutton-tikka", name: "Mutton Tikka", category: "appetisers-lamb-mutton", price: 48000, dietary: "non-veg", spice: 1, description: "Tender cubes of mutton marinated with yoghurt, garlic and warming spices, then charcoal roasted. Grill it until it's charred, bold and absolutely fabulous." },
  { id: "mutton-angara", name: "Mutton Angara", category: "appetisers-lamb-mutton", price: 48000, dietary: "non-veg", spice: 2, description: "Succulent mutton slow-cooked then finished over an open flame for bold smoky flavours and a richly charred finish. Mutton that has been working out." },
  { id: "sharabi-mutton", name: "Sharabi Mutton", category: "appetisers-lamb-mutton", price: 52000, dietary: "non-veg", spice: 1, description: "Slow-braised mutton finished with premium whisky, creating a luxurious curry with remarkable richness. Bold enough to have its own story." },
  { id: "lamb-seekh-kebab", name: "Lamb Seekh Kebab", category: "appetisers-lamb-mutton", price: 35000, dietary: "non-veg", spice: 1, description: "Succulent minced lamb blended with herbs and spices, skewered and flame grilled in the tandoor. Spiced and seriously satisfying." },
  { id: "lamb-samosa", name: "Lamb Samosa", category: "appetisers-lamb-mutton", price: 25000, dietary: "non-veg", spice: 1, description: "Crispy pastry stuffed with minced lamb, fresh herbs and fragrant spices, served with chutneys. Small package, big personality." },

  // Seafood Appetisers
  { id: "nawabi-jumbo-prawns", name: "Nawabi Jumbo Prawns", category: "appetisers-seafood", price: 75000, dietary: "non-veg", spice: 1, description: "Jumbo king prawns marinated in yoghurt, garlic, lemon and aromatic spices, then flame grilled in the tandoor. Prawns so big, they need their own fan club." },
  { id: "fish-tikka", name: "Fish Tikka", category: "appetisers-seafood", price: 42000, dietary: "non-veg", spice: 1, description: "Fish fillets marinated with delicate spices and charcoal roasted in the tandoor. Fresh and finished in fire." },

  // Vegetarian Main Courses
  { id: "paneer-butter-masala", name: "Paneer Butter Masala", category: "veg-curries", price: 38000, dietary: "veg", spice: 1, description: "Indian cottage cheese simmered in a rich, creamy tomato and butter sauce with aromatic spices. Butter Chicken's vegetarian best friend." },
  { id: "paneer-tikka-masala", name: "Paneer Tikka Masala", category: "veg-curries", price: 38000, dietary: "veg", spice: 1, featured: true, accent: "#53633F", image: "/images/dishes/paneer-tikka-masala.webp", description: "Chargrilled paneer tikka cooked in a creamy tomato and onion masala. The tandoor meets the curry pot." },
  { id: "paneer-pasanda", name: "Paneer Pasanda", category: "veg-curries", price: 40000, dietary: "veg", spice: 0, containsNuts: true, description: "Soft paneer stuffed with nuts and simmered in a rich, creamy tomato and cashew gravy. Fit for royalty, and even better for dinner." },
  { id: "palak-paneer", name: "Palak Paneer", category: "veg-curries", price: 36000, dietary: "veg", spice: 1, description: "Paneer in a creamy spinach gravy with mild spices. Green never tasted this good." },
  { id: "palak-tofu", name: "Palak Tofu", category: "veg-curries", price: 38000, dietary: "vegan", spice: 1, description: "Tender tofu cooked in a silky spinach gravy with garlic, ginger and fragrant Indian spices. Proof that plants can steal the show." },
  { id: "curry-leaf-dal", name: "Curry Leaf Dal", category: "veg-curries", price: 32000, dietary: "vegan", spice: 1, description: "Our signature slow-cooked yellow lentils finished with roasted garlic, curry leaves, mustard seeds and warming spices. The humble dal that proudly carries our name." },
  { id: "dal-makhani", name: "Dal Makhani", category: "veg-curries", price: 32000, dietary: "veg", spice: 1, description: "Slow-cooked black lentils in a creamy tomato sauce. Slow-cooked overnight. Worth every minute." },
  { id: "dal-tadka", name: "Dal Tadka", category: "veg-curries", price: 28000, dietary: "vegan", spice: 1, description: "Yellow lentils tempered with garlic, cumin & ghee. Simple, comforting & loved in homes across India." },
  { id: "vegetable-korma", name: "Vegetable Korma", category: "veg-curries", price: 32000, dietary: "veg", spice: 0, containsNuts: true, description: "Creamy cashew & mild spice vegetable curry. Mild, creamy & makes everyone happy." },
  { id: "punjabi-chana-masala", name: "Punjabi Chana Masala", category: "veg-curries", price: 32000, dietary: "vegan", spice: 2, description: "Chickpeas in a spicy onion-tomato gravy. Protein-packed & full of personality." },
  { id: "bombay-aloo", name: "Bombay Aloo", category: "veg-curries", price: 30000, dietary: "vegan", spice: 1, description: "Baby potatoes cooked with tomatoes, onions, fresh coriander and traditional Bombay spices. Simple potatoes. Serious flavour." },
  { id: "bhindi-masala", name: "Bhindi Masala", category: "veg-curries", price: 30000, dietary: "vegan", spice: 1, description: "Fresh okra sautéed with onions, tomatoes & aromatic Indian spices. The dish that turns okra sceptics into believers." },
  { id: "vegetable-jalfrezi", name: "Vegetable Jalfrezi", category: "veg-curries", price: 32000, dietary: "vegan", spice: 2, description: "Mixed vegetables stir-fried in a spiced tomato sauce. Crunchy, colourful & always a good idea." },
  { id: "mixed-vegetable-curry", name: "Mixed Vegetable Curry", category: "veg-curries", price: 30000, dietary: "vegan", spice: 1, description: "Seasonal vegetables in a fragrant curry gravy. Whatever's fresh, cooked to perfection." },
  { id: "aloo-gobi", name: "Aloo Gobi", category: "veg-curries", price: 32000, dietary: "vegan", spice: 1, description: "Potatoes & cauliflower cooked with spices. The ultimate power couple." },

  // Chicken Curries
  { id: "curry-leaf-signature-chicken", name: "Curry Leaf Signature Chicken", category: "chicken-curries", price: 42000, dietary: "non-veg", spice: 2, featured: true, accent: "#53633F", image: "/images/dishes/house-curry-leaf-chicken.jpg", description: "Our chef's special chicken curry, bold & flavourful. The curry that carries our name." },
  { id: "butter-chicken", name: "Butter Chicken", category: "chicken-curries", price: 38000, dietary: "non-veg", spice: 1, featured: true, accent: "#C99528", image: "/images/dishes/butter-chicken.jpg", description: "Tandoori chicken in a rich tomato, butter & cream sauce. The Indian classic." },
  { id: "chicken-tikka-masala", name: "Chicken Tikka Masala", category: "chicken-curries", price: 38000, dietary: "non-veg", spice: 1, description: "Grilled chicken in a creamy spiced tomato gravy. If comfort food had a name, this would be it." },
  { id: "chicken-pasanda", name: "Chicken Pasanda", category: "chicken-curries", price: 40000, dietary: "non-veg", spice: 0, containsNuts: true, description: "Tender chicken simmered in a luxurious cashew, cream and saffron sauce with delicate spices. A royal classic with timeless elegance." },
  { id: "chicken-ra-ra", name: "Chicken Ra Ra", category: "chicken-curries", price: 40000, dietary: "non-veg", spice: 2, description: "Tender chicken pieces cooked with spiced minced chicken in a rich onion and tomato masala. Twice the chicken. Twice the flavour." },
  { id: "chicken-akbari", name: "Chicken Akbari", category: "chicken-curries", price: 40000, dietary: "non-veg", spice: 0, description: "Creamy, buttery chicken curry with mild spices. Butter Chicken's hot older sister." },
  { id: "chicken-korma", name: "Chicken Korma", category: "chicken-curries", price: 40000, dietary: "non-veg", spice: 0, containsNuts: true, description: "Mild, creamy curry with nuts & aromatic spices. Smooth, sweet & just the right kind of indulgence." },
  { id: "latpata-chicken", name: "Latpata Chicken", category: "chicken-curries", price: 40000, dietary: "non-veg", spice: 2, description: "Boneless chicken cooked in a thick, spicy North Indian masala packed with herbs and peppers. Bold, messy and absolutely worth it." },
  { id: "chicken-chettinad", name: "Chicken Chettinad", category: "chicken-curries", price: 38000, dietary: "non-veg", spice: 2, description: "Spicy Chettinad curry with roasted spices. South Indian spices, turned all the way up." },
  { id: "railway-chicken-curry", name: "Railway Chicken Curry", category: "chicken-curries", price: 38000, dietary: "non-veg", spice: 1, description: "Anglo-Indian style chicken curry, rich & robust. All aboard the flavour express!" },
  { id: "chicken-curry", name: "Chicken Curry", category: "chicken-curries", price: 38000, dietary: "non-veg", spice: 1, description: "Traditional home-style chicken curry cooked with onions, tomatoes and fragrant Indian spices. The curry every Indian family grows up loving." },
  { id: "chicken-rogan-josh", name: "Chicken Rogan Josh", category: "chicken-curries", price: 40000, dietary: "non-veg", spice: 2, description: "Classic Kashmiri chicken curry with aromatic spices. The royal treatment for your taste buds." },
  { id: "chicken-jalfrezi", name: "Chicken Jalfrezi", category: "chicken-curries", price: 40000, dietary: "non-veg", spice: 2, description: "Stir-fried chicken with peppers & onions. Wok-tossed. Bold. Beautiful." },
  { id: "chicken-madras", name: "Chicken Madras", category: "chicken-curries", price: 38000, dietary: "non-veg", spice: 3, description: "Hot & spicy South Indian curry. For those who like it hot." },
  { id: "chicken-vindaloo", name: "Chicken Vindaloo", category: "chicken-curries", price: 38000, dietary: "non-veg", spice: 3, description: "Goan-style curry with vinegar & spices. A fiery Goan legend on your plate." },

  // Lamb Curries
  { id: "lamb-rogan-josh", name: "Lamb Rogan Josh", category: "lamb-curries", price: 48000, dietary: "non-veg", spice: 2, description: "Slow-cooked lamb in aromatic Kashmiri spices. The Bollywood hero of lamb curries!" },
  { id: "lamb-korma", name: "Lamb Korma", category: "lamb-curries", price: 50000, dietary: "non-veg", spice: 0, containsNuts: true, description: "Creamy lamb curry with nuts & mild spices. So rich, it probably has its own fan club." },
  { id: "lamb-madras", name: "Lamb Madras", category: "lamb-curries", price: 48000, dietary: "non-veg", spice: 3, description: "Hot & tangy lamb curry with bold spices. For those who like their curry with a bit of drama." },

  // Mutton Curries
  { id: "mutton-rogan-josh", name: "Mutton Rogan Josh", category: "mutton-curries", price: 54000, dietary: "non-veg", spice: 2, description: "Succulent mutton slow-cooked in a fragrant Kashmiri gravy with tomatoes and warming spices. The king of Kashmiri curries." },
  { id: "mutton-badami", name: "Mutton Badami", category: "mutton-curries", price: 56000, dietary: "non-veg", spice: 0, containsNuts: true, description: "Tender mutton slow-cooked in a rich almond and cream gravy delicately flavoured with aromatic spices. Smooth, luxurious and wonderfully comforting." },
  { id: "railway-mutton-curry", name: "Railway Mutton Curry", category: "mutton-curries", price: 50000, dietary: "non-veg", spice: 1, description: "Anglo-Indian style mutton curry, hearty & rich. Old-school comfort with first-class flavour." },
  { id: "mutton-chettinad", name: "Mutton Chettinad", category: "mutton-curries", price: 52000, dietary: "non-veg", spice: 2, description: "South Indian mutton curry, deeply flavourful. So tasty, it'll make you cancel your diet." },

  // Goat Curries
  { id: "traditional-goat-curry", name: "Traditional Goat Curry", category: "goat-curries", price: 50000, dietary: "non-veg", spice: 1, description: "Tender goat slow-cooked with onions, tomatoes and traditional Indian spices until beautifully rich. A timeless Indian favourite, cooked low and slow." },
  { id: "goat-rogan-josh", name: "Goat Rogan Josh", category: "goat-curries", price: 54000, dietary: "non-veg", spice: 2, description: "Succulent goat simmered in a fragrant Kashmiri gravy with warming spices and tomatoes. Royal Kashmiri flavours with an African favourite." },

  // Seafood Curries
  { id: "prawn-masala", name: "Prawn Masala", category: "seafood-curries", price: 75000, dietary: "non-veg", spice: 1, description: "Fresh prawns in a rich onion-tomato gravy. Big prawns. Bigger flavour." },
  { id: "kerala-prawn-curry", name: "Kerala Prawn Curry", category: "seafood-curries", price: 75000, dietary: "non-veg", spice: 1, description: "Prawns in coconut milk with aromatic spices. Juicy prawns, coconut dreams." },
  { id: "kerala-fish-curry", name: "Kerala Fish Curry", category: "seafood-curries", price: 48000, dietary: "non-veg", spice: 1, description: "Fish in coconut milk with curry leaves & spices. A trip to Kerala without leaving your seat." },
  { id: "goan-fish-curry", name: "Goan Fish Curry", category: "seafood-curries", price: 48000, dietary: "non-veg", spice: 2, description: "Tangy Goan-style curry with kokum & spices. Sunshine, spice and the taste of the coast." },

  // Biryanis
  { id: "king-prawn-biryani", name: "King Prawn Biryani", category: "biryanis", price: 75000, dietary: "non-veg", spice: 3, featured: true, accent: "#A63827", description: "King prawns and basmati rice with royal spices. From the coastal treasures of Goa." },
  { id: "dum-biryani-chicken", name: "Dum Biryani – Chicken", category: "biryanis", price: 44000, dietary: "non-veg", spice: 1, featured: true, accent: "#C99528", description: "Slow-cooked on dum for rich aroma and authentic flavour. From the biryani hearts of Hyderabad." },
  { id: "lamb-biryani", name: "Lamb Biryani", category: "biryanis", price: 48000, dietary: "non-veg", spice: 1, description: "Succulent lamb with fragrant basmati rice. From the spice trails of Awadh." },
  { id: "chicken-biryani", name: "Chicken Biryani", category: "biryanis", price: 38000, dietary: "non-veg", spice: 1, image: "/images/dishes/chicken-biryani.jpg", description: "Tender chicken and basmati rice. From the royal kitchens of Lucknow." },
  { id: "vegetable-biryani", name: "Vegetable Biryani", category: "biryanis", price: 32000, dietary: "vegan", spice: 1, description: "Fragrant basmati rice with mixed vegetables. From Hyderabadi kitchens." },
  { id: "vegan-biryani", name: "Vegan Biryani", category: "biryanis", price: 32000, dietary: "vegan", spice: 1, description: "Plant-based biryani with aromatic spices. From the lush gardens of Kerala." },

  // Naan Rolls
  { id: "bombay-breakfast-naan-roll", name: "Bombay Breakfast Naan Roll", category: "naan-rolls", price: 38000, dietary: "non-veg", spice: 0, description: "Crispy bacon, juicy breakfast sausage and three freshly cooked eggs, wrapped in a warm tandoor naan. The full breakfast. Minus the knife and fork." },
  { id: "bombay-chicken-breakfast-naan-roll", name: "Bombay Chicken Breakfast Naan Roll", category: "naan-rolls", price: 38000, dietary: "non-veg", spice: 0, description: "Tender chicken tikka, freshly cooked masala omelette and melted cheese, wrapped in a warm tandoor naan. The breakfast worth getting out of bed for." },
  { id: "vegan-bombay-breakfast-naan-roll", name: "Vegan Bombay Breakfast Naan Roll", category: "naan-rolls", price: 36000, dietary: "vegan", spice: 0, description: "Tandoori tofu, Bombay potatoes, roasted peppers and onions, wrapped in a warm tandoor naan. No meat. No eggs. Absolutely no compromise." },
  { id: "bacon-egg-naan-roll", name: "Bacon & Egg Naan Roll", category: "naan-rolls", price: 32000, dietary: "non-veg", spice: 0, description: "Crispy bacon and a freshly cooked masala omelette wrapped in a warm tandoor naan. Two breakfast favourites. One very good idea." },
  { id: "sausage-egg-naan-roll", name: "Sausage & Egg Naan Roll", category: "naan-rolls", price: 32000, dietary: "non-veg", spice: 0, description: "Juicy breakfast sausage and freshly cooked eggs wrapped in a warm tandoor naan. Hearty enough to power your whole morning, or rescue your afternoon." },
  { id: "bacon-naan-roll", name: "Bacon Naan Roll", category: "naan-rolls", price: 28000, dietary: "non-veg", spice: 0, description: "Crispy, smoky bacon wrapped in a warm tandoor naan. Simple. Smoky. Seriously satisfying." },
  { id: "sausage-naan-roll", name: "Sausage Naan Roll", category: "naan-rolls", price: 28000, dietary: "non-veg", spice: 0, description: "Juicy breakfast sausage wrapped in a warm tandoor naan. The breakfast classic that took a trip to India." },
  { id: "masala-omelette-naan-roll", name: "Masala Omelette Naan Roll", category: "naan-rolls", price: 26000, dietary: "veg", spice: 1, description: "A freshly cooked masala omelette with onions, coriander and warming spices, wrapped in a warm tandoor naan. Breakfast, wrapped to perfection. Good thing breakfast can be anytime." },
  { id: "chicken-masala-omelette-naan-roll", name: "Chicken & Masala Omelette Naan Roll", category: "naan-rolls", price: 35000, dietary: "non-veg", spice: 1, description: "Tender chicken tikka and a freshly cooked masala omelette wrapped in a warm tandoor naan. Twice the protein. Twice the satisfaction." },
  { id: "tandoori-chicken-naan-roll", name: "Tandoori Chicken Naan Roll", category: "naan-rolls", price: 32000, dietary: "non-veg", spice: 1, description: "Juicy tandoori chicken, roasted with aromatic Indian spices, wrapped in a warm tandoor naan. Fresh from the tandoor to your hands." },
  { id: "chicken-tikka-naan-roll", name: "Chicken Tikka Naan Roll", category: "naan-rolls", price: 32000, dietary: "non-veg", spice: 1, description: "Tender, chargrilled chicken tikka wrapped in a warm tandoor naan. The tandoor's greatest hit, rolled up." },
  { id: "chilli-chicken-naan-roll", name: "Chilli Chicken Naan Roll", category: "naan-rolls", price: 32000, dietary: "non-veg", spice: 2, description: "Tender chicken tossed with peppers, onions and green chillies, wrapped in a warm tandoor naan. Hot, messy and packed with flavour." },
  { id: "masala-omelette-paneer-naan-roll", name: "Masala Omelette & Paneer Naan Roll", category: "naan-rolls", price: 36000, dietary: "veg", spice: 1, description: "A freshly cooked masala omelette and chargrilled paneer tikka wrapped in a warm tandoor naan. Two Indian favourites. One seriously satisfying roll." },
  { id: "paneer-tikka-naan-roll", name: "Paneer Tikka Naan Roll", category: "naan-rolls", price: 32000, dietary: "veg", spice: 1, description: "Chargrilled paneer tikka with aromatic Indian spices, wrapped in a warm tandoor naan. Paneer. Tandoor. Naan. Enough said." },
  { id: "chilli-paneer-naan-roll", name: "Chilli Paneer Naan Roll", category: "naan-rolls", price: 32000, dietary: "veg", spice: 2, description: "Paneer tossed with peppers, onions and green chillies, wrapped in a warm tandoor naan. Bold, spicy and impossible to put down." },
  { id: "bombay-vegetable-naan-roll", name: "Bombay Vegetable Naan Roll", category: "naan-rolls", price: 32000, dietary: "vegan", spice: 1, description: "Seasonal vegetables cooked with Bombay spices and wrapped in a warm tandoor naan. Fresh, colourful and full of life." },
  { id: "aloo-tikki-naan-roll", name: "Aloo Tikki Naan Roll", category: "naan-rolls", price: 30000, dietary: "vegan", spice: 1, description: "Crispy spiced potato tikki wrapped in a warm tandoor naan. India's favourite street snack just got wrapped." },

  // Rice
  { id: "curry-leaf-rice", name: "Curry Leaf Rice", category: "rice", price: 26000, dietary: "vegan", spice: 1, featured: true, accent: "#53633F", containsNuts: true, description: "Cooked with cashew nuts and fresh curry leaves with spices. Nutty, herby and totally addictive." },
  { id: "coconut-rice", name: "Coconut Rice", category: "rice", price: 22000, dietary: "vegan", spice: 0, description: "Basmati rice cooked in coconut and spices. Creamy. Dreamy. Coconut-y." },
  { id: "punjabi-egg-fried-rice", name: "Punjabi Egg Fried Rice", category: "rice", price: 24000, dietary: "veg", spice: 1, description: "Basmati rice stir-fried with eggs and vegetables. Punjab called, it wants its rice back." },
  { id: "yellow-rice", name: "Yellow Rice", category: "rice", price: 18000, dietary: "vegan", spice: 0, description: "Lightly spiced basmati rice infused with turmeric for its vibrant golden colour. Sunshine on a plate." },
  { id: "saffron-rice", name: "Saffron Rice", category: "rice", price: 25000, dietary: "vegan", spice: 0, description: "Premium basmati rice with saffron. A little luxury never hurt anybody." },
  { id: "vegetable-pulao", name: "Vegetable Pulao", category: "rice", price: 20000, dietary: "vegan", spice: 0, description: "Basmati rice with mixed vegetables. A veg party in every bite." },
  { id: "peas-pulao", name: "Peas Pulao", category: "rice", price: 20000, dietary: "vegan", spice: 0, description: "Basmati rice with green peas. Tiny peas, big flavour." },
  { id: "jeera-rice", name: "Jeera (Cumin) Rice", category: "rice", price: 16000, dietary: "vegan", spice: 0, description: "Basmati rice tempered with cumin. Cumin makes everything better." },
  { id: "steamed-basmati-rice", name: "Steamed Basmati Rice", category: "rice", price: 14000, dietary: "vegan", spice: 0, description: "Light, fluffy basmati rice. Simple but never basic." },

  // Indian Breads
  { id: "tarbo-naan", name: "Tarbo Naan", category: "breads", price: 22000, dietary: "veg", spice: 1, description: "An indulgent naan loaded with garlic, cheese, herbs and chilli for maximum flavour. When regular naan just isn't enough." },
  { id: "keema-naan", name: "Keema Naan", category: "breads", price: 22000, dietary: "non-veg", spice: 1, description: "Layered wholewheat naan with spiced minced meat. A full meal hiding in a naan." },
  { id: "peshawari-naan", name: "Peshawari Naan", category: "breads", price: 18000, dietary: "veg", spice: 0, containsNuts: true, description: "Soft naan stuffed with coconut, raisins, almonds and cashew nuts. Sweet, nutty and impossible to resist." },
  { id: "chilli-cheese-naan", name: "Chilli Cheese Naan", category: "breads", price: 18000, dietary: "veg", spice: 2, description: "Cheesy naan with mixed chillies. For those who like it hot & cheesy!" },
  { id: "cheese-naan", name: "Cheese Naan", category: "breads", price: 15000, dietary: "veg", spice: 0, description: "Naan stuffed with melted cheese. Cheese pull = happiness pull." },
  { id: "garlic-naan", name: "Garlic Naan", category: "breads", price: 10000, dietary: "veg", spice: 0, description: "Naan topped with garlic and coriander. Garlic lovers, assemble!" },
  { id: "butter-naan", name: "Butter Naan", category: "breads", price: 9000, dietary: "veg", spice: 0, description: "Naan brushed with butter. Because butter makes life better." },
  { id: "plain-naan", name: "Plain Naan", category: "breads", price: 8000, dietary: "vegan", spice: 0, description: "Soft and fluffy tandoor-baked bread. Perfect partner for curries." },
  { id: "lachha-paratha", name: "Lachha Paratha", category: "breads", price: 10000, dietary: "veg", spice: 0, description: "Flaky layered Indian flatbread. So flaky, it has attitude." },
  { id: "roomali-roti", name: "Roomali Roti", category: "breads", price: 10000, dietary: "vegan", spice: 0, description: "Thin, soft handkerchief bread traditionally tossed by hand and cooked on an inverted griddle. Light as a handkerchief, perfect for scooping." },
  { id: "butter-roti", name: "Butter Roti", category: "breads", price: 8000, dietary: "veg", spice: 0, description: "Wholewheat roti brushed with butter. Because plain is nice, but butter is life." },
  { id: "tandoori-roti", name: "Tandoori Roti", category: "breads", price: 7000, dietary: "vegan", spice: 0, description: "Wholewheat roti. Simple, soft & totally satisfying." },

  // Accompaniments
  { id: "indian-onion-salad", name: "Indian Onion Salad", category: "accompaniments", price: 12000, dietary: "vegan", spice: 0, description: "Fresh sliced onions, cucumber, tomatoes, coriander and lemon with a sprinkle of chaat masala. The freshest way to wake up your curry." },
  { id: "plain-yoghurt", name: "Plain Yoghurt", category: "accompaniments", price: 8000, dietary: "veg", spice: 0, description: "Fresh creamy yoghurt. Cool, calm & curry's best friend." },
  { id: "coconut-yoghurt-raita", name: "Coconut Yoghurt Raita", category: "accompaniments", price: 10000, dietary: "vegan", spice: 0, description: "Creamy coconut yoghurt with cucumber, herbs & roasted cumin. Vegan, cool & oh-so-good." },
  { id: "cucumber-raita", name: "Cucumber Raita", category: "accompaniments", price: 10000, dietary: "veg", spice: 0, description: "Yoghurt with cucumber & spices. Refreshingly chilled." },
  { id: "boondi-raita", name: "Boondi Raita", category: "accompaniments", price: 10000, dietary: "veg", spice: 0, description: "Yoghurt with crispy boondi. Crunchy boondi = instant joy." },

  // Desserts
  { id: "chai-parle-g-delight", name: "Chai & Parle-G Delight", category: "desserts", price: 28000, dietary: "veg", spice: 0, containsNuts: true, description: "Creamy vanilla cheesecake layered with buttery Parle-G crumble, salted caramel and pistachio brittle. Every Indian childhood reimagined as dessert." },
  { id: "railway-bread-butter-pudding", name: "Railway Bread & Butter Pudding", category: "desserts", price: 28000, dietary: "veg", spice: 0, description: "Warm brioche bread pudding with saffron, cardamom and raisins, served with vanilla ice cream. Comfort food, first class." },
  { id: "bombay-chocolate-samosas", name: "Bombay Chocolate Samosas", category: "desserts", price: 28000, dietary: "veg", spice: 0, containsNuts: true, description: "Crisp pastry filled with rich chocolate and roasted nuts, served with vanilla ice cream and chocolate sauce. The samosa with a sweet secret." },
  { id: "kulfi-trio", name: "Kulfi Trio (Malai, Mango & Pistachio)", category: "desserts", price: 24000, dietary: "veg", spice: 0, containsNuts: true, description: "Three handcrafted Indian ice cream flavours: classic malai, mango and pistachio. Three flavours. One impossible decision." },
  { id: "gulab-jamun-vanilla-ice-cream", name: "Gulab Jamun with Vanilla Ice Cream", category: "desserts", price: 22000, dietary: "veg", spice: 0, description: "Warm dumplings soaked in fragrant syrup, served with vanilla ice cream. India's favourite dessert served warm with a cool twist." },
  { id: "gajar-halwa-vanilla-ice-cream", name: "Gajar Halwa with Vanilla Ice Cream", category: "desserts", price: 22000, dietary: "veg", spice: 0, containsNuts: true, description: "Slow-cooked carrot pudding topped with nuts, ghee and cardamom, served warm with vanilla ice cream. A timeless Indian classic, made to warm the soul." },
  { id: "sundae-ice-cream", name: "Sundae Ice Cream", category: "desserts", price: 18000, dietary: "veg", spice: 0, containsNuts: true, description: "Scoops of vanilla, chocolate or strawberry ice cream with your choice of chocolate, caramel or berry sauce, whipped cream, nuts and a cherry on top. Build your own little bowl of happiness." },
  { id: "ice-cream", name: "Ice Cream (per scoop)", category: "desserts", price: 6000, dietary: "veg", spice: 0, description: "Choice of vanilla, chocolate or strawberry ice cream. Sometimes simple is all you need." },

  // Indian Teas
  { id: "kashmiri-kahwa", name: "Kashmiri Kahwa (Pot)", category: "teas", price: 14000, dietary: "veg", spice: 0, containsNuts: true, description: "Green tea with saffron, almonds & a touch of magic. A little taste of the Himalayas." },
  { id: "masala-chai", name: "Masala Chai (Pot)", category: "teas", price: 12000, dietary: "veg", spice: 0, description: "Our signature spiced Indian tea brewed with milk and warming spices. The cup that feels like home." },
  { id: "kadak-chai", name: "Kadak Chai (Pot)", category: "teas", price: 12000, dietary: "veg", spice: 0, description: "A strong, full-bodied Indian tea brewed the traditional way. Bold enough to wake your soul." },
  { id: "ginger-chai", name: "Ginger Chai (Pot)", category: "teas", price: 12000, dietary: "veg", spice: 0, description: "Traditional Indian tea infused with fresh ginger. A warming hug with a little kick." },
  { id: "elaichi-chai", name: "Elaichi Chai (Pot)", category: "teas", price: 12000, dietary: "veg", spice: 0, description: "Fragrant Indian milk tea delicately infused with cardamom. Elegant, aromatic and beautifully soothing." },
  { id: "lemon-honey-tea", name: "Lemon & Honey Tea (Pot)", category: "teas", price: 12000, dietary: "veg", spice: 0, description: "Fresh lemon and honey steeped in hot water. Simple comfort in every sip." },
  { id: "green-tea", name: "Green Tea (Pot)", category: "teas", price: 12000, dietary: "vegan", spice: 0, description: "Light, refreshing green tea. Sometimes less really is more." },

  // Coffee
  { id: "irish-coffee", name: "Irish Coffee", category: "coffee", price: 26000, dietary: "veg", spice: 0, description: "Hot coffee with Irish whiskey, sugar & cream. Pure comfort in a cup." },
  { id: "latte-double", name: "Latte (Double)", category: "coffee", price: 16000, dietary: "veg", spice: 0, description: "Double Espresso with steamed milk. Extra coffee. Extra comfort." },
  { id: "cappuccino-double", name: "Cappuccino (Double)", category: "coffee", price: 16000, dietary: "veg", spice: 0, description: "Double espresso with silky steamed milk and velvety foam. Twice the coffee, twice the satisfaction." },
  { id: "latte-single", name: "Latte (Single)", category: "coffee", price: 12000, dietary: "veg", spice: 0, description: "Espresso with steamed milk. Smooth, mellow and effortlessly comforting." },
  { id: "cappuccino-single", name: "Cappuccino (Single)", category: "coffee", price: 12000, dietary: "veg", spice: 0, description: "Espresso with steamed milk foam. Perfectly balanced from first sip to last." },
  { id: "americano", name: "Americano", category: "coffee", price: 12000, dietary: "vegan", spice: 0, description: "Espresso with hot water. Simple, honest coffee done right." },
  { id: "espresso-double", name: "Espresso (Double)", category: "coffee", price: 10000, dietary: "vegan", spice: 0, description: "Small cup. Serious character." },
  { id: "espresso-single", name: "Espresso (Single)", category: "coffee", price: 8000, dietary: "vegan", spice: 0, description: "The shortest route to great coffee." },
  { id: "hot-chocolate", name: "Hot Chocolate", category: "coffee", price: 14000, dietary: "veg", spice: 0, description: "Rich, smooth & chocolatey. Childhood memories in a cup." },
  { id: "babyccino", name: "Babyccino", category: "coffee", price: 8000, dietary: "veg", spice: 0, description: "Steamed milk with a touch of cocoa. Made for our little legends." },
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
