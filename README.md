# Tax Payment System (TPS) Frontend

![TPS Frontend](./src/assets/logo.png)

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/TPS-Frontend.git
   cd TPS-Frontend
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Start the development server:

   ```bash
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
  ├── assets/           # Static assets like images and icons
  ├── components/       # Reusable UI components
  │   └── ui/           # Core UI components
  ├── layout/           # Layout components
  ├── lib/              # Utilities and helpers
  ├── pages/            # Page components
  │   ├── login/        # Authentication pages
  │   ├── register/
  │   └── taxDeclaration/ # Tax declaration management
  └── routes/           # Application routing
```

## Development

### Linting

The project uses ESLint for code quality. To run the linter:

```bash
yarn lint
```

### Build for Production

```bash
yarn build
```



