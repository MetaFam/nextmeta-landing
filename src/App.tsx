import './App.css'

function App() {
 
  return (
    <>
     <div className="card bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src="/assets/nextmeta-logo.webp"
      alt="NextMeta" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">NextMeta</h2>
    <p>NextMeta is a podcast and a newsletter about onchain economies, coordination and the bigger picture.</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Collect/Listen</button>
    </div>
  </div>
</div>
    </>
  )
}

export default App
