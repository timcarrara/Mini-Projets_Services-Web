# Mini-Projets_Services-Web
# 🔐 Projet : Authentification et Gestion des Sessions avec Vue.js et Node.js

## 👥 Réalisé par :
- CARRARA Tim
- ROSE Mathéo
- 
## 📝 Description du Projet

Ce projet explore trois méthodes d’authentification et de gestion des sessions via des mini-projets utilisant **Vue.js** en frontend et **Node.js** en backend.

Il a pour but d’approfondir la compréhension des stratégies de sécurité modernes dans le développement web.

---

## 📦 Structure du Projet

### Mini-projet 1 : Authentification avec Passport-Local et Session

- **Backend** : Node.js + Express.js + Passport.js
- **Frontend** : Vue.js
- **Base de données** : PostgreSQL ou MySQL (via Sequelize ORM)
- **Sessions** : Cookies (avec express-session)

#### Fonctionnalités :
- Inscription et connexion d’utilisateurs
- Authentification via `passport-local`
- Session persistée via cookies
- Accès à une page sécurisée après login

---

### Mini-projet 2 : Authentification avec JWT (JSON Web Token)

- **Backend** : Node.js + Express.js + JWT
- **Frontend** : Vue.js
- **Base de données** : PostgreSQL ou MySQL (Sequelize ORM)
- **Token** : Stocké côté client (LocalStorage / SessionStorage)

#### Fonctionnalités :
- Inscription / connexion avec génération de JWT
- Accès sécurisé avec vérification du token
- Stockage côté client
- Route protégée avec middleware JWT

---

### Mini-projet 3 : Authentification OAuth2 avec Google + Chat temps réel

- **Backend** : Node.js + Express.js + Passport (Google Strategy)
- **Frontend** : Vue.js
- **Base de données** : MongoDB + Mongoose
- **Cache** : Redis
- **WebSocket** : Socket.io

#### Fonctionnalités :
- Auth via Google OAuth2
- Connexion sécurisée + sessions stockées dans Redis
- Interface de chat en temps réel entre utilisateurs
- Historique de messages stocké en base

---

## 🚀 Lancer le Projet

### 📁 Prérequis

- Node.js ≥ 16.x
- Vue.js = 2.x
- PostgreSQL / MySQL / MongoDB
- Redis
- npm ou yarn

### ⚙️ Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/timcarrara/Mini-Projets_Services-Web.git
cd Mini-Projets_Services-Web

# 2. Installer les dépendances backend
cd backend
npm install

# 3. Configurer l'environnement
# Modifier les infos dans un fichier .env : MDP BDD, USER BDD, ...

# 4. Lancer le backend
node server.js

# 5. Lancer le frontend
cd ../frontend (frontend-new pour l'authentification OAUTH)
npm install
npm run serve
