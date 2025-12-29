import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
ModuleRegistry.registerModules([ AllCommunityModule ]);

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./css/css_center.css"

createRoot(document.getElementById('root')).render(
    <App />
)
