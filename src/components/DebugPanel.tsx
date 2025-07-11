import React from 'react';

const DebugPanel = () => {
  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-md z-50">
      <h3 className="font-bold mb-2">🔍 Debug Info</h3>
      <div className="space-y-1">
        <div>
          <strong>VITE_API_URL:</strong> {import.meta.env.VITE_API_URL || 'undefined'}
        </div>
        <div>
          <strong>Mode:</strong> {import.meta.env.MODE}
        </div>
        <div>
          <strong>Prod:</strong> {import.meta.env.PROD ? 'true' : 'false'}
        </div>
        <div>
          <strong>All env vars:</strong>
          <pre className="mt-1 text-xs overflow-auto max-h-20">
            {JSON.stringify(import.meta.env, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default DebugPanel;
