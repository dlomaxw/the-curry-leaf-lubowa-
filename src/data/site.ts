// Central site configuration.
// Phone/WhatsApp and map location are the restaurant's real details.
// Email remains a PLACEHOLDER until confirmed.
export const site = {
  name: "The Curry Leaf",
  tagline: "Indian Kitchen & Social House",
  location: "Lubowa, Kampala — off Entebbe Road",
  phone: "+256 765 176232",
  phoneHref: "+256765176232",
  whatsapp: "256765176232",
  email: "hello@thecurryleaf.ug",
  map: {
    // Shared by the restaurant — opens the Google Maps listing.
    link: "https://maps.app.goo.gl/5DZxxpmSJF39UjJu5",
    lat: 0.2445361,
    lng: 32.5654654,
    // Keyless embed of the same coordinates.
    embed:
      "https://www.google.com/maps?q=0.2445361,32.5654654&z=16&hl=en&output=embed",
  },
  hours: {
    // PLACEHOLDER breakfast service window — confirm with the restaurant.
    breakfast: "7am – 11am, every day",
    lunch: "12pm – 3pm, every day",
    dinner: "6pm – 10:30pm, every day",
    buffet: "Sunday Grand Buffet · 12pm – 3pm",
  },
  // PLACEHOLDER delivery policy — confirm zones, fee and minimum order.
  delivery: {
    areas: "Lubowa, Kajjansi, Munyonyo, Entebbe Road and nearby areas",
    note: "Delivery fee is confirmed by our team when we call you back, and depends on your location.",
  },
};

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
