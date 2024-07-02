# DashPayRentals Frontend

**This is a short description of how someone would operate a Dash Platform Frontend.**

1. Copy this github repository to your own github account. https://github.com/DashMoney/DashPayRentals-Frontend
2. Connect copied Github repository to hosting service (Vercel - I use Hobby-free edition).
3. Add environment variables and domain name to hosting service.
   • See Below\*
4. Hosting service builds and deploys. (You are now a Dash Platform Frontend Entrepreneur.)

\*These are the environmental variable that you need to create for operation:

- VITE_FRONTEND_NAME = Rentals
- VITE_MERCHANT_IDENTITY = (This is your Dash IdentityID)
- VITE_BKGD = primary
- VITE_NETWORK = testnet

_Frontend Name is what will appear in the top of page navigation bar._

\_Merchant Identity can be found on your Account Login page

_BKGD is 'Background' which can be dark or primary_

\_NETWORK can be testnet or mainnet

### React + Vite (Everything else is from initial Vite setup)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
