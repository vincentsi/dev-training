export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">Dev Training</h1>
      <p className="text-gray-500 mb-12">
        Ma plateforme d&apos;apprentissage — cours théoriques et exercices pratiques.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">JavaScript</h2>
          <p className="text-gray-500 text-sm">
            Fondamentaux, DOM, asynchrone...
          </p>
        </div>
        <div className="border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">TypeScript</h2>
          <p className="text-gray-500 text-sm">
            Types, interfaces, generics...
          </p>
        </div>
        <div className="border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">SQL</h2>
          <p className="text-gray-500 text-sm">
            Requêtes, jointures, optimisation...
          </p>
        </div>
        <div className="border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">Algorithmie</h2>
          <p className="text-gray-500 text-sm">
            Structures de données, complexité...
          </p>
        </div>
      </div>
    </main>
  );
}
