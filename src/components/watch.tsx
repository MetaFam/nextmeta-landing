
import { useInfiniteQuery } from '@tanstack/react-query'
import ErrorMessage from './error'
import { useRef } from 'react';

interface Video {
  id: string;
  videoId: string;
  title: string;
}
export type FetchResponse = {
  items: GoogleApiYouTubePlaylistItemResource[];
  nextPageToken: string;
  pageInfo?: {
    totalResults: number;
  };
};

export default function Watch() {
  const params = {
    part: 'snippet',
    key: import.meta.env.VITE_YOUTUBE_API_KEY,
    playlistId: 'UU6gdZ6Q7Fwfvn-Uu4QKDyhg',
    maxResults: 10,
    fields: 'nextPageToken,items(id,snippet(title,resourceId/videoId))',
  }
  if (!params.key) throw new Error('Must specify VITE_YOUTUBE_API_KEY.')

  const nextPageToken = useRef()

  const args = Object.entries(params).map(
    ([key, val]) => (`${key}=${val}`)
  ).join('&')
  const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?${args}`
  
  const fetchProjects = async ({ pageParam }: { pageParam: string }) => {
    let toGet = `${url}&pageToken=${pageParam}`

    console.debug({ toGet })

    const res = await fetch(toGet)
    const raw = await res.json()
    nextPageToken.current = raw.nextPageToken

    console.log({ raw })

    return (
      raw?.items.map((
        { id, snippet: { title, resourceId: { videoId } } }:
        GoogleApiYouTubePlaylistItemResource
      ) => ({ id, videoId, title })) ?? []
    )
  }

  const {
    data: { pages: videos = [] } = {},
    error,
    fetchNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    initialPageParam: '',
    getNextPageParam: () => (nextPageToken.current),
  })

  console.log({ videos })

  return (
    <section className="collapse max-lg:collapse-arrow md:collapse-open">
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
            <ErrorMessage message={error.message}/>
          ) : (
            <ol>
              {videos.flat().map(({ id, title, videoId }: Video) => {
                const src = `https://www.youtube.com/embed/${videoId}`;
                return (
                  <li
                    className="aspect-video rounded-md overflow-hidden mt-4"
                    key={id}
                  >
                    <iframe {...{ title, src }}  allowFullScreen/>
                  </li>
                )
              })}
              <li>
                <button
                  onClick={() => fetchNextPage()}
                  className="btn btn-primary"
                >
                  More
                </button>
              </li>
            </ol>
          )
        )}
      </div>
    </section>
  )
}
