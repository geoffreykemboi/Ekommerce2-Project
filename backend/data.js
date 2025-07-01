const products = [
  {
    name: "SanDisk Ultra 128GB SDXC UHS-I Memory Card up to 80MB/s",
    price: 6500, // ~$45 USD = 6500 KSH
    description:
      "Ultra-fast cards (2) to take better pictures and Full HD videos (1) with your compact to mid-range point-and-shoot cameras and camcorders. With SanDisk Ultra SDXC UHS-I cards you’ll benefit from faster downloads, high capacity, and better performance to capture and store 128GB (5) of high quality pictures and Full HD video (1). Take advantage of ultra-fast read speeds of up to 80MB/s (3) to save time moving photos and videos from the card to your computer. From a leader in flash memory storage, SanDisk Ultra SDXC UHS-I cards are compatible with SDHC and SDXC digital devices, and come with a 10-year limited warranty (6).",
    ratings: 4.5,
    images: [
      {
        public_id: "shopit/demo/nkkjkta63uiazppzkmjf",
        url: "https://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/nkkjkta63uiazppzkmjf.jpg",
      },
    ],
    category: "Electronics",
    seller: "Ebay",
    stock: 50,
    numOfReviews: 32,
    reviews: [],
  },
  {
    name: "CAN USB FD Adapter (GC-CAN-USB-FD)",
    price: 4500, // ~$315 USD = 45000 KSH
    description:
      "Monitor a CAN network, write a CAN program and communicate with industrial, medical, automotive or other CAN based device. Connect CAN FD and CAN networks to a computer via USB with the CAN USB FD adapter.",
    ratings: 1.65,
    images: [
      {
        public_id: "shopit/demo/e3hweb3tbp5zacfi564c",
        url: "https://res.cloudinary.com/udemy-courses/image/upload/v1698577509/shopit/demo/e3hweb3tbp5zacfi564c.jpg",
      },
    ],
    category: "Electronics",
    seller: "Amazon",
    stock: 0,
    numOfReviews: 2,
    reviews: [],
  },
  {
    name: "Logitech G502 HERO High Performance Wired Gaming Mouse",
    price: 7200, // ~$50 USD = 7200 KSH
    description:
      "The Logitech G502 HERO is a high-performance gaming mouse designed for gamers who demand precision and customization. It features a HERO 25K sensor for accurate tracking, customizable RGB lighting, and programmable buttons for personalized control.",
    ratings: 4.7,
    images: [
      {
        public_id: "shopit/demo/g502-hero-mouse",
        url: "https://res.cloudinary.com/udemy-courses/image/upload/v1698577520/shopit/demo/g502-hero-mouse.jpg",
      },
    ],
    category: "Electronics",
    seller: "Best Buy",
    stock: 100,
    numOfReviews: 150,
    reviews: [],
  },
  {
    name: "Samsung Galaxy S21 Ultra 5G",
    price: 170000, // ~$1200 USD = 170000 KSH
    description:
      "The Samsung Galaxy S21 Ultra 5G is a flagship smartphone that offers cutting-edge technology, including a stunning 6.8-inch Dynamic AMOLED display, a powerful Exynos 2100 processor, and an advanced camera system with a 108MP main sensor. It supports 5G connectivity for lightning-fast internet speeds.",
    ratings: 4.8,
    images: [
      {
        public_id: "shopit/demo/s21-ultra-5g",
        url: "https://res.cloudinary.com/udemy-courses/image/upload/v1698577532/shopit/demo/s21-ultra-5g.jpg",
      },
    ],
    category: "Electronics",
    seller: "Samsung",
    stock: 75,
    numOfReviews: 200,
    reviews: [],
  },
  {
    name: "Apple MacBook Pro 13-inch M2",
    price: 180000, // ~$1250 USD = 180000 KSH
    description:
      "The MacBook Pro 13-inch with M2 chip delivers exceptional performance and efficiency. Features a brilliant Retina display, advanced camera and audio, and all-day battery life. Perfect for professionals and creators.",
    ratings: 4.6,
    images: [
      {
        public_id: "shopit/demo/macbook-pro-m2",
        url: "https://res.cloudinary.com/udemy-courses/image/upload/v1698577540/shopit/demo/macbook-pro-m2.jpg",
      },
    ],
    category: "Laptops",
    seller: "Apple",
    stock: 25,
    numOfReviews: 89,
    reviews: [],
  },
  {
    name: "Sony WH-1000XM4 Wireless Headphones",
    price: 42000, // ~$290 USD = 42000 KSH
    description:
      "Industry-leading noise canceling technology meets incredible sound quality and smart listening features for a superior wireless experience. Perfect for travel, work, and entertainment.",
    ratings: 4.7,
    images: [
      {
        public_id: "shopit/demo/sony-headphones",
        url: "https://res.cloudinary.com/udemy-courses/image/upload/v1698577545/shopit/demo/sony-headphones.jpg",
      },
    ],
    category: "Headphones",
    seller: "Sony",
    stock: 60,
    numOfReviews: 156,
    reviews: [],
  },
  {
    name: "Canon EOS R5 Mirrorless Camera",
    price: 520000, // ~$3600 USD = 520000 KSH
    description:
      "Professional full-frame mirrorless camera with 45MP sensor, 8K video recording, and advanced autofocus system. Perfect for professional photographers and videographers.",
    ratings: 4.9,
    images: [
      {
        public_id: "shopit/demo/canon-eos-r5",
        url: "https://res.cloudinary.com/udemy-courses/image/upload/v1698577550/shopit/demo/canon-eos-r5.jpg",
      },
    ],
    category: "Cameras",
    seller: "Canon",
    stock: 15,
    numOfReviews: 78,
    reviews: [],
  },
  {
    name: "Nike Air Max 270 Running Shoes",
    price: 18000, // ~$125 USD = 18000 KSH
    description:
      "Comfortable running shoes with Max Air unit in the heel for ultimate cushioning. Features breathable mesh upper and durable rubber outsole for long-lasting performance.",
    ratings: 4.4,
    images: [
      {
        public_id: "shopit/demo/nike-air-max",
        url: "https://res.cloudinary.com/udemy-courses/image/upload/v1698577555/shopit/demo/nike-air-max.jpg",
      },
    ],
    category: "Sports",
    seller: "Nike",
    stock: 120,
    numOfReviews: 245,
    reviews: [],
  },
  {
    name: "KitchenAid Stand Mixer",
    price: 65000, // ~$450 USD = 65000 KSH
    description:
      "Professional-grade stand mixer perfect for baking and cooking. Features 10 speeds, 5-quart bowl, and comes with multiple attachments for versatile food preparation.",
    ratings: 4.8,
    images: [
      {
        public_id: "shopit/demo/kitchenaid-mixer",
        url: "https://res.cloudinary.com/udemy-courses/image/upload/v1698577560/shopit/demo/kitchenaid-mixer.jpg",
      },
    ],
    category: "Home",
    seller: "KitchenAid",
    stock: 35,
    numOfReviews: 112,
    reviews: [],
  },
  {
    name: "The Complete Guide to Programming",
    price: 3500, // ~$25 USD = 3500 KSH
    description:
      "Comprehensive programming guide covering multiple languages including Python, JavaScript, and Java. Perfect for beginners and intermediate developers looking to expand their skills.",
    ratings: 4.5,
    images: [
      {
        public_id: "shopit/demo/programming-book",
        url: "https://res.cloudinary.com/udemy-courses/image/upload/v1698577565/shopit/demo/programming-book.jpg",
      },
    ],
    category: "Books",
    seller: "TechBooks",
    stock: 200,
    numOfReviews: 89,
    reviews: [],
  },
  {
    name: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
    price: 22000, // ~$150 USD = 22000 KSH
    description:
      "Multi-functional electric pressure cooker that replaces 7 kitchen appliances. Pressure cook, slow cook, rice cooker, steamer, sauté, yogurt maker and warmer all in one.",
    ratings: 4.6,
    images: [
      {
        public_id: "shopit/demo/instant-pot",
        url: "https://res.cloudinary.com/udemy-courses/image/upload/v1698577570/shopit/demo/instant-pot.jpg",
      },
    ],
    category: "Home",
    seller: "Instant Pot",
    stock: 85,
    numOfReviews: 167,
    reviews: [],
  },
  {
    name: "Adidas Ultraboost 22 Running Shoes",
    price: 25000, // ~$175 USD = 25000 KSH
    description:
      "Premium running shoes with Boost midsole for endless energy return. Features Primeknit upper for adaptive fit and Continental rubber outsole for superior traction.",
    ratings: 4.7,
    images: [
      {
        public_id: "shopit/demo/adidas-ultraboost",
        url: "https://res.cloudinary.com/udemy-courses/image/upload/v1698577575/shopit/demo/adidas-ultraboost.jpg",
      },
    ],
    category: "Sports",
    seller: "Adidas",
    stock: 95,
    numOfReviews: 134,
    reviews: [],
  },
  {
    name: "iPad Pro 12.9-inch with M2 Chip",
    price: 145000, // ~$1000 USD = 145000 KSH
    description:
      "The ultimate iPad experience with the powerful M2 chip, stunning Liquid Retina XDR display, and pro cameras. Perfect for creative professionals and productivity tasks.",
    ratings: 4.8,
    images: [
      {
        public_id: "shopit/demo/ipad-pro-m2",
        url: "https://res.cloudinary.com/udemy-courses/image/upload/v1698577580/shopit/demo/ipad-pro-m2.jpg",
      },
    ],
    category: "Electronics",
    seller: "Apple",
    stock: 40,
    numOfReviews: 98,
    reviews: [],
  },
  {
    name: "Bluetooth Wireless Keyboard and Mouse Set",
    price: 8500, // ~$60 USD = 8500 KSH
    description:
      "Ergonomic wireless keyboard and mouse combo with long battery life. Features quiet keys, precise mouse tracking, and universal compatibility with multiple devices.",
    ratings: 4.3,
    images: [
      {
        public_id: "shopit/demo/keyboard-mouse-set",
        url: "https://res.cloudinary.com/udemy-courses/image/upload/v1698577585/shopit/demo/keyboard-mouse-set.jpg",
      },
    ],
    category: "Accessories",
    seller: "Logitech",
    stock: 150,
    numOfReviews: 203,
    reviews: [],
  },
  {
    name: "Organic Green Coffee Beans - 1KG",
    price: 2800, // ~$20 USD = 2800 KSH
    description:
      "Premium organic green coffee beans sourced from Kenya's finest highlands. Perfect for home roasting enthusiasts who want to experience authentic Kenyan coffee flavors.",
    ratings: 4.9,
    images: [
      {
        public_id: "shopit/demo/green-coffee-beans",
        url: "https://res.cloudinary.com/udemy-courses/image/upload/v1698577590/shopit/demo/green-coffee-beans.jpg",
      },
    ],
    category: "Food",
    seller: "Kenya Coffee Co.",
    stock: 300,
    numOfReviews: 287,
    reviews: [],
  },
  {
    name: "Professional Chef Knife Set",
    price: 15000, // ~$105 USD = 15000 KSH
    description:
      "High-quality stainless steel knife set including chef's knife, paring knife, utility knife, and bread knife. Comes with wooden knife block and honing steel.",
    ratings: 4.6,
    images: [
      {
        public_id: "shopit/demo/chef-knife-set",
        url: "https://res.cloudinary.com/udemy-courses/image/upload/v1698577595/shopit/demo/chef-knife-set.jpg",
      },
    ],
    category: "Home",
    seller: "ChefMaster",
    stock: 70,
    numOfReviews: 145,
    reviews: [],
  },
  {
    name: "Yoga Mat Premium Non-Slip",
    price: 4500, // ~$32 USD = 4500 KSH
    description:
      "Premium eco-friendly yoga mat with superior grip and cushioning. Perfect for yoga, pilates, and general fitness exercises. Includes carrying strap.",
    ratings: 4.4,
    images: [
      {
        public_id: "shopit/demo/yoga-mat",
        url: "https://res.cloudinary.com/udemy-courses/image/upload/v1698577600/shopit/demo/yoga-mat.jpg",
      },
    ],
    category: "Sports",
    seller: "FitLife",
    stock: 180,
    numOfReviews: 167,
    reviews: [],
  },
  {
    name: "Camping Tent 4-Person Waterproof",
    price: 12000, // ~$85 USD = 12000 KSH
    description:
      "Spacious 4-person camping tent with waterproof coating and easy setup. Features dual entrances, gear storage vestibule, and excellent ventilation system.",
    ratings: 4.5,
    images: [
      {
        public_id: "shopit/demo/camping-tent",
        url: "https://res.cloudinary.com/udemy-courses/image/upload/v1698577605/shopit/demo/camping-tent.jpg",
      },
    ],
    category: "Outdoor",
    seller: "AdventureGear",
    stock: 45,
    numOfReviews: 92,
    reviews: [],
  },
  {
    name: "Smart Watch Fitness Tracker",
    price: 28000, // ~$195 USD = 28000 KSH
    description:
      "Advanced fitness tracker with heart rate monitoring, GPS, sleep tracking, and 7-day battery life. Water-resistant design perfect for swimming and all outdoor activities.",
    ratings: 4.3,
    images: [
      {
        public_id: "shopit/demo/smart-watch",
        url: "https://res.cloudinary.com/udemy-courses/image/upload/v1698577610/shopit/demo/smart-watch.jpg",
      },
    ],
    category: "Electronics",
    seller: "FitTech",
    stock: 110,
    numOfReviews: 178,
    reviews: [],
  },
  {
    name: "Portable Bluetooth Speaker",
    price: 9500, // ~$65 USD = 9500 KSH
    description:
      "Compact wireless speaker with 360-degree sound, 12-hour battery life, and waterproof design. Perfect for outdoor adventures, parties, and home entertainment.",
    ratings: 4.6,
    images: [
      {
        public_id: "shopit/demo/bluetooth-speaker",
        url: "https://res.cloudinary.com/udemy-courses/image/upload/v1698577615/shopit/demo/bluetooth-speaker.jpg",
      },
    ],
    category: "Electronics",
    seller: "SoundMax",
    stock: 200,
    numOfReviews: 234,
    reviews: [],
  },
  {
    name: "Gaming Mechanical Keyboard RGB",
    price: 13500, // ~$95 USD = 13500 KSH
    description:
      "Professional gaming keyboard with mechanical switches, customizable RGB backlighting, and programmable keys. Features anti-ghosting technology and durable aluminum frame.",
    ratings: 4.7,
    images: [
      {
        public_id: "shopit/demo/gaming-keyboard",
        url: "https://res.cloudinary.com/udemy-courses/image/upload/v1698577620/shopit/demo/gaming-keyboard.jpg",
      },
    ],
    category: "Accessories",
    seller: "GamePro",
    stock: 80,
    numOfReviews: 156,
    reviews: [],
  },
  {
    name: "Organic Honey Raw Unprocessed - 500g",
    price: 1800, // ~$12 USD = 1800 KSH
    description:
      "Pure raw unprocessed honey from local Kenyan beekeepers. Rich in natural enzymes and antioxidants, perfect for healthy living and natural sweetening.",
    ratings: 4.8,
    images: [
      {
        public_id: "shopit/demo/organic-honey",
        url: "https://res.cloudinary.com/udemy-courses/image/upload/v1698577625/shopit/demo/organic-honey.jpg",
      },
    ],
    category: "Food",
    seller: "Pure Nature",
    stock: 250,
    numOfReviews: 198,
    reviews: [],
  }
];

export default products;