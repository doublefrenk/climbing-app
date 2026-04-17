/* eslint-disable no-undef */
db = db.getSiblingDB('climbingdb');

try {
  // Clear existing data
  db.routes.deleteMany({});
  db.users.deleteMany({});
  
  // Users data
  const users = [
    {
      clerkId: "user_3B58sk63mf8oFc7vaIbk12wYQqt",
      name: "Franco Savino",
      email: "forest9946@gmail.com",
      age: 30,
      location: "Italy",
      climbingLevel: "advanced",
      photo: "/images/me/me.jpg",
      lastRoute: "Via Classica",
    
      favoriteClimbingStyle: "sport",
      motto: "Climb now, work later",
    },
    {
      clerkId: "user_3B79KNRpZrqORDMGy8vROwEo4lM",
      name: "Eleonora Fabriani",
      email: "ele.fabriani@gmail.com",
      age: 40,
      location: "Italy",
      climbingLevel: "expert",
      photo: "/images/me/Eleonora.jpg",
      lastRoute: "Spigolo Nord",
      favoriteClimbingStyle: "boulder",
      motto: "Strong body, strong mind",
    }
  ];

  // Insert users first
  const insertedUsers = db.users.insertMany(users);
  const userIds = Object.values(insertedUsers.insertedIds);
  const marioId = userIds[0];
  const annaId = userIds[1];

  // Mario's routes - first half of your routes
  const marioRoutes = [
    { type: "boulder", id: 1, title: "Via Classica", grade: "6a", rating: 4.5, genre: "crimpy", comments: ["Great route!"], sendDate: new Date("2024-03-01"), sector: "Cave Sector", attempts: 3, users: [marioId] },
    { type: "boulder", id: 2, title: "Spigolo Nord", grade: "5c", rating: 4.2, genre: "slab", comments: ["Nice exposure."], sendDate: new Date("2024-03-02"), sector: "North Wall", attempts: 1, users: [marioId] },
    { type: "boulder", id: 3, title: "Cengia Verde", grade: "6b", rating: 4.7, genre: "overhang", comments: ["Technical crux."], sendDate: new Date("2024-03-03"), sector: "Green Ledge", attempts: 5, users: [marioId] },
    { type: "sport", id: 19, title: "Via Classica Sport", grade: "6a", rating: 4.5, genre: "crimpy", comments: ["Great route!"], sendDate: new Date("2024-03-01"), sector: "Arco", attempts: 2, users: [marioId] },
    { type: "sport", id: 20, title: "Spigolo Nord Sport", grade: "5c", rating: 4.2, genre: "slab", comments: ["Nice exposure."], sendDate: new Date("2024-03-02"), sector: "Finale Ligure", attempts: 1, users: [marioId] },
    { type: "gymRoutes", id: 51, title: "Pilastro Giallo", grade: "7b+", rating: 4.8, genre: "overhang", comments: ["Powerful moves."], sendDate: new Date("2024-04-02"), sector: "Indoor Gym", attempts: 6, users: [marioId] }
  ];

  // Anna's routes - different routes
  const annaRoutes = [
    { type: "boulder", id: 4, title: "Pilastro Rosso", grade: "7a", rating: 4.8, genre: "cruxy", comments: ["Challenging!"], sendDate: new Date("2024-03-04"), sector: "Red Pillar", attempts: 8, users: [annaId] },
    { type: "boulder", id: 5, title: "Fessura Nascosta", grade: "6c", rating: 4.3, genre: "finger crack", comments: ["Hidden gem."], sendDate: new Date("2024-03-05"), sector: "Hidden Valley", attempts: 4, users: [annaId] },
    { type: "boulder", id: 6, title: "Placche Bianche", grade: "5b", rating: 4.0, genre: "slab", comments: ["Slabby fun."], sendDate: new Date("2024-03-06"), sector: "White Slabs", attempts: 2, users: [annaId] },
    { type: "sport", id: 21, title: "Cengia Verde Sport", grade: "6b", rating: 4.7, genre: "overhang",comments: ["Technical crux."], sendDate: new Date("2024-03-03"), sector: "Kalymnos", attempts: 3, users: [annaId] },
    { type: "sport", id: 22, title: "Pilastro Rosso Sport", grade: "7a", rating: 4.8, genre: "cruxy", comments: ["Challenging!"], sendDate: new Date("2024-03-04"), sector: "Rodellar", attempts: 5, users: [annaId] },
    { type: "gymRoutes", id: 52, title: "Placche Verdi", grade: "5b+", rating: 4.0, genre: "slab", comments: ["Colorful rock."], sendDate: new Date("2024-04-03"), sector: "Indoor Gym", attempts: 2, users: [annaId] }
  ];

  // Insert Mario's routes
  db.routes.insertMany(marioRoutes);

  // Insert Anna's routes
  db.routes.insertMany(annaRoutes);

  
  print('Success! Users and routes created with separate relationships');
  print('Mario has ' + marioRoutes.length + ' routes');
  print('Anna has ' + annaRoutes.length + ' routes');
  
} catch (error) {
  print('Error inserting data:', error);
}