# Saree & Co — Frontend

React + Vite frontend for the Saree & Co fashion e-commerce and blog platform. Connects to the Spring Boot backend API for authentication, orders, posts, and contact inquiries.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite |
| Routing | React Router v6 |
| State | useContext + useReducer |
| HTTP Client | Fetch API (custom apiClient) |
| Styling | CSS (custom, responsive) |
| Prop Validation | PropTypes |

---

## Prerequisites

- Node.js 18+
- npm 9+
- Backend API running (see [fashionblog backend](https://github.com/aliza12343/fashionblog))

---

## Local Setup

### 1 — Install dependencies

```bash
cd frontend
npm install
```

### 2 — Configure environment

Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:8081/api
```

### 3 — Run development server

```bash
npm run dev
```

App runs at `http://localhost:5173`

### 4 — Build for production

```bash
npm run build
```

Output goes to `frontend/dist/`

---

## Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | HomePage | Landing page with brand intro |
| `/shop` | ShopPage | Full product catalog |
| `/saree` | SareePage | Saree collection |
| `/lehenga` | LehengaPage | Lehenga collection |
| `/jewelry` | JewelryPage | Jewelry collection |
| `/lookbook` | LookbookPage | Editorial lookbook |
| `/checkout` | CheckoutPage | Cart + order placement |
| `/contact` | ContactPage | Consultation inquiry form |
| `/login` | LoginPage | User authentication |
| `/register` | RegisterPage | New account registration |

---

## Project Structure

```
frontend/src/
├── api/
│   ├── apiClient.js       # Base fetch wrapper — injects JWT, handles errors, 10s timeout
│   ├── authApi.js         # Login and register calls
│   ├── contactApi.js      # Contact form submission
│   ├── ordersApi.js       # Order placement
│   └── productsApi.js     # Product data
├── components/
│   ├── Button.jsx         # Reusable button with loading state
│   ├── Card.jsx           # Product / content card
│   ├── Input.jsx          # Form input with label and error display
│   ├── Modal.jsx          # Accessible modal overlay
│   ├── Skeleton.jsx       # Loading skeleton screens
│   ├── Spinner.jsx        # Loading spinner
│   ├── StoreLayout.jsx    # Shared page layout (nav + footer)
│   └── Table.jsx          # Data table component
├── context/
│   ├── AuthContext.jsx    # Global auth state (useReducer + useContext)
│   └── CartContext.jsx    # Global cart state (useReducer + useMemo)
├── pages/
│   ├── CheckoutPage.jsx   # Cart management + order form + API submission
│   ├── ContactPage.jsx    # Consultation inquiry form
│   ├── HomePage.jsx       # Landing page
│   ├── JewelryPage.jsx    # Jewelry collection
│   ├── LehengaPage.jsx    # Lehenga collection
│   ├── LoginPage.jsx      # Login form with validation
│   ├── LookbookPage.jsx   # Lookbook editorial
│   ├── RegisterPage.jsx   # Registration form with validation
│   ├── SareePage.jsx      # Saree collection
│   └── ShopPage.jsx       # Full shop catalog
├── data/
│   └── products.js        # Static product catalog
├── App.jsx                # Route definitions
└── main.jsx               # App entry point with providers
```

---

## Key Features

**Authentication**
- JWT stored in `localStorage`, auto-injected into every API request
- Token expiry checked on page load — expired tokens are cleared automatically
- Protected redirect: logged-in users are redirected away from login/register pages

**Cart**
- Persisted in `localStorage` across sessions
- `useReducer` handles add, update quantity, remove, and clear actions
- `useMemo` computes item count and subtotal efficiently

**Checkout**
- Full form validation before submission
- Real-time card number and expiry formatting
- Spinner shown during order submission
- Order confirmation displayed on success

**Forms**
- Client-side validation with field-level error messages
- `aria-invalid`, `role="alert"`, and `aria-label` for accessibility
- Loading states prevent double-submission
