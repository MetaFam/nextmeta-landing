import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { ReactNode } from 'react'
import Error from './error'

type RSSItem = {
  id: string
  title: string
  description: string
  link: string
  published: number
  itunes_image: { href: string }
  enclosures: Array<{
    url: string
    type: string
  }>
}

export default function RSSFeed(
  { url, selected = false, id, blackout = false, header }:
  {
    url: string
    selected?: boolean
    id: string
    blackout?: boolean
    header?: ReactNode 
  }
) {

  const { isPending, error, data } = useQuery({
    queryKey: [`pods-${url}`],
    queryFn: () => (
      fetch(url).then((res) => res.json())
    ),
  })

  return (
    <section className="collapse max-lg:collapse-arrow md:collapse-open ">
    <input id={`${id}-open`} type="radio" name="accordion" defaultChecked={selected} />
    <div {...{ id }} className="collapse-title card bg-base-100 shadow-xl">
      <figure>
        <img
          src="/assets/nextmeta-logo.webp"
          alt="NextMeta"
          className="w-full rounded-lg" />
      </figure>
    </div>
    <div className="collapse-content">
      {isPending ? (
        <div className="loading loading-spinner loading-lg mx-auto pt-16"></div>
      ) : (
        error ? (
          <Error message={error.message}/>
        ) : (
          <div>
            {header}
            <ol className="card-actions justify-end">
              {data.items.map((item: RSSItem) => {
                const image = item.enclosures.find((enc) => (
                  enc.type.startsWith('image/')
                )) ?? item.itunes_image
                const audio = item.enclosures.find((enc) => (
                  enc.type.startsWith('audio/')
                ))
                return (
                  <li className="w-[34ch] md:w-[44ch] flex flex-col justify-center min-h-52 mt-4 bg-contain bg-no-repeat bg-center" key={item.id}>
                  <div className={clsx('relative cursor-pointer', blackout && 'blackout')}>
                      {image && (
                        <a href={item.link} target="_blank" className="hover:underline">
                        <img className={clsx('rounded-lg max-h-64 block mx-auto')} src={'href' in image ? image?.href: image?.url} alt={item.title}/>
                        </a>
                      )}
                    <div className={clsx('flex flex-col justify-center content min-h-52 px-6 pt-2 text-lg text-white bottom-6', image && blackout &&  'pointer-events-none')}>
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
                      <audio controls className="w-[calc(100% - 4ch)] mx-auto mt-4 h-6">
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
    </div>
    </section>
  )
}