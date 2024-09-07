# TrackVault

TrackVault is a web application for uploading, storing, and playing audio tracks. It's built with Next.js, React, and uses a mock Firebase storage system for demonstration purposes.

## Features

- Upload audio tracks (.mp3, .wav)
- Organize tracks into folders (favorites, playlists, albums)
- Play tracks with a custom audio player
- Dark/Light theme toggle

## Technologies Used

- React with Next.js 14 App Router
- TailwindCSS
- shadcn/ui components
- Mock Firebase storage (using localStorage)
- Lucide React for icons
- next-themes for theme management

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/trackvault.git
   cd trackvault
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

- `/src/app`: Contains the main pages and layout
- `/src/app/components`: React components (FileUpload, AudioPlayer, TrackList)
- `/src/components/ui`: UI components from shadcn/ui
- `/src/lib`: Utility functions and mock Firebase implementation

## Mock Firebase Storage

This project uses a mock Firebase storage system that utilizes localStorage. Uploaded "files" will persist in the browser but won't be accessible across different devices or browsers.

## Contributing

Contributions to TrackVault are welcome. Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
# TrackV
