import { customFetch } from '@/utils/customFetch';
import React, { useEffect } from 'react';

interface IData {
  message: string;
}

function App() {
  const [data, setData] = React.useState<IData | undefined>(undefined);

  useEffect(() => {
    const userData = customFetch.get({
      url: `http://localhost:3000/api/v1/languages`,
    });

    /* prettier-ignore */ (() => { const QuickLog = JSON.stringify(userData, null, 4); const parentDiv = document.getElementById('quicklogContainer') ?? (() => {const div = document.createElement('div');div.id = 'quicklogContainer';div.style.cssText = 'position: fixed; top: 10px; right: 10px; z-index: 1000; display: flex; flex-direction: column; align-items: flex-end;';document.body.appendChild(div);return div; })(); const createChildDiv = (text: typeof QuickLog) => {const newDiv = Object.assign(document.createElement('div'), { textContent: text, style: 'font: bold 25px "Comic Sans MS"; width: max-content; max-width: 500px; word-wrap: break-word; background-color: yellow; box-shadow: white 0px 0px 5px 1px; padding: 5px; border: 3px solid black; border-radius: 10px; color: black !important; cursor: pointer;',});const handleMouseDown = (e: MouseEvent) => { e.preventDefault(); const clickedDiv = e.target instanceof Element && e.target.closest('div');if (clickedDiv !== null && e.button === 0 && clickedDiv === newDiv) { const textArea = document.createElement('textarea'); textArea.value = clickedDiv.textContent ?? ''; document.body.appendChild(textArea); textArea.select(); document.execCommand('copy'); document.body.removeChild(textArea);clickedDiv.style.backgroundColor = 'gold'; setTimeout(() => { clickedDiv.style.backgroundColor = 'yellow'; }, 1000); }};const handleRightClick = (e: MouseEvent) => { e.preventDefault(); if (parentDiv.contains(newDiv)) { parentDiv.removeChild(newDiv); }};newDiv.addEventListener('mousedown', handleMouseDown);newDiv.addEventListener('contextmenu', handleRightClick);return newDiv; };parentDiv.prepend(createChildDiv(QuickLog)); })()

    fetch(
      `${String(import.meta.env.VITE_BACKEND_URL)}/${String(import.meta.env.VITE_API_URL)}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // Authorization: 'Basic ' + btoa('admin:123'),
        },
      },
    )
      .then((response) => response.json())
      .then((result: IData | undefined) => {
        // Success
        if (result) {
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
      <pre>
        <code>{JSON.stringify(data, null, 4)}</code>
      </pre>
    </div>
  );
}

export default App;
