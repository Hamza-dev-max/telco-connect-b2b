# Telco Connect B2B — Plateforme Full Stack Télécom B2B

Telco Connect B2B est une application web full stack qui simule une plateforme digitale pour une entreprise télécom B2B.

L’application permet de présenter des offres télécom professionnelles, gérer des commandes, créer des tickets support et consulter un dashboard administrateur.

Ce projet a été réalisé comme projet portfolio pour montrer une architecture web complète avec un frontend React, un backend Node.js/Express, une API REST, une authentification JWT et une gestion des rôles.

---

## Fonctionnalités principales

### Espace client

- Consulter le catalogue d’offres télécom
- Créer une commande
- Suivre ses commandes
- Créer un ticket support

### Espace administrateur

- Consulter un dashboard avec des statistiques
- Suivre les commandes
- Suivre les tickets support
- Visualiser l’activité globale de la plateforme

### Authentification

- Connexion avec email et mot de passe
- Authentification avec token JWT
- Gestion des rôles `ADMIN` et `CLIENT`
- Protection des routes privées

---

## Stack technique

### Frontend

- React
- Vite
- JavaScript
- HTML
- CSS

### Backend

- Node.js
- Express.js
- API REST
- JWT

### Outils

- Git
- GitHub
- npm

---

## Structure du projet

```txt
telco-connect-b2b/
│
├── backend/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── README.md
└── .gitignore
```

---

# Comment tester l’application en local

Cette partie explique comment lancer le projet directement depuis un terminal.

---

## Prérequis

Avant de lancer le projet, il faut avoir installé :

- Git
- Node.js
- npm

Pour vérifier :

```bash
git --version
node -v
npm -v
```

---

## 1. Cloner le projet

Dans un terminal :

```bash
git clone https://github.com/Hamza-dev-max/telco-connect-b2b.git
cd telco-connect-b2b
```

Vérifier le contenu :

```bash
dir
```

Le projet doit contenir :

```txt
backend
frontend
README.md
```

---

## 2. Lancer le backend

Dans le premier terminal :

```bash
cd backend
npm install
npm start
```

Si `npm start` ne fonctionne pas :

```bash
npm run dev
```

Le backend doit rester ouvert dans ce terminal.

Adresse du backend :

```txt
http://localhost:5000
```

---

## 3. Lancer le frontend

Ouvrir un deuxième terminal.

Depuis la racine du projet :

```bash
cd frontend
npm install
npm run dev
```

Ou directement :

```bash
cd telco-connect-b2b/frontend
npm install
npm run dev
```

Le frontend démarre normalement sur :

```txt
http://localhost:5173
```

---

## 4. Ouvrir l’application

Quand le backend et le frontend sont lancés, ouvrir dans le navigateur :

```txt
http://localhost:5173
```

---

## Comment tester rapidement

Une fois l’application ouverte :

1. Tester la page de connexion
2. Consulter le catalogue d’offres télécom
3. Créer une commande
4. Créer un ticket support
5. Vérifier l’espace client
6. Vérifier le dashboard administrateur si un compte admin est disponible

---

## Résultat attendu

L’application doit afficher une interface web permettant de naviguer entre les différentes pages.

Le frontend React communique avec le backend Express via une API REST.

Le backend gère l’authentification, les rôles utilisateurs, les commandes, les tickets support et les données affichées dans le dashboard.

---

## Ce que ce projet démontre

Ce projet démontre ma capacité à :

- construire une application full stack ;
- séparer clairement le frontend et le backend ;
- créer une API REST avec Express.js ;
- gérer une authentification avec JWT ;
- mettre en place une gestion des rôles ;
- développer une interface React avec Vite ;
- organiser un projet web complet ;
- présenter une logique métier proche d’un contexte professionnel.

---

## Auteur

**Hamza Marzaq**

- GitHub : https://github.com/Hamza-dev-max
- LinkedIn : https://www.linkedin.com/in/hamza-marzaq
- Portfolio : https://hamza-dev-max.github.io/portfolio/
