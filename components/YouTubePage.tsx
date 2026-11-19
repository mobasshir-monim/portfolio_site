import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Play } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';
import { EASE } from './ui/Reveal';

// Set these in Vercel (Project → Settings → Environment Variables) or in a local .env file.
// Restrict the key to your domain in Google Cloud Console → Credentials → HTTP referrers.
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || 'UCIYGvE7l-WOidwC_vHqG8zw';
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY as string | undefined;
const CHANNEL_URL = SOCIAL_LINKS.find((l) => l.platform === 'YouTube')?.url ?? 'https://www.youtube.com';

interface Video {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: { medium: { url: string }; high?: { url: string } };
    publishedAt: string;
  };
}

const decode = (s: string) => {
  const t = document.createElement('textarea');
  t.innerHTML = s;
  return t.value;
};

const YoutubePage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!API_KEY) {
      setError('The video feed isn’t configured yet.');
      setLoading(false);
      return;
    }
    const ctrl = new AbortController();
    fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&type=video&maxResults=9`,
      { signal: ctrl.signal }
    )
      .then((r) => {
        if (!r.ok) throw new Error('Failed to fetch videos');
        return r.json();
      })
      .then((data) => setVideos(data.items ?? []))
      .catch((err) => {
        if (err.name !== 'AbortError') setError('Couldn’t load the latest videos right now.');
      })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, []);

  const [featured, ...rest] = videos;

  return (
    <main className="min-h-screen px-6 pb-24 pt-40 md:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE }}>
          <p className="eyebrow mb-5 flex items-center gap-3">
            <span>Channel</span>
            <span className="h-px w-8 bg-gold/50" />
            <span>Latest uploads</span>
          </p>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h1 className="font-serif text-6xl leading-[0.9] tracking-tight md:text-8xl">
              Stories on <em className="text-gold-soft">screen.</em>
            </h1>
            <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="btn-primary self-start md:self-auto">
              Visit channel <ArrowUpRight size={16} />
            </a>
          </div>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute">
            Explainers on science, engineering and the world around us — making complex ideas accessible and worth thinking about.
          </p>
        </motion.div>

        <div className="mt-20">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`animate-pulse rounded-3xl bg-white/[0.04] ${i === 0 ? 'aspect-video md:col-span-3' : 'aspect-video'}`} />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-white/10 bg-ink-2 p-10 text-center md:p-16">
              <p className="font-serif text-3xl">{error}</p>
              <p className="mx-auto mt-3 max-w-md text-mute">In the meantime, all videos are available directly on YouTube.</p>
              <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-8">
                Watch on YouTube <ArrowUpRight size={16} />
              </a>
            </div>
          ) : (
            <div className="grid gap-x-6 gap-y-12 md:grid-cols-3">
              {featured && (
                <VideoCard video={featured} featured index={0} />
              )}
              {rest.map((v, i) => (
                <VideoCard key={v.id.videoId} video={v} index={i + 1} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

const VideoCard: React.FC<{ video: Video; featured?: boolean; index: number }> = ({ video, featured, index }) => (
  <motion.a
    href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: EASE, delay: (index % 3) * 0.06 }}
    className={`group block ${featured ? 'md:col-span-3 md:grid md:grid-cols-[1.6fr_1fr] md:items-end md:gap-10' : ''}`}
  >
    <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-ink-3">
      <img
        src={video.snippet.thumbnails.high?.url ?? video.snippet.thumbnails.medium.url}
        alt={decode(video.snippet.title)}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
      />
      <span className="absolute inset-0 grid place-items-center bg-ink/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-ivory text-ink">
          <Play size={20} className="ml-0.5 fill-current" />
        </span>
      </span>
    </div>
    <div className={featured ? 'mt-6 md:mt-0' : 'mt-5'}>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
        {featured ? 'Latest · ' : ''}
        {new Date(video.snippet.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
      </p>
      <h3 className={`mt-3 font-serif leading-snug text-ivory transition-colors duration-500 group-hover:text-gold-soft ${featured ? 'text-4xl md:text-5xl' : 'line-clamp-2 text-2xl'}`}>
        {decode(video.snippet.title)}
      </h3>
      {featured && <p className="mt-4 line-clamp-3 leading-relaxed text-mute">{decode(video.snippet.description)}</p>}
    </div>
  </motion.a>
);

export default YoutubePage;
