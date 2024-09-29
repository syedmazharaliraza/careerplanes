import { NextResponse } from 'next/server';
import { Vimeo } from 'vimeo';
import { getServerSession } from "next-auth/next";
import { getSession } from '@/lib/auth';

interface VimeoFolder {
    name: string;
    uri: string;
}

interface VimeoVideo {
    name: string;
    uri: string;
    duration: number;
    description: string;
    pictures: {
        sizes: Array<{
            width: number;
            height: number;
            link: string;
        }>;
    };
}

interface VimeoResponse<T> {
    data: T[];
}

export async function GET() {
    // Check for authenticated session
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const vimeo = new Vimeo(
        process.env.VIMEO_CLIENT_ID!,
        process.env.VIMEO_CLIENT_SECRET!,
        process.env.VIMEO_ACCESS_TOKEN!
    );

    try {
        const foldersResponse: VimeoResponse<VimeoFolder> = await new Promise((resolve, reject) => {
            vimeo.request({
                method: 'GET',
                path: '/me/projects'
            }, (error, body) => {
                if (error) reject(error);
                else resolve(body);
            });
        });

        const foldersWithVideos = await Promise.all(
            foldersResponse.data.map(async (folder: VimeoFolder) => {
                const videosResponse: VimeoResponse<VimeoVideo> = await new Promise((resolve, reject) => {
                    vimeo.request({
                        method: 'GET',
                        path: `/me/projects/${folder.uri.split("/").pop()}/videos`,
                        query: {
                            fields: 'name,uri,duration,description,pictures'
                        }
                    },
                        (error, body) => {
                            if (error) reject(error);
                            else resolve(body);
                        });
                });

                return {
                    ...folder,
                    videos: videosResponse.data.map(video => {
                        return {
                            name: video.name,
                            uri: video.uri,
                            duration: video.duration,
                            description: video.description,
                            thumbnail: video.pictures?.sizes?.[2]?.link || null // Use optional chaining and provide a fallback
                        };
                    })
                };
            })
        );

        return NextResponse.json(foldersWithVideos);
    } catch (error) {
        console.error('Error fetching Vimeo folders and videos:', error);
        return NextResponse.json({ error: 'Failed to fetch Vimeo data' }, { status: 500 });
    }
}
