import { useInfiniteQuery } from '@tanstack/react-query'
import Error from './error'

interface Video {
  id: string;
  videoId: string;
  title: string;
}
type FetchResponse = {
  items: GoogleApiYouTubePlaylistItemResource[];
  nextPageToken: string;
  pageInfo?: {
    totalResults: number;
  };
};


export default function Watch() {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY
  const playlistId = 'UU6gdZ6Q7Fwfvn-Uu4QKDyhg'
  const limit = 10

  if (!apiKey) throw new Error('Must specify VITE_YOUTUBE_API_KEY.')

  const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${limit}&playlistId=${playlistId}&key=${apiKey}`
  
  const fetchProjects = async ({ pageParam }: { pageParam: number }) => {
    const res = await fetch(`${url}`)
    const raw = await res.json()
    return (
      raw?.items.map((video: GoogleApiYouTubePlaylistItemResource) => ({
        id: video.id,
        videoId: video.snippet.resourceId.videoId,
        title: video.snippet.title,
      })) ?? []
    )
  }

  const {
    data: { pages: [videos] = [] } = {},
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  })
  console.log({videos})
  return (
    <section className="collapse collapse-arrow md:collapse-open">
      <input id="watch-open" type="radio" name="accordion"/>
      <div id="watch" className="collapse-title card bg-base-100 shadow-xl">
        <figure>
          <img
            src="/assets/nextmeta-logo.webp"
            alt="NextMeta"
            className="w-full" />
        </figure>
      </div>
      <div className="collapse-content">
        {isPending ? (
          <div className="loading loading-spinner loading-lg mx-auto pt-16"></div>
        ) : (
          error ? (
            <Error message={error.message}/>
          ) : (
              <ol>
                {videos.map((video: Video) => {
                  const url = `https://www.youtube.com/embed/${video?.videoId}`;
                  return (
                    <li
                      className="aspect-video rounded-md overflow-hidden mt-4"
                      key={video.id}
                    >
                      <iframe
                        title={video?.title}
                        src={url}
                        allowFullScreen
                      />
                    </li>
                  )
                })}
              </ol>
          )
        )}
      </div>
    </section>
  )
}