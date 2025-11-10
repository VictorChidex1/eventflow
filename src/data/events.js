// Sample event data - in real app, this would come from an API
export const events = [
  {
    id: 1,
    title: "Tech Innovation Summit 2024",
    description:
      "Join the biggest tech conference of the year with industry leaders and innovators.",
    date: "2024-12-15",
    time: "09:00 AM",
    location: "Convention Center, Lagos",
    price: 25000, // ₦25,000
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500",
    category: "Conference",
    availableTickets: 45,
    totalTickets: 200,
  },
  {
    id: 2,
    title: "Summer Music Festival",
    description:
      "A weekend of amazing music, food, and fun with top artists from around the world.",
    date: "2024-07-20",
    time: "02:00 PM",
    location: "Tafawa Balewa Square, Lagos",
    price: 15000, // ₦15,000
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500",
    category: "Music",
    availableTickets: 12,
    totalTickets: 500,
  },
  {
    id: 3,
    title: "Startup Pitch Competition",
    description:
      "Watch promising startups pitch their ideas to top investors and win funding.",
    date: "2024-09-05",
    time: "10:00 AM",
    location: "Innovation Hub, Lagos",
    price: 5000, // ₦5,000
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500",
    category: "Business",
    availableTickets: 89,
    totalTickets: 150,
  },
  {
    id: 4,
    title: "Yoga & Wellness Retreat",
    description:
      "Rejuvenate your mind and body with expert instructors in a serene environment.",
    date: "2024-08-12",
    time: "07:00 AM",
    location: "Lekki Conservation Center, Lagos",
    price: 8000, // ₦8,000
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500",
    category: "Wellness",
    availableTickets: 23,
    totalTickets: 50,
  },
  {
    id: 5,
    title: "Food & Wine Expo",
    description:
      "Taste exquisite cuisines and premium wines from top chefs and wineries.",
    date: "2024-10-18",
    time: "06:00 PM",
    location: "Eko Hotels, Lagos",
    price: 12000, // ₦12,000
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
    category: "Food & Drink",
    availableTickets: 67,
    totalTickets: 300,
  },
  {
    id: 6,
    title: "Charity Gala Dinner",
    description:
      "An elegant evening supporting children's education with fine dining and entertainment.",
    date: "2024-11-22",
    time: "07:30 PM",
    location: "Federal Palace Hotel, Lagos",
    price: 30000, // ₦30,000
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500",
    category: "Charity",
    availableTickets: 34,
    totalTickets: 100,
  },
  {
    id: 7,
    title: "Local Band Concert",
    description:
      "An amazing night with the best local bands in town. Rock, pop, and indie music!",
    date: "2024-08-15",
    time: "07:00 PM",
    location: "Federal Palace Hotel, Lagos",
    price: 35000, // ₦25,000,
    image: "/images/concert.png", // Add concert.jpg to public/images/
    category: "Music",
    availableTickets: 120,
    totalTickets: 300,
  },
  {
    id: 8,
    title: "Startup Workshop",
    description:
      "Learn how to launch your startup from successful entrepreneurs and investors.",
    date: "2024-09-10",
    time: "09:00 AM",
    location: "University Of Portharcourt, Rivers",
    price: 0, // Free event!
    image: "/images/workshop.png", // Add workshop.jpg to public/images/
    category: "Business",
    availableTickets: 45,
    totalTickets: 50,
  },
  {
    id: 9,
    title: "Beach Yoga Session",
    description:
      "Morning yoga session on the beach to start your day with peace and energy.",
    date: "2024-07-08",
    time: "06:30 AM",
    location: "Takwa Bay Beach",
    price: 15000,
    image: "/images/yoga.png", // Add yoga.jpg to public/images/
    category: "Wellness",
    availableTickets: 25,
    totalTickets: 30,
  },
  {
    id: 10,
    title: "Contemporary Art Exhibition",
    description:
      "Explore groundbreaking contemporary artworks from emerging and established artists.",
    date: "2024-08-25",
    time: "11:00 AM",
    location: "National Museum, Lagos",
    price: 3000, // ₦3,000
    image: "https://images.unsplash.com/photo-1536922246289-88c42f957773?w=500",
    category: "Art",
    availableTickets: 85,
    totalTickets: 150,
  },
  {
    id: 11,
    title: "Street Art Festival",
    description:
      "Live mural painting, graffiti workshops, and urban art performances in the city center.",
    date: "2024-09-14",
    time: "01:00 PM",
    location: "Yaba Arts District, Lagos",
    price: 0, // Free!
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=500",
    category: "Art",
    availableTickets: 200,
    totalTickets: 500,
  },
  {
    id: 12,
    title: "Lagos City Marathon 2024",
    description:
      "Annual city marathon with routes for beginners to professional runners. Join thousands!",
    date: "2024-10-06",
    time: "07:00 AM",
    location: "National Stadium, Lagos",
    price: 7000, // ₦7,000
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500",
    category: "Sports",
    availableTickets: 234,
    totalTickets: 1000,
  },
  {
    id: 13,
    title: "Basketball Championship Finals",
    description:
      "Watch the season finale of the professional basketball league with top teams competing.",
    date: "2024-06-20",
    time: "08:00 PM",
    location: "Teslim Balogun Stadium, Lagos",
    price: 5000, // ₦5,000
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500",
    category: "Sports",
    availableTickets: 56,
    totalTickets: 200,
  },
  {
    id: 14,
    title: "AI & Machine Learning Conference",
    description:
      "Deep dive into artificial intelligence advancements with hands-on workshops and expert talks.",
    date: "2024-11-08",
    time: "09:00 AM",
    location: "Landmark Center, Lagos",
    price: 35000, // ₦35,000
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500",
    category: "Technology",
    availableTickets: 78,
    totalTickets: 300,
  },
  {
    id: 15,
    title: "Blockchain & Web3 Summit",
    description:
      "Explore the future of decentralized technology, NFTs, and cryptocurrency innovations.",
    date: "2024-09-30",
    time: "10:00 AM",
    location: "Eko Innovation Center, Lagos",
    price: 25000, // ₦25,000
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500",
    category: "Technology",
    availableTickets: 112,
    totalTickets: 250,
  },
  {
    id: 16,
    title: "Digital Skills Bootcamp",
    description:
      "Intensive 2-day bootcamp covering web development, design, and digital marketing skills.",
    date: "2024-08-17",
    time: "09:00 AM",
    location: "University of Lagos",
    price: 45000, // ₦45,000
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500",
    category: "Education",
    availableTickets: 45,
    totalTickets: 50,
  },
  {
    id: 17,
    title: "Public Speaking Masterclass",
    description:
      "Transform your public speaking skills with expert coaches and practical exercises.",
    date: "2024-07-29",
    time: "10:00 AM",
    location: "Muson Center, Lagos",
    price: 20000, // ₦20,000
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500",
    category: "Education",
    availableTickets: 28,
    totalTickets: 40,
  },
];

export const categories = [
  "All",
  "Conference",
  "Music",
  "Business",
  "Wellness",
  "Food & Drink",
  "Charity",
  "Art",
  "Sports",
  "Technology",
  "Education",
];
