# Streaming Video Next.js

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=ernivani&repo=streaming-video-next.js&show_owner=true&theme=radical)](https://github.com/ernivani/streaming-video-next.js)

Streaming Video Next.js is a repository that contains a Next.js project for streaming and downloading videos. This application leverages the power of Next.js, React, MongoDB, and Prisma to provide a seamless video streaming experience, allowing users to download and watch high-quality videos in 4K resolution using the HLS (HTTP Live Streaming) protocol.

## Features

- **Video Streaming**: The application uses the HLS protocol to stream videos, ensuring smooth playback across different devices and network conditions.
- **Video Download**: Users can download videos in 4K resolution for offline viewing.
- **Next.js**: The project is built with Next.js, a popular React framework that offers server-side rendering, efficient routing, and a great development experience.
- **React**: The UI components and interactions are developed using React, providing a modular and reusable codebase.
- **MongoDB**: MongoDB is integrated into the project for storing video metadata and user information.
- **Prisma**: Prisma serves as the database toolkit and ORM, allowing easy and efficient interaction with the MongoDB database.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the Repository**: Start by cloning the repository to your local machine.

```bash
git clone https://github.com/ernivani/streaming-video-next.js.git
```

2. **Install Dependencies**: Navigate to the project directory and install the necessary dependencies.

```bash
cd streaming-video-next.js
npm install
```

3. **Set Up Environment Variables**: Create a `.env` file in the root directory and configure the following environment variables:

```dotenv
# MongoDB connection URL
MONGODB_URL=your_mongodb_url
```

4. **Run the Application**: Start the development server to run the application locally.

```bash
npm run dev
```

5. **Access the Application**: Once the server is running, access the application by visiting [http://localhost:3000](http://localhost:3000) in your web browser.

## Project Structure

The project structure is organized as follows:

- `pages/`: Contains the Next.js pages that define the application routes.
- `public/`: Stores static assets such as videos, images, and stylesheets.
- `components/`: Contains reusable React components used throughout the application.
- `lib/`: Includes utility functions, helper classes, and configuration files.
- `prisma/`: Contains the Prisma schema and migration files for managing the database.
- `styles/`: Stores global CSS styles and styling modules for components.

Feel free to explore the codebase, customize the application, and extend its functionality to suit your specific requirements.

## Contributing

Contributions to this project are highly appreciated. If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request on the GitHub repository.

## License

This project is licensed under the [MIT License](LICENSE), which means you are free to use, modify, and distribute the code for personal or commercial purposes.

## Contact

For any further questions or inquiries, please feel free to reach out to me at contact@impin.fr.