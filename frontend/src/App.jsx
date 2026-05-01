import { useEffect, useMemo, useState } from "react";
import { api, setAuthToken } from "./api";
import {
  BarChart3,
  Boxes,
  Building2,
  CheckCircle2,
  Cloud,
  CreditCard,
  DatabaseZap,
  FileText,
  Headphones,
  Home,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Network,
  Phone,
  PlugZap,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Ticket,
  UserRound,
  Wifi,
  Zap
} from "lucide-react";

export default function App() {
  const [user, setUser] = useState(null);
  const [activeView, setActiveView] = useState("dashboard");

  const [offers, setOffers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [dashboard, setDashboard] = useState(null);

  const [email, setEmail] = useState("admin@sctconnect.fr");
  const [password, setPassword] = useState("admin123");

  const [ticketForm, setTicketForm] = useState({
    subject: "",
    priority: "Moyenne",
    message: ""
  });

  async function loadPublicData() {
    try {
      const res = await api.get("/offers");
      setOffers(res.data);
    } catch (error) {
      console.error("Erreur chargement offres", error);
    }
  }

  async function loadPrivateData(currentUser = user) {
    try {
      const ordersRes = await api.get("/orders");
      const ticketsRes = await api.get("/tickets");

      setOrders(ordersRes.data);
      setTickets(ticketsRes.data);

      if (currentUser?.role === "ADMIN") {
        const dashRes = await api.get("/dashboard");
        setDashboard(dashRes.data);
      }
    } catch (error) {
      console.error("Erreur chargement donnees privees", error);
    }
  }

  useEffect(() => {
    loadPublicData();
  }, []);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      setAuthToken(res.data.token);
      setUser(res.data.user);
      setActiveView("dashboard");
      await loadPrivateData(res.data.user);
    } catch (error) {
      alert("Connexion impossible. Verifie que le backend est bien lance.");
      console.error(error);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
    setOrders([]);
    setTickets([]);
    setDashboard(null);
    setActiveView("dashboard");
  }

  async function createOrder(offerId) {
    try {
      await api.post("/orders", { offerId });
      await loadPrivateData();
      alert("Commande creee avec succes.");
    } catch (error) {
      alert("Erreur pendant la commande.");
      console.error(error);
    }
  }

  async function createTicket(e) {
    e.preventDefault();

    try {
      await api.post("/tickets", ticketForm);

      setTicketForm({
        subject: "",
        priority: "Moyenne",
        message: ""
      });

      await loadPrivateData();
      alert("Ticket cree avec succes.");
    } catch (error) {
      alert("Erreur pendant la creation du ticket.");
      console.error(error);
    }
  }

  const revenue = useMemo(() => {
    return orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  }, [orders]);

  const activeOrders = orders.filter((order) => order.status === "Active").length;
  const pendingOrders = orders.length - activeOrders;

  if (!user) {
    return (
      <div className="public-page">
        <header className="public-hero">
          <nav className="public-nav">
            <div className="brand">
              <div className="brand-icon">
                <Network size={24} />
              </div>
              <span>SCT Connect</span>
            </div>

            <div className="nav-badge">
              <ShieldCheck size={16} />
              API REST securisee
            </div>
          </nav>

          <div className="hero-grid">
            <div className="hero-left">
              <p className="eyebrow">Plateforme B2B Telecom — Full Stack</p>

              <h1>
                E-commerce, extranet client, support et dashboard admin dans une
                seule plateforme.
              </h1>

              <p className="hero-text">
                Projet portfolio professionnel simulant l'ecosysteme digital
                d'une entreprise telecom B2B : catalogue d'offres, commandes,
                tickets support, API JWT et connecteur CRM/ERP.
              </p>

              <div className="hero-actions">
                <button
                  onClick={() => {
                    setEmail("admin@sctconnect.fr");
                    setPassword("admin123");
                  }}
                >
                  Demo Admin
                </button>

                <button
                  className="secondary-btn"
                  onClick={() => {
                    setEmail("client@sctconnect.fr");
                    setPassword("client123");
                  }}
                >
                  Demo Client
                </button>
              </div>

              <div className="hero-stack">
                <span>React</span>
                <span>Node.js</span>
                <span>Express</span>
                <span>JWT</span>
                <span>REST API</span>
                <span>CRM Webhook</span>
              </div>
            </div>

            <div className="login-panel">
              <div className="panel-header">
                <div>
                  <p>Acces demo</p>
                  <h2>Connexion</h2>
                </div>
                <LockKeyhole size={26} />
              </div>

              <form onSubmit={handleLogin}>
                <label>Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />

                <label>Mot de passe</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                  type="password"
                />

                <button className="full-btn">Se connecter</button>
              </form>

              <div className="demo-box">
                <p>
                  <strong>Admin :</strong> admin@sctconnect.fr / admin123
                </p>
                <p>
                  <strong>Client :</strong> client@sctconnect.fr / client123
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="public-features">
          <Feature icon={<ShoppingCart />} title="E-commerce B2B" text="Catalogue d'offres telecom, commandes et suivi commercial." />
          <Feature icon={<UserRound />} title="Extranet client" text="Espace client avec commandes, support et services actifs." />
          <Feature icon={<BarChart3 />} title="Dashboard admin" text="Indicateurs, revenus simules, tickets et pilotage metier." />
          <Feature icon={<PlugZap />} title="Connecteur CRM/ERP" text="Webhook simule pour integration applicative externe." />
        </section>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <Network size={22} />
          </div>
          <div>
            <strong>SCT Connect</strong>
            <span>B2B Telecom</span>
          </div>
        </div>

        <nav className="side-nav">
          <SideButton icon={<LayoutDashboard />} label="Dashboard" active={activeView === "dashboard"} onClick={() => setActiveView("dashboard")} />
          <SideButton icon={<Boxes />} label="Catalogue" active={activeView === "catalog"} onClick={() => setActiveView("catalog")} />
          <SideButton icon={<ShoppingCart />} label="Commandes" active={activeView === "orders"} onClick={() => setActiveView("orders")} />
          <SideButton icon={<Headphones />} label="Support" active={activeView === "support"} onClick={() => setActiveView("support")} />
          <SideButton icon={<DatabaseZap />} label="Integrations" active={activeView === "integrations"} onClick={() => setActiveView("integrations")} />
        </nav>

        <div className="sidebar-profile">
          <div className="avatar">
            {user.role === "ADMIN" ? "A" : "C"}
          </div>
          <div>
            <strong>{user.name}</strong>
            <span>{user.role}</span>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          Deconnexion
        </button>
      </aside>

      <main className="main-area">
        <TopBar user={user} />

        {activeView === "dashboard" && (
          <DashboardView
            user={user}
            dashboard={dashboard}
            orders={orders}
            tickets={tickets}
            revenue={revenue}
            activeOrders={activeOrders}
            pendingOrders={pendingOrders}
          />
        )}

        {activeView === "catalog" && (
          <CatalogView offers={offers} user={user} createOrder={createOrder} />
        )}

        {activeView === "orders" && (
          <OrdersView orders={orders} offers={offers} />
        )}

        {activeView === "support" && (
          <SupportView
            tickets={tickets}
            ticketForm={ticketForm}
            setTicketForm={setTicketForm}
            createTicket={createTicket}
          />
        )}

        {activeView === "integrations" && <IntegrationsView />}
      </main>
    </div>
  );
}

function TopBar({ user }) {
  return (
    <div className="topbar">
      <div>
        <p>Bienvenue, {user.name}</p>
        <h1>Plateforme digitale B2B Telecom</h1>
      </div>

      <div className="topbar-status">
        <CheckCircle2 size={18} />
        API connectee
      </div>
    </div>
  );
}

function DashboardView({
  user,
  dashboard,
  orders,
  tickets,
  revenue,
  activeOrders,
  pendingOrders
}) {
  return (
    <section className="view">
      <div className="view-header">
        <div>
          <p>Vue globale</p>
          <h2>Dashboard {user.role === "ADMIN" ? "administrateur" : "client"}</h2>
        </div>

        <span className="role-pill">{user.role}</span>
      </div>

      <div className="kpi-grid">
        <KpiCard icon={<Building2 />} label="Clients" value={dashboard?.totalUsers || 1} />
        <KpiCard icon={<Boxes />} label="Offres" value={dashboard?.totalOffers || 4} />
        <KpiCard icon={<ShoppingCart />} label="Commandes" value={orders.length} />
        <KpiCard icon={<Ticket />} label="Tickets" value={tickets.length} />
        <KpiCard icon={<CreditCard />} label="Revenu simule" value={`${(dashboard?.revenue || revenue).toFixed ? (dashboard?.revenue || revenue).toFixed(2) : dashboard?.revenue || revenue} EUR`} />
      </div>

      <div className="dashboard-grid">
        <div className="analytics-card">
          <div className="card-title">
            <h3>Etat des commandes</h3>
            <span>Temps reel</span>
          </div>

          <div className="bar-row">
            <div>
              <strong>Commandes actives</strong>
              <span>{activeOrders}</span>
            </div>
            <div className="progress">
              <div style={{ width: `${orders.length ? (activeOrders / orders.length) * 100 : 0}%` }} />
            </div>
          </div>

          <div className="bar-row">
            <div>
              <strong>Commandes en attente</strong>
              <span>{pendingOrders}</span>
            </div>
            <div className="progress orange">
              <div style={{ width: `${orders.length ? (pendingOrders / orders.length) * 100 : 0}%` }} />
            </div>
          </div>

          <div className="security-box">
            <ShieldCheck size={28} />
            <div>
              <strong>Authentification securisee</strong>
              <p>Routes protegees par JWT et separation des roles Admin / Client.</p>
            </div>
          </div>
        </div>

        <div className="activity-card">
          <div className="card-title">
            <h3>Activite recente</h3>
            <span>CRM / Support</span>
          </div>

          <Timeline label="Nouvelle commande B2B recue" time="Aujourd'hui" />
          <Timeline label="Ticket support ouvert" time="Aujourd'hui" />
          <Timeline label="Synchronisation CRM simulee" time="Webhook" />
          <Timeline label="Dashboard admin mis a jour" time="Live API" />
        </div>
      </div>
    </section>
  );
}

function CatalogView({ offers, user, createOrder }) {
  return (
    <section className="view">
      <div className="view-header">
        <div>
          <p>Catalogue commercial</p>
          <h2>Offres telecom B2B</h2>
        </div>
      </div>

      <div className="catalog-grid">
        {offers.map((offer) => (
          <div className="product-card" key={offer.id}>
            <div className="product-top">
              <div className="product-icon">
                {offer.category === "Internet" && <Wifi />}
                {offer.category === "Telephonie" && <Phone />}
                {offer.category === "Cloud" && <Cloud />}
                {offer.category === "Securite" && <ShieldCheck />}
              </div>

              <span>{offer.category}</span>
            </div>

            <h3>{offer.name}</h3>
            <p>{offer.description}</p>

            <div className="product-footer">
              <strong>{offer.price} EUR / mois</strong>
              <button onClick={() => createOrder(offer.id)}>
                {user.role === "ADMIN" ? "Simuler" : "Commander"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function OrdersView({ orders, offers }) {
  return (
    <section className="view">
      <div className="view-header">
        <div>
          <p>Suivi commercial</p>
          <h2>Commandes et abonnements</h2>
        </div>
      </div>

      <div className="table-card premium-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Offre</th>
              <th>Statut</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => {
              const offer = offers.find((o) => o.id === order.offerId);

              return (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{offer?.name || "Offre supprimee"}</td>
                  <td>
                    <span className={order.status === "Active" ? "status green" : "status blue"}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.total} EUR</td>
                  <td>{order.createdAt}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function SupportView({ tickets, ticketForm, setTicketForm, createTicket }) {
  return (
    <section className="view">
      <div className="view-header">
        <div>
          <p>Support technique</p>
          <h2>Tickets clients</h2>
        </div>
      </div>

      <div className="support-layout">
        <form className="form-card" onSubmit={createTicket}>
          <h3>Creer un ticket</h3>

          <label>Sujet</label>
          <input
            placeholder="Ex : Probleme de connexion fibre"
            value={ticketForm.subject}
            onChange={(e) =>
              setTicketForm({ ...ticketForm, subject: e.target.value })
            }
            required
          />

          <label>Priorite</label>
          <select
            value={ticketForm.priority}
            onChange={(e) =>
              setTicketForm({ ...ticketForm, priority: e.target.value })
            }
          >
            <option>Basse</option>
            <option>Moyenne</option>
            <option>Haute</option>
          </select>

          <label>Message</label>
          <textarea
            placeholder="Decrivez le probleme..."
            value={ticketForm.message}
            onChange={(e) =>
              setTicketForm({ ...ticketForm, message: e.target.value })
            }
            required
          />

          <button className="full-btn">Envoyer le ticket</button>
        </form>

        <div className="tickets-list">
          {tickets.map((ticket) => (
            <div className="ticket-card" key={ticket.id}>
              <div>
                <strong>{ticket.subject}</strong>
                <p>{ticket.message}</p>
              </div>

              <div className="ticket-meta">
                <span className="status blue">{ticket.status}</span>
                <span>{ticket.priority}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IntegrationsView() {
  return (
    <section className="view">
      <div className="view-header">
        <div>
          <p>Architecture applicative</p>
          <h2>Integrations CRM, ERP et webhooks</h2>
        </div>
      </div>

      <div className="integration-grid">
        <IntegrationCard
          icon={<DatabaseZap />}
          title="CRM"
          text="Synchronisation des clients, prospects et informations commerciales via webhook."
        />

        <IntegrationCard
          icon={<FileText />}
          title="ERP"
          text="Simulation de flux commandes, factures et suivi administratif."
        />

        <IntegrationCard
          icon={<CreditCard />}
          title="Paiement"
          text="Paiement simule et creation automatique d'une commande client."
        />

        <IntegrationCard
          icon={<Rocket />}
          title="API REST"
          text="Backend Express structure avec routes publiques et routes protegees JWT."
        />
      </div>

      <div className="architecture-card">
        <h3>Flux technique du projet</h3>

        <div className="flow">
          <span>Frontend React</span>
          <Zap size={18} />
          <span>API Express</span>
          <Zap size={18} />
          <span>JWT Auth</span>
          <Zap size={18} />
          <span>CRM Webhook</span>
        </div>
      </div>
    </section>
  );
}

function KpiCard({ icon, label, value }) {
  return (
    <div className="kpi-card">
      <div className="kpi-icon">{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function SideButton({ icon, label, active, onClick }) {
  return (
    <button className={active ? "side-btn active" : "side-btn"} onClick={onClick}>
      {icon}
      {label}
    </button>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="feature-card">
      <div>{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function IntegrationCard({ icon, title, text }) {
  return (
    <div className="integration-card">
      <div>{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Timeline({ label, time }) {
  return (
    <div className="timeline-item">
      <div className="dot" />
      <div>
        <strong>{label}</strong>
        <span>{time}</span>
      </div>
    </div>
  );
}