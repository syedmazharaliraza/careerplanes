"use client";

import { Clock, Film, Folder, Play } from "lucide-react";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Video {
  name: string;
  uri: string;
  duration: number; // Duration in seconds
  description: string; // Add description field
  thumbnail: string; // Add thumbnail URL
}

interface Folder {
  name: string;
  uri: string;
  videos: Video[];
}

function VimeoVideo({ video }: { video: Video }) {
  const videoId = video.uri.split("/").pop();
  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-4 text-gray-500">
          <h3 className="text-2xl font-bold text-gray-800">{video.name}</h3>
        </div>
        <p className="text-gray-600 mb-4">{video.description}</p>
      </div>
      <div className="p-8">
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          height={425}
          width={1280}
          className="w-full"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  } else {
    return `${remainingSeconds}s`;
  }
}

function FolderSummary({
  folder,
  onVideoSelect,
}: {
  folder: Folder;
  onVideoSelect: (video: Video) => void;
}) {
  const totalDuration = folder.videos.reduce(
    (acc, video) => acc + video.duration,
    0
  );

  // Sort videos by name
  const sortedVideos = [...folder.videos].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Folder className="h-8 w-8 text-blue-500 mr-3" />
        <h3 className="text-2xl font-bold text-gray-800">{folder.name}</h3>
      </div>
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-4 flex items-center">
          <Film className="h-8 w-8 text-blue-500 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Total Videos</p>
            <p className="text-2xl font-bold text-gray-800">
              {folder.videos.length}
            </p>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 flex items-center">
          <Clock className="h-8 w-8 text-green-500 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Total Duration</p>
            <p className="text-2xl font-bold text-gray-800">
              {formatDuration(totalDuration)}
            </p>
          </div>
        </div>
      </div>
      <h4 className="text-xl font-semibold mb-4 text-gray-700">Videos</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedVideos.map((video) => (
          <div
            key={video.uri}
            className="bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
            onClick={() => onVideoSelect(video)}
          >
            <div className="relative aspect-video mb-2">
              {video.thumbnail ? (
                <Image
                  src={video.thumbnail}
                  alt={video.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No thumbnail</span>
                </div>
              )}
            </div>
            <p className="text-sm font-medium text-gray-700 truncate">
              {video.name}
            </p>
            <p className="text-xs text-gray-500">
              {formatDuration(video.duration)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function VimeoLibrary() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFolders() {
      try {
        const response = await fetch("/api/vimeo/folders", {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch folders");
        }
        const foldersData: Folder[] = await response.json();
        // Sort folders by name
        const sortedFolders = foldersData.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setFolders(sortedFolders);
      } catch (error) {
        console.error("Error fetching folders:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFolders();
  }, []);

  const toggleFolder = (folder: Folder) => {
    if (selectedFolder === folder) {
      setSelectedFolder(null);
    } else {
      setSelectedFolder(folder);
    }
    setSelectedVideo(null);
  };

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="vimeo-library bg-gray-100 min-h-screen p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">All courses</h2>
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        <div className="w-full lg:w-1/4">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Folders
            </h3>
            <ul className="space-y-2">
              {folders.map((folder) => (
                <li key={folder.uri}>
                  <div
                    className={`cursor-pointer p-2 rounded-lg transition-colors duration-200 ${
                      selectedFolder === folder
                        ? "bg-blue-100 text-blue-700"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => toggleFolder(folder)}
                  >
                    <div className="flex items-center">
                      <Folder className="h-5 w-5 mr-2" />
                      <span>{folder.name}</span>
                    </div>
                  </div>
                  {selectedFolder === folder && (
                    <ul className="ml-6 mt-2 space-y-1">
                      {folder.videos
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((video) => (
                          <li
                            key={video.uri}
                            className={`cursor-pointer p-1 rounded-md transition-colors duration-200 flex items-center ${
                              selectedVideo === video
                                ? "bg-blue-200 text-blue-800"
                                : "hover:bg-gray-200 text-gray-600"
                            }`}
                            onClick={() => handleVideoSelect(video)}
                          >
                            <Play className="h-4 w-4 mr-2" />
                            <span className="truncate">{video.name}</span>
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full lg:w-3/4">
          {selectedVideo ? (
            <VimeoVideo video={selectedVideo} />
          ) : selectedFolder ? (
            <FolderSummary
              folder={selectedFolder}
              onVideoSelect={handleVideoSelect}
            />
          ) : (
            <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-lg">
              <p className="text-gray-500 text-xl">
                Select a folder or video to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
