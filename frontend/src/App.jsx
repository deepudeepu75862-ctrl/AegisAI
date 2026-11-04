import { useState } from 'react'

const API = 'http://127.0.0.1:8000'

export default function App() {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function analyze(event) {
    event.preventDefault()
    if (!file) return
    setBusy(true); setError(''); setResult(null)
    const body = new FormData()
    body.append('file', file)
    try {
      const response = await fetch(`${API}/api/datasets/profile`, { method: 'POST', body })
      const data = await response.json()
      if (!response.ok) throw new Error(data.detail || 'Upload failed')
      setResult(data)
    } catch (err) {
      setError(`${err.message}. Check that the FastAPI backend is running.`)
    } finally {
      setBusy(false)
    }
  }

  return <div className="shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">A</span><span>AegisAI</span></div>
      <p className="nav-label">WORKSPACE</p>
      <div className="nav active">◈ &nbsp; Overview</div>
      <div className="nav">▦ &nbsp; Datasets</div>
      <div className="nav">⌁ &nbsp; Model Lab</div>
      <div className="nav">◉ &nbsp; Predictions</div>
      <div className="nav">▤ &nbsp; Reports</div>
      <div className="sidebar-bottom">AI-powered data intelligence</div>
    </aside>
    <main className="main">
      <header><div><p className="eyebrow">INTELLIGENCE WORKSPACE</p><h1>Overview</h1><p className="muted">Turn raw data into explainable decisions.</p></div><span className="status"><i /> API-ready starter</span></header>
      <section className="cards">
        <article className="metric"><span>DATASETS ANALYZED</span><strong>{result ? '1' : '0'}</strong><small>Upload a dataset to begin</small></article>
        <article className="metric"><span>ROWS PROCESSED</span><strong>{result ? result.rows.toLocaleString() : '—'}</strong><small>Current analysis</small></article>
        <article className="metric"><span>FEATURES FOUND</span><strong>{result ? result.columns : '—'}</strong><small>Detected columns</small></article>
      </section>
      <section className="panel">
        <div className="panel-head"><div><p className="eyebrow">DATA INTELLIGENCE</p><h2>Profile a dataset</h2><p className="muted">Upload a CSV or Excel file to inspect its structure.</p></div><span className="tag">STEP 01 / 04</span></div>
        <form onSubmit={analyze}>
          <label className="dropzone"><span className="upload-icon">↑</span><strong>{file ? file.name : 'Choose a dataset'}</strong><span className="muted">CSV, XLSX or XLS · Maximum 20 MB</span><input type="file" accept=".csv,.xlsx,.xls" onChange={e => setFile(e.target.files?.[0] || null)} /></label>
          <button disabled={!file || busy}>{busy ? 'Analyzing…' : 'Analyze dataset →'}</button>
        </form>
        {error && <p className="error">{error}</p>}
      </section>
      {result && <section className="panel results">
        <div className="panel-head"><div><p className="eyebrow">ANALYSIS COMPLETE</p><h2>{result.filename}</h2></div><span className="tag success">Profile generated</span></div>
        <div className="stats"><div><small>Rows</small><b>{result.rows}</b></div><div><small>Columns</small><b>{result.columns}</b></div><div><small>Duplicate rows</small><b>{result.duplicate_rows}</b></div></div>
        <h3>Missing values by column</h3>
        <div className="table-wrap"><table><thead><tr><th>Column</th><th>Missing values</th></tr></thead><tbody>{Object.entries(result.missing_values).map(([key, value]) => <tr key={key}><td>{key}</td><td>{value}</td></tr>)}</tbody></table></div>
        <h3>Data preview</h3><pre>{JSON.stringify(result.preview, null, 2)}</pre>
      </section>}
      <footer>AEGISAI · PREDICTIVE ANALYTICS PLATFORM <span>Starter build v0.1.0</span></footer>
    </main>
  </div>
}
