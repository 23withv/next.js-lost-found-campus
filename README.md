```markdown
# Campus L&F (Lost and Found)

Campus L&F is a modern, web-based Lost and Found management system built specifically for campus environments. It streamlines the process of reporting lost belongings, cataloging found items, and handling secure claim verifications through a robust role-based architecture.

## Key Features by Role

The platform implements strict Role-Based Access Control (RBAC) to ensure data integrity and secure moderation.

### Public Access (Unauthenticated)
* **Item Catalog**: Browse all currently reported "Lost" and "Found" items across the campus.
* **Item Details**: View specific characteristics, locations, and dates of lost items without needing an account.

### Pelapor (Authenticated Users)
* **Submit Reports**: Create detailed reports for items you have lost or found around the campus.
* **Claim Requests**: Securely submit a claim request for items listed as "Found" by providing proof of ownership.
* **Report History**: Track the current status and resolution of your active and past reports.

### Administrator
* **Analytics Dashboard**: Access real-time metric cards (Total Reports, Found Items, Lost Items, Claimed Items, Registered Users) and recent activity tables.
* **Item Management**: Moderate all listings, edit details, and manually mark "Lost" items as "Claimed" when resolved.
* **Claim Verification**: Review incoming user claims with the authority to explicitly approve or reject them based on provided evidence.
* **User Management**: Oversee platform registration and manage user access levels.

## Tech Stack

* **Framework**: [Next.js](https://nextjs.org/) (App Router)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Database**: [MongoDB](https://www.mongodb.com/) via Mongoose
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
* **Authentication**: NextAuth

## Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
Ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v18.17 or higher)
* [pnpm](https://pnpm.io/) package manager
* A running MongoDB instance (Local or MongoDB Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/23withv/next.js-lost-found-campus.git
cd next.js-lost-found-campus
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory and configure the required environment variables. Refer to the structure below:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>
AUTH_SECRET=your_super_secret_string_here
AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Run the Development Server
```bash
pnpm dev
```

Once the server compiles successfully, navigate to `http://localhost:3000` in your browser to interact with the application.

```