import React, { useEffect, useState } from 'react';
import {
  listFiles,
  getFileUrl,
  deleteFile,
} from '@/lib/firebase/mockFirebaseUtils';
import AudioPlayer from './AudioPlayer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Play, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reorder, motion } from 'framer-motion';
import HoverTilt from '@/components/HoverTilt';

interface Track {
  name: string;
  url: string;
  artist?: string;
}

export default function TrackList() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchTracks = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
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
      <ScrollArea className="h-[300px] w-full rounded-md border p-2">
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-12 rounded-md bg-muted" />
              </div>
            ))}
          </div>
        ) : tracks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full grid place-items-center text-muted-foreground"
          >
            No tracks yet. Upload one to get started.
          </motion.div>
        ) : (
          <Reorder.Group axis="y" values={tracks} onReorder={setTracks}>
            {tracks.map((track) => (
              <Reorder.Item key={track.name} value={track}>
                <HoverTilt className="rounded-md">
                  <motion.div
                    layout
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99, rotate: 0.25 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="flex items-center justify-between p-3 hover:bg-secondary rounded-md cursor-grab active:cursor-grabbing select-none"
                    onClick={() => setSelectedTrack(track)}
                  >
                    <div>
                      <p className="font-medium">{track.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {track.artist}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Play size={16} />
                      </Button>
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          // optimistic remove
                          setTracks((prev) =>
                            prev.filter((t) => t.name !== track.name)
                          );
                          // remove from mock storage
                          // We don't have fullPath here; reconstruct from name via list path
                          deleteFile(`tracks/${track.name}`);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="h-8 w-8 grid place-items-center rounded-md hover:bg-destructive/10"
                        aria-label={`Delete ${track.name}`}
                      >
                        <Trash2 className="h-4 w-4 transition-colors hover:text-destructive" />
                      </motion.button>
                    </div>
                  </motion.div>
                </HoverTilt>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </ScrollArea>
      <AudioPlayer
        src={selectedTrack?.url || ''}
        title={selectedTrack?.name || 'No track selected'}
        artist={selectedTrack?.artist}
      />
    </div>
  );
}
