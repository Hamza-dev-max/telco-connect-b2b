require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "secret";

const users = [
  {
    id: 1,
    name: "Admin SCT",
    email: "admin@sctconnect.fr",
    password: bcrypt.hashSync("admin123", 10),
    role: "ADMIN"
  },
  {
    id: 2,
    name: "Client Demo",
    email: "client@sctconnect.fr",
    password: bcrypt.hashSync("client123", 10),
    role: "CLIENT"
  }
];

const offers = [
  {
    id: 1,
    name: "Fibre Pro 1Gb/s",
    category: "Internet",
    price: 49.99,
    description: "Connexion fibre professionnelle haute disponibilite."
  },
  {
    id: 2,
    name: "VoIP Business",
    category: "Telephonie",
    price: 19.99,
    description: "Solution de telephonie IP pour entreprises."
  },
  {
    id: 3,
    name: "Pack Cyber Protection",
    category: "Securite",
    price: 39.99,
    description: "Protection reseau, supervision et support securite."
  },
  {
    id: 4,
    name: "Cloud Backup Pro",
    category: "Cloud",
    price: 29.99,
    description: "Sauvegarde automatique des donnees professionnelles."
  }
];

const orders = [
  {
    id: 1,
    userId: 2,
    offerId: 1,
    status: "En cours d'installation",
    total: 49.99,
    createdAt: "2026-05-01"
  },
  {
    id: 2,
    userId: 2,
    offerId: 3,
    status: "Active",
    total: 39.99,
    createdAt: "2026-05-01"
  }
];

const tickets = [
  {
    id: 1,
    userId: 2,
    subject: "Probleme de connexion fibre",
    priority: "Haute",
    status: "Ouvert",
    message: "La connexion est instable depuis ce matin.",
    createdAt: "2026-05-01"
  }
];

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: "2h" }
  );
}

function authRequired(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Token invalide ou expire" });
  }
}

function adminRequired(req, res, next) {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Acces reserve a l'administrateur" });
  }

  next();
}

app.get("/", (req, res) => {
  res.json({
    project: "SCT Connect",
    description: "API REST pour plateforme B2B Telecom",
    status: "online"
  });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ message: "Email ou mot de passe incorrect" });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({ message: "Email ou mot de passe incorrect" });
  }

  const token = generateToken(user);

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

app.get("/api/offers", (req, res) => {
  res.json(offers);
});

app.get("/api/orders", authRequired, (req, res) => {
  if (req.user.role === "ADMIN") {
    return res.json(orders);
  }

  const clientOrders = orders.filter((order) => order.userId === req.user.id);
  res.json(clientOrders);
});

app.post("/api/orders", authRequired, (req, res) => {
  const { offerId } = req.body;

  const offer = offers.find((item) => item.id === Number(offerId));

  if (!offer) {
    return res.status(404).json({ message: "Offre introuvable" });
  }

  const newOrder = {
    id: orders.length + 1,
    userId: req.user.id,
    offerId: offer.id,
    status: "Commande recue",
    total: offer.price,
    createdAt: new Date().toISOString().slice(0, 10)
  };

  orders.push(newOrder);

  res.status(201).json(newOrder);
});

app.get("/api/tickets", authRequired, (req, res) => {
  if (req.user.role === "ADMIN") {
    return res.json(tickets);
  }

  const clientTickets = tickets.filter((ticket) => ticket.userId === req.user.id);
  res.json(clientTickets);
});

app.post("/api/tickets", authRequired, (req, res) => {
  const { subject, priority, message } = req.body;

  const newTicket = {
    id: tickets.length + 1,
    userId: req.user.id,
    subject,
    priority,
    status: "Ouvert",
    message,
    createdAt: new Date().toISOString().slice(0, 10)
  };

  tickets.push(newTicket);

  res.status(201).json(newTicket);
});

app.get("/api/dashboard", authRequired, adminRequired, (req, res) => {
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);

  res.json({
    totalUsers: users.length,
    totalOffers: offers.length,
    totalOrders: orders.length,
    totalTickets: tickets.length,
    revenue: Number(revenue.toFixed(2))
  });
});

app.post("/api/webhooks/crm", (req, res) => {
  console.log("Webhook CRM recu :", req.body);

  res.json({
    message: "Webhook CRM traite avec succes",
    receivedData: req.body
  });
});

app.listen(PORT, () => {
  console.log(`SCT Connect API running on http://localhost:${PORT}`);
});