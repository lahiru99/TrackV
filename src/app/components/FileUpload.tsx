import React, { useState } from 'react';
import { uploadFile } from '@/lib/firebase/mockFirebaseUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [added, setAdded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      await uploadFile(file, `tracks/${file.name}`);
      console.log('File uploaded successfully:', file.name, 'to tracks/');
      setAdded(true);
      setFile(null);
      // Notify TrackList to refresh immediately
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('tracks-updated'));
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
    setUploading(false);
    // brief success state
    setTimeout(() => setAdded(false), 900);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Upload New Track</h2>
      <Input
        type="file"
        accept=".mp3,.wav"
        onChange={handleFileChange}
        className="mb-2"
      />
      <motion.div
        initial={false}
        animate={{ scale: added ? 1.02 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full"
        >
          {added ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Added to tracks
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              {uploading ? 'Uploading...' : 'Add to tracks'}
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
}
