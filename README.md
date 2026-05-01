\# Telco Connect B2B — Plateforme Full Stack Télécom



\## Description



Telco Connect B2B est une application web full stack simulant l'écosystème digital d'une entreprise télécom B2B.



Le projet contient :

\- une page d'accueil professionnelle,

\- un système de connexion,

\- un espace administrateur,

\- un espace client,

\- un catalogue d'offres télécom,

\- un système de commandes,

\- une gestion de tickets support,

\- une API REST sécurisée avec JWT,

\- une simulation d'intégration CRM/ERP via webhook.



\## Objectif du projet



Ce projet a été développé pour démontrer des compétences concrètes en développement web full stack, API REST, authentification sécurisée, gestion des rôles, extranet client et dashboard métier.



\## Fonctionnalités principales



\### Authentification



\- Connexion avec email et mot de passe

\- Génération d'un token JWT

\- Protection des routes privées

\- Séparation des rôles Admin et Client



\### Espace Admin



\- Dashboard avec statistiques

\- Vue globale des commandes

\- Vue globale des tickets support

\- Suivi du revenu simulé

\- Supervision de l'activité



\### Espace Client



\- Consultation du catalogue d'offres

\- Création de commandes

\- Suivi des commandes

\- Création de tickets support



\### Catalogue B2B



\- Offres Internet

\- Offres Téléphonie

\- Offres Cloud

\- Offres Cybersécurité



\### API REST



Routes principales :



\- `POST /api/auth/login`

\- `GET /api/offers`

\- `GET /api/orders`

\- `POST /api/orders`

\- `GET /api/tickets`

\- `POST /api/tickets`

\- `GET /api/dashboard`

\- `POST /api/webhooks/crm`



\### Simulation CRM / ERP



Le projet contient une route webhook simulant l'intégration avec un outil externe de type CRM ou ERP.



\## Stack technique



\### Frontend



\- React

\- JavaScript

\- CSS responsive

\- Axios

\- Lucide React



\### Backend



\- Node.js

\- Express.js

\- JWT

\- bcryptjs

\- dotenv

\- cors

\- morgan



\## Comptes de démonstration



\### Admin



Email :



```txt

admin@sctconnect.fr

