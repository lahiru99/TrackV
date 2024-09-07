import React, { useState } from 'react';
import { uploadFile } from '@/lib/firebase/mockFirebaseUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Upload } from 'lucide-react';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [folder, setFolder] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !folder) return;
    setUploading(true);
    try {
      await uploadFile(file, `tracks/${folder}/${file.name}`);
      console.log(
        'File uploaded successfully:',
        file.name,
        'to folder:',
        folder
      );
      alert('File uploaded successfully!');
      setFile(null);
      // Trigger a storage event to refresh the TrackList
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
    setUploading(false);
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
      <Select onValueChange={setFolder}>
        <SelectTrigger>
          <SelectValue placeholder="Select folder" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="favorites">Favorites</SelectItem>
          <SelectItem value="playlists">Playlists</SelectItem>
          <SelectItem value="albums">Albums</SelectItem>
        </SelectContent>
      </Select>
      <Button
        onClick={handleUpload}
        disabled={!file || !folder || uploading}
        className="w-full"
      >
        <Upload className="mr-2 h-4 w-4" />
        {uploading ? 'Uploading...' : 'Upload'}
      </Button>
    </div>
  );
}
