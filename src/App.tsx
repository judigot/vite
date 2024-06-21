import { customFetch } from '@/utils/customFetch';
import React, { useEffect } from 'react';

interface IData {
  message: string;
}

function App() {
  const [data, setData] = React.useState<IData | undefined>(undefined);

  useEffect(() => {
    const data = customFetch.get<IData | undefined>({
      url: '/api',
    });

    data
      .then((result) => {
        // Success
        if (result !== undefined) {
          setData(result);
        }
      })
      .catch((error: unknown) => {
        // Failure
        throw error instanceof Error ? error : new Error(String(error));
      });
  }, []);

  return (
    <div style={{ zoom: '500%', textAlign: 'center' }}>
      Test
      <pre>
        <code>{JSON.stringify(data, null, 4)}</code>
      </pre>
    </div>
  );
}

export default App;
