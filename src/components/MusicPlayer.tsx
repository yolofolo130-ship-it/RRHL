import { useEffect, useRef, useState } from "react";
import { tracks } from "@/data/tracks";

const formatTime = (seconds: number): string => {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [playlistOpen, setPlaylistOpen] = useState(false);

  const track = tracks[trackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, trackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = volume;
  }, [volume]);

  const goTo = (index: number) => {
    setTrackIndex((index + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    setIsPlaying((playing) => !playing);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const value = Number(e.target.value);
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-bg-0/95 backdrop-blur-md">
      <audio
        ref={audioRef}
        src={track.src}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onEnded={() => goTo(trackIndex + 1)}
      />

      {playlistOpen && (
        <div className="max-h-64 overflow-y-auto border-b border-line bg-bg-1">
          <ul className="mx-auto px-6 py-2 lg:px-10">
            {tracks.map((t, i) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  className={`flex w-full items-center justify-between gap-4 rounded px-3 py-2 text-left text-sm transition-colors duration-150 ${
                    i === trackIndex
                      ? "text-white"
                      : "text-ink-2 hover:text-ink-0"
                  }`}
                >
                  <span className="flex items-center gap-3 truncate">
                    <span className="w-4 shrink-0 text-xs text-ink-3">
                      {i === trackIndex && isPlaying ? "▶" : i + 1}
                    </span>
                    <span className="truncate">
                      {t.artist ? `${t.artist} — ${t.title}` : t.title}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mx-auto flex items-center gap-4 px-6 py-3 lg:px-10">
        <div className="hidden min-w-0 flex-1 sm:flex sm:flex-col">
          <span className="truncate text-sm font-semibold text-ink-0">
            {track.title}
          </span>
          {track.artist && (
            <span className="truncate text-xs text-ink-2">{track.artist}</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous track"
            onClick={() => goTo(trackIndex - 1)}
            className="flex h-8 w-8 items-center justify-center text-ink-1 transition-colors duration-150 hover:text-white"
          >
            ⏮
          </button>
          <button
            type="button"
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={togglePlay}
            className="flex h-10 w-10 items-center justify-center border border-line text-ink-0 transition-colors duration-150 hover:border-line-strong hover:text-white"
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button
            type="button"
            aria-label="Next track"
            onClick={() => goTo(trackIndex + 1)}
            className="flex h-8 w-8 items-center justify-center text-ink-1 transition-colors duration-150 hover:text-white"
          >
            ⏭
          </button>
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span className="w-9 shrink-0 text-right text-xs text-ink-3">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="h-1 w-full min-w-0 flex-1 cursor-pointer appearance-none rounded-full bg-line accent-white"
            style={{
              background: `linear-gradient(to right, #fff ${progressPct}%, rgba(255,255,255,0.1) ${progressPct}%)`,
            }}
          />
          <span className="w-9 shrink-0 text-xs text-ink-3">
            {formatTime(duration)}
          </span>
        </div>

        <input
          type="range"
          aria-label="Volume"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="hidden h-1 w-20 cursor-pointer appearance-none rounded-full bg-line accent-white md:block"
        />

        <button
          type="button"
          aria-label="Toggle playlist"
          aria-expanded={playlistOpen}
          onClick={() => setPlaylistOpen((open) => !open)}
          className={`shrink-0 border border-line px-3 py-2 text-xs font-semibold tracking-[0.14em] transition-colors duration-150 ${
            playlistOpen ? "text-white" : "text-ink-2 hover:text-ink-0"
          }`}
        >
          TRACKS
        </button>
      </div>
    </div>
  );
}
