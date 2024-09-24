import './App.css'
import Watch from './components/watch'
import RSSFeed from './components/rss-feed'

function App() {
 
  return (
    <>
    <header id="top">
      <h1 className="font-bold text-4xl mb-4 text-neutral-content italic">NextMeta</h1>
      <h2>A podcast and newsletter about on-chain economies, coordination, and the bigger picture</h2>
    </header>
    <main className='grid grid-cols-1 md:grid-cols-3 gap-2 pt-8'>
    <nav className="sticky top-0 z-10 glass py-1 rounded md:hidden">
        <ul className="list-style-none flex justify-center gap-2">
          <li>
            <a className="btn btn-sm btn-secondary text-accent font-bold" href="#top">⯭</a>
          </li>
          <li>
            <a className="btn btn-sm btn-secondary text-accent font-bold" href="#listen">
              <label htmlFor="listen-open">Listen</label>
            </a>
          </li>
          <li>
            <a className="btn btn-sm btn-secondary text-accent font-bold" href="#read">
              <label htmlFor="read-open">Read</label>
            </a>
          </li>
          <li>
            <a className="btn btn-sm btn-secondary text-accent font-bold" href="#watch">Watch</a>
          </li>
        </ul>
      </nav>
      <RSSFeed selected={true} id="listen" url="https://rss-proxy.netlify.app/api/pods-rss/nextmeta" header={<p className="pt-4 font-medium">Click below to collect as mintable NFTs on <a className="text-neutral-content" target="_blank" href="https://pods.media/nextmeta">pods.media</a>!</p>}/>
      <RSSFeed blackout={true} id="read" url="https://rss-proxy.netlify.app/api/substack-rss/metagame"/>
      <Watch/>
    </main>
    </>
  )
}

export default App
