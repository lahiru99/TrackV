import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Disc3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';

interface AudioPlayerProps {
  src: string;
  title: string;
  artist?: string;
}

export default function AudioPlayer({ src, title, artist }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeChange = (newTime: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime[0];
      setCurrentTime(newTime[0]);
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume[0];
      setVolume(newVolume[0]);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const isTrackSelected = src !== '';

  return (
    <motion.div
      className="bg-secondary p-6 rounded-lg shadow-md space-y-4"
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          {artist && <p className="text-sm text-gray-500">{artist}</p>}
        </div>
        <div className="flex items-center space-x-2">
          <Volume2 size={20} />
          <Slider
            value={[volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="w-24"
          />
        </div>
      </div>
      <div className="flex justify-center space-x-4">
        <Button variant="ghost" size="icon" disabled={!isTrackSelected}>
          <SkipBack size={24} />
        </Button>
        <Button
          variant="default"
          size="icon"
          onClick={togglePlay}
          disabled={!isTrackSelected}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </Button>
        <Button variant="ghost" size="icon" disabled={!isTrackSelected}>
          <SkipForward size={24} />
        </Button>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <motion.div
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={{
              repeat: isPlaying ? Infinity : 0,
              duration: 6,
              ease: 'linear',
            }}
            className="h-6 w-6"
          >
            <Disc3 className="h-6 w-6 opacity-70" />
          </motion.div>
          <span className="text-sm text-muted-foreground">
            {isPlaying ? 'Playing' : 'Paused'}
          </span>
        </div>
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={handleTimeChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <audio ref={audioRef} src={src} />
    </motion.div>
  );
}
