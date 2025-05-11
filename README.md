# StoreIt - Cloud Storage Management Solution

## Overview

StoreIt is a modern cloud storage solution that provides seamless file access and management from anywhere. Organize, upload, and share your files securely through an intuitive web interface.

## Live Demo

[Try StoreIt](https://storagemanagementsolution-production.up.railway.app/sign-in)

## Features

- **File Management**: Upload, organize, and download various file types
- **Dashboard**: Visual representation of storage usage with charts
- **File Categories**: Easily navigate through different file types
- **Secure Authentication**: User accounts with email-based authentication
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI, shadcn/ui components
- **Authentication**: Custom auth implementation
- **File Storage**: Appwrite BaaS
- **Charts**: Recharts for storage visualization
- **Forms**: React Hook Form with Zod validation
- **Deployment**: Railway

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/storage_management_solution.git
   cd storage_management_solution
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   Create a `.env.local` file in the root directory with your configuration (see `.env.example` for required variables)

4. Run the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

The project is configured for easy deployment on Railway. You can also deploy on Vercel or any other Node.js hosting platform.

## License

[MIT](LICENSE)

## Acknowledgments

- NextJS team for the amazing framework
- The Appwrite team for their backend service
- All open-source contributors whose libraries made this project possible
