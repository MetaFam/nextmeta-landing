import './App.css'
import Listen from './components/listen'
import Read from './components/read'
import Watch from './components/watch'
import RSSFeed from './components/rss-feed'

function App() {
 
  return (
    <>
    <header>
      <h1 className="font-bold text-4xl mb-4 text-neutral-content">NextMeta Media</h1>
      <h2>A podcast and a newsletter about onchain economies, coordination and the bigger picture</h2>
      <nav>
        <ul className="list-style-none flex justify-center gap-2">
          <li>
            <a className="btn btn-sm btn-secondary text-accent font-bold" href="#listen">Listen</a>
          </li>
          <li>
            <a className="btn btn-sm btn-secondary text-accent font-bold" href="#read">Read</a>
          </li>
          <li>
            <a className="btn btn-sm btn-secondary text-accent font-bold" href="#watch">Watch</a>
          </li>
        </ul>
      </nav>
    </header>
    <main className='grid grid-cols-1 md:grid-cols-3 gap-2 pt-8'>
      <RSSFeed url="https://rss-proxy.netlify.app/api/pods-rss/nextmeta"/>
      <RSSFeed url="https://rss-proxy.netlify.app/api/substack-rss/metagame"/>
      <Watch/>
    </main>
    </>
  )
}

export default App
