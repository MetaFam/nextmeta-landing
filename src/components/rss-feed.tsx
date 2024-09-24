import { useQuery } from '@tanstack/react-query'

type RSSItem = {
  id: string
  title: string
  description: string
  link: string
  published: number
  enclosures: Array<{
    url: string
    type: string
  }>
}

export default function RSSFeed({ url }: { url: string }) {

  const { isPending, error, data } = useQuery({
    queryKey: [`pods-${url}`],
    queryFn: () => (
      fetch(url).then((res) => res.json())
    ),
  })

  return (
    <section id="listen" className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src="/assets/nextmeta-logo.webp"
          alt="NextMeta"
          className="w-full" />
      </figure>
      {isPending ? (
        <div className="loading loading-spinner loading-lg mx-auto pt-16"></div>
      ) : (
        error ? (
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error.message}</span>
          </div>  
        ) : (
          <div>
            <ol className="card-actions justify-end">
              {data.items.map((item: RSSItem) => {
                const image = item.enclosures.find((enc) => (
                  enc.type.startsWith('image/')
                ))
                const audio = item.enclosures.find((enc) => (
                  enc.type.startsWith('audio/')
                ))
                return (
                  <li className="w-[34ch] md:w-[44ch] flex flex-col justify-center min-h-52 mt-4 bg-contain bg-no-repeat bg-center" key={item.id} id={item.id}>
                  <div className="relative cursor-pointer blackout">
                      {image && (
                        <a href={item.link} target="_blank" className="hover:underline">
                        <img className="rounded-lg absolute max-h-64" src={image?.url} alt="image description"/>
                        </a>
                      )}
                    <div className="flex flex-col justify-center content min-h-52 px-4 text-lg text-white bottom-6">
                    <a href={item.link} target="_blank" className="hover:underline">
                      <h2 className="font-bold text-neutral-content">{item.title}</h2>
                    </a>
                    {/* when publish date is missing, rss library uses current time */}
                    {new Date().getTime() - item.published > 60_000 &&  (
                      <h3 className="font-medium">
                        {new Date(item.published).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                      </h3>
                    )}
                    <p className="text-left line-clamp-5 text-ellipsis w-[28ch]whitespace-pre-line md:w-[36ch] mt-2" dangerouslySetInnerHTML={{ __html: item.description }}></p>
                    </div>
                    </div>
                    {audio && (
                      <audio controls className="w-full md:w-[calc(100% - 4ch)] mx-auto mt-4 h-6">
                        <source src={audio.url} type={audio.type}/>
                      </audio>
                    )}
                    <hr className="mt-2 w-3/4 mx-auto"/>
                  </li>
                )
              })}
            </ol>
          </div>
        )
      )}
    </section>
  )
}