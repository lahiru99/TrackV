'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import FileUpload from '@/app/components/FileUpload';
import TrackList from '@/app/components/TrackList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Music, Upload, ListMusic, Share2, Sun, Moon } from 'lucide-react';

export default function TrackVault() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="container mx-auto p-4 min-h-screen bg-background text-foreground">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <Music className="mr-2 h-8 w-8" /> TrackVault
        </h1>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="upload">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="tracks">
            <ListMusic className="mr-2 h-4 w-4" />
            Tracks
          </TabsTrigger>
          <TabsTrigger value="share">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          <FileUpload />
        </TabsContent>
        <TabsContent value="tracks">
          <TrackList key={Date.now()} />
        </TabsContent>
        <TabsContent value="share">
          <h2 className="text-2xl font-semibold mb-4">Share Your Music</h2>
          <p>Sharing functionality coming soon...</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
