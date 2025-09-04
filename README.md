# Cosmetic Magazine Admin Panel

A modern Vue.js admin panel for managing cosmetic magazines with a beautiful dark theme and rich text editing capabilities.

## Features

- 🎨 **Dark Theme UI** - Modern, professional dark theme design
- ✏️ **Rich Text Editor** - Powered by Vue Quill for content editing
- 📱 **Responsive Design** - Works perfectly on all device sizes
- 🔐 **Role-based Authentication** - Admin and editor access control
- 📝 **Magazine Management** - Full CRUD operations for magazines
- 📄 **Section Management** - Create and manage magazine sections
- 🛍️ **Product Integration** - Link products to magazine sections
- 🏷️ **Category Management** - Organize magazines by categories
- 🔍 **Search & Filter** - Find magazines quickly with advanced filtering

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe development
- **Pinia** - State management
- **Vue Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vue Quill** - Rich text editor
- **Axios** - HTTP client
- **Headless UI** - Accessible UI components

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Laravel backend running on http://localhost:8000

## Installation

1. Navigate to the admin panel directory:
   ```bash
   cd admin-panel
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Configuration

The admin panel is configured to connect to the Laravel backend at `http://localhost:8000`. To change this, update the `baseURL` in `src/main.ts`:

```typescript
axios.defaults.baseURL = 'http://your-backend-url'
```

## Authentication

The admin panel requires users with `admin` or `editor` roles. Make sure your Laravel backend has users with these roles in the database.

## Usage

### Login
1. Navigate to the login page
2. Enter your admin/editor credentials
3. You'll be redirected to the dashboard upon successful login

### Managing Magazines
1. Go to the Magazines section
2. Click "Create Magazine" to add a new magazine
3. Fill in the basic information and content
4. Add sections with rich text content
5. Link products to sections if needed
6. Set visibility and other settings
7. Save your changes

### Dashboard
The dashboard provides an overview of:
- Total magazines count
- Published magazines
- Featured magazines
- Total sections
- Recent magazines list
- Quick action buttons

## API Endpoints

The admin panel uses the following API endpoints:

- `GET /api/v1/admin/magazines` - List magazines
- `POST /api/v1/admin/magazines` - Create magazine
- `GET /api/v1/admin/magazines/{id}` - Get magazine
- `PUT /api/v1/admin/magazines/{id}` - Update magazine
- `DELETE /api/v1/admin/magazines/{id}` - Delete magazine
- `GET /api/v1/admin/magazines/0/categories` - Get categories
- `GET /api/v1/admin/magazines/0/products` - Get products

## Development

### Project Structure
```
admin-panel/
├── src/
│   ├── components/          # Reusable components
│   │   └── Layout/         # Layout components
│   ├── stores/             # Pinia stores
│   ├── views/              # Page components
│   ├── router/             # Vue Router configuration
│   └── assets/             # Static assets
├── public/                 # Public assets
└── package.json
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is part of the Cosmetic application suite.