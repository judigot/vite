import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect } from 'react';
function App() {
    const [data, setData] = React.useState(undefined);
    useEffect(() => {
        fetch(`${String(import.meta.env.VITE_BACKEND_URL)}/${String(import.meta.env.VITE_API_URL)}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // Authorization: 'Basic ' + btoa('admin:123'),
            },
        })
            .then((response) => response.json())
            .then((result) => {
            // Success
            if (result) {
                setData(result);
            }
        })
            .catch((error) => {
            // Failure
            throw error instanceof Error ? error : new Error(String(error));
        });
    }, []);
    return (_jsx("div", { style: { zoom: '500%', textAlign: 'center' }, children: _jsx("pre", { children: _jsx("code", { children: JSON.stringify(data, null, 4) }) }) }));
}
export default App;
