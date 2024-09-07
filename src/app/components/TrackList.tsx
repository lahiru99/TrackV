import React, { useEffect, useState } from 'react';
import { listFiles, getFileUrl } from '@/lib/firebase/mockFirebaseUtils';
import AudioPlayer from './AudioPlayer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Track {
  name: string;
  url: string;
  artist?: string;
}

export default function TrackList() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const fetchTracks = async () => {
    const files = await listFiles(`tracks/`);
    console.log('Files retrieved:', files);
    const trackPromises = files.map(async (file) => ({
      name: file.name,
      url: await getFileUrl(file.fullPath),
      artist: 'Unknown Artist', // You can update this if you have artist information
    }));
    const trackList = await Promise.all(trackPromises);
    console.log('Tracks processed:', trackList);
    setTracks(trackList);
    if (trackList.length > 0 && !selectedTrack) {
      setSelectedTrack(trackList[0]);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  // Add this effect to listen for storage changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'mockFirebaseStorage') {
        fetchTracks();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Your Tracks</h2>
      <ScrollArea className="h-[300px] w-full rounded-md border p-4">
        {tracks.map((track) => (
          <div
            key={track.name}
            className="flex items-center justify-between p-2 hover:bg-secondary rounded-md cursor-pointer"
            onClick={() => setSelectedTrack(track)}
          >
            <div>
              <p className="font-medium">{track.name}</p>
              <p className="text-sm text-gray-500">{track.artist}</p>
            </div>
            <Button variant="ghost" size="sm">
              <Play size={16} />
            </Button>
          </div>
        ))}
      </ScrollArea>
      <AudioPlayer
        src={selectedTrack?.url || ''}
        title={selectedTrack?.name || 'No track selected'}
        artist={selectedTrack?.artist}
      />
    </div>
  );
}
