import { useQuery } from '@tanstack/react-query'

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
      <div className="card-body">
        <h2 className="card-title">NextMeta</h2>
        <p>NextMeta is a podcast and a newsletter about onchain economies, coordination and the bigger picture.</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Collect/Listen</button>
        </div>
      </div>
    </section>
  )
}