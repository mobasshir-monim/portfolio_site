import React, { useEffect, useState } from 'react';
import { Youtube, ExternalLink, Play, Calendar, Eye } from 'lucide-react';

// REPLACE THIS WITH YOUR ACTUAL CHANNEL ID AND API KEY
const CHANNEL_ID = 'UCIYGvE7l-WOidwC_vHqG8zw'; // e.g., UCxxxxxxxx
const API_KEY = 'AIzaSyBlPLqVceCx_oiEFcGnYAQ9O3DUQcqRoXA';

interface Video {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: { medium: { url: string } };
    publishedAt: string;
  };
}

const YoutubePage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=9`
        );
        
        if (!response.ok) throw new Error('Failed to fetch videos');
        
        const data = await response.json();
        setVideos(data.items);
      } catch (err) {
        setError('Could not load videos. Please check API key or quota.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-red-600/10 rounded-full mb-4">
            <Youtube className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Latest <span className="text-red-500">Videos</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Stay updated with my latest tutorials, tech reviews, and project showcases directly from YouTube.
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-400 bg-red-900/10 rounded-xl border border-red-900/50">
            <p>{error}</p>
            <p className="text-sm mt-2 text-slate-500">Note: This requires a valid API Key in the code.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <a 
                key={video.id.videoId}
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-900/20"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={video.snippet.thumbnails.medium.url} 
                    alt={video.snippet.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      <Play className="w-5 h-5 text-white fill-current" />
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 font-mono">
                    <Calendar size={12} />
                    {new Date(video.snippet.publishedAt).toLocaleDateString()}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
                    {video.snippet.title}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                    {video.snippet.description}
                  </p>
                  <div className="flex items-center text-red-500 text-sm font-medium">
                    Watch Video <ExternalLink size={14} className="ml-1" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default YoutubePage;