import './App.css'
import Listen from './components/listen'
import Read from './components/read'
import Watch from './components/watch'

function App() {
 
  return (
    <main className='grid grid-cols-1 md:grid-cols-3 gap-2 pt-8 '>
      <Listen/>
      <Read/>
      <Watch/>
    </main>
  )
}

export default App
