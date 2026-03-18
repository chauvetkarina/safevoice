import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()]
})
```

Hacé clic en **"Commit changes..."** → **"Commit changes"**.

Cuando esté listo tu repo debería verse así con 4 archivos y la carpeta `src`:
```
safevoice/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    └── App.jsx
