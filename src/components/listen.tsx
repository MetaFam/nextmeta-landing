import { useQuery } from '@tanstack/react-query'
import { parse } from 'rss-to-json'

export default function Listen() {

  const { isPending, error, data } = useQuery({
    queryKey: ["pods"],
    queryFn: () => (
      fetch('https://pods.media/api/rss/feed/channel/nextmeta', {
        method: "GET",
        mode: "no-cors",
      })
      .then((res) => {
        console.debug({res})
        return parse(res.body)
      })  

    ),
  })
  console.debug({data})
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src="/assets/nextmeta-logo.webp"
          alt="NextMeta"
          className="w-full" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">NextMeta</h2>
        <p>NextMeta is a podcast and a newsletter about onchain economies, coordination and the bigger picture.</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Collect/Listen</button>
        </div>
      </div>
    </div>
  )
}