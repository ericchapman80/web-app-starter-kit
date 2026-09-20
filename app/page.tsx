export default function Home() {
  return (
    <main className="shell">
      <p className="eyebrow">Web App Starter</p>
      <h1>Build clearly.<br /><span>Ship confidently.</span></h1>
      <p className="lede">A small, production-minded foundation for applications that need a dependable local, preview, and production workflow.</p>
      <div className="status-card">
        <span className="status-dot" aria-hidden="true" />
        <div><strong>Foundation online</strong><p>Local development, database migrations, and health checks are configured.</p></div>
      </div>
    </main>
  );
}
