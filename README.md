# Telco Connect B2B — Full Stack Telecom Platform

Application web full stack simulant l’écosystème digital d’une entreprise télécom B2B : catalogue d’offres, extranet client, commandes, tickets support, dashboard administrateur et API REST sécurisée.

Ce projet a été conçu comme un projet portfolio orienté métier, avec une logique proche d’un environnement réel : séparation des rôles, accès sécurisés, données métier, interface admin, espace client et simulation d’intégration CRM/ERP.

---

## Aperçu du projet

Telco Connect B2B permet à une entreprise télécom de présenter ses offres professionnelles et de gérer ses interactions clients depuis une plateforme centralisée.

L’application contient deux espaces principaux :

- **Espace administrateur** : supervision des commandes, tickets, statistiques et activité globale.
- **Espace client** : consultation du catalogue, création de commandes et ouverture de tickets support.

---

## Fonctionnalités principales

### Authentification et sécurité

- Connexion avec email et mot de passe
- Génération d’un token JWT
- Protection des routes privées
- Gestion des rôles `ADMIN` et `CLIENT`
- Accès différencié selon le profil connecté

### Espace administrateur

- Dashboard avec indicateurs clés
- Nombre de clients
- Nombre d’offres
- Nombre de commandes
- Nombre de tickets
- Revenu simulé
- Vue globale des commandes et tickets

### Espace client

- Consultation du catalogue d’offres télécom
- Création de commandes
- Suivi des commandes
- Création de tickets support
- Interface extranet client

### Catalogue B2B

- Offre Fibre Pro
- Offre VoIP Business
- Offre Cloud Backup
- Offre Cyber Protection

### Support technique

- Création de tickets
- Priorité du ticket : basse, moyenne, haute
- Suivi du statut
- Visualisation côté client et côté admin

### Intégration CRM / ERP simulée

Le backend contient une route webhook permettant de simuler la réception de données depuis un outil externe :

```txt
POST /api/webhooks/crm
