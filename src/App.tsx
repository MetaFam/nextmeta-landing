import './App.css'
import Listen from './components/listen'
import Read from './components/read'
import Watch from './components/watch'

function App() {
 
  return (
    <>
    <header>
      <h1 className="font-bold text-4xl mb-4">NextMeta Media</h1>
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
      <Listen/>
      <Read/>
      <Watch/>
    </main>
    </>
  )
}

export default App
