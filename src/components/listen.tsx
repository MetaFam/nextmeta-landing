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

export default function Listen() {

  const { isPending, error, data } = useQuery({
    queryKey: ["pods"],
    queryFn: () => (
      fetch('https://pods-proxy.netlify.app/api/pods-rss/nextmeta')
      .then((res) => res.json())
    ),
  })

  console.debug({data})
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
          <div className="card-body">
            <h2 className="card-title">Podcasts</h2>
            <p>NextMeta is a podcast and a newsletter about onchain economies, coordination and the bigger picture.</p>
            <ol className="card-actions justify-end">
              {data.items.map((item: RSSItem) => (
                <li className="mt-4" key={item.id}>
                  <a href={item.link} className="hover:underline">
                    <h2 className="font-bold">{item.title}</h2>
                  </a>
                  <h3 className="font-medium">{new Date(item.published).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</h3>
                  <p className="text-justify line-clamp-5 text-ellipsis max-w-[28ch] whitespace-pre-line md:max-w-[38ch] mt-2">{item.description}</p>
                  <audio controls className="w-[28ch] md:w-[38ch] mt-4 h-6">
                    <source src={item.enclosures[0].url} type={item.enclosures[0].type}/>
                  </audio>
                  <hr className="mt-2 w-3/4 mx-auto"/>
                </li>
              ))}
            </ol>
          </div>
        )
      )}
    </section>
  )
}