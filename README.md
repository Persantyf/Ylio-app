# YLIO - Sistema de Ofertas Fotovoltaicas

Aplicación web para gestión de ofertas de proyectos fotovoltaicos, conectada a Supabase.

## 🚀 Despliegue en Vercel (Recomendado)

### Paso 1: Subir a GitHub

1. Ve a [github.com](https://github.com) e inicia sesión
2. Click en **"+"** (arriba derecha) → **"New repository"**
3. Nombre: `ylio-app`
4. Déjalo público o privado (da igual)
5. **NO** marques "Add README" ni nada
6. Click **"Create repository"**

### Paso 2: Subir los archivos

**Opción A: Desde la web de GitHub (más fácil)**
1. En tu repositorio recién creado, click en **"uploading an existing file"**
2. Arrastra TODOS los archivos de esta carpeta
3. Click **"Commit changes"**

**Opción B: Desde terminal**
```bash
cd ylio-vercel
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/ylio-app.git
git push -u origin main
```

### Paso 3: Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con GitHub
2. Click **"Add New..."** → **"Project"**
3. Busca y selecciona `ylio-app`
4. Click **"Import"**
5. En la configuración:
   - Framework Preset: **Vite**
   - Root Directory: **`./`** (dejarlo vacío)
6. Click **"Deploy"**

### Paso 4: ¡Listo!

En 1-2 minutos tendrás tu app en una URL tipo:
```
https://ylio-app.vercel.app
```

---

## 🔧 Desarrollo Local

Si prefieres probarlo en tu ordenador:

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Abrir en navegador
# http://localhost:5173
```

---

## 🔑 Configuración de Supabase

La app ya está configurada con las credenciales de tu proyecto:

- **URL**: `https://edhyacacepvfvjuwfzrp.supabase.co`
- **Key**: Ya incluida en el código

### ⚠️ IMPORTANTE: Habilitar acceso

Para que la app pueda leer/escribir en la BD, necesitas habilitar RLS:

**Opción 1: Deshabilitar RLS temporalmente** (para desarrollo)
```sql
ALTER TABLE ofertas DISABLE ROW LEVEL SECURITY;
```

**Opción 2: Crear política permisiva** (mejor para producción)
```sql
-- Permitir acceso anónimo a ofertas
CREATE POLICY "Acceso público ofertas" ON ofertas
FOR ALL USING (true) WITH CHECK (true);
```

Ejecuta esto en **Supabase → SQL Editor**

---

## 📁 Estructura del Proyecto

```
ylio-vercel/
├── index.html          # HTML principal
├── package.json        # Dependencias
├── vite.config.js      # Configuración Vite
├── src/
│   ├── main.jsx        # Punto de entrada
│   └── App.jsx         # Aplicación principal
└── README.md           # Este archivo
```

---

## 🛠️ Funcionalidades

### ✅ Implementado
- Conexión a Supabase
- Crear nueva oferta (ID auto-generado)
- Guardar oferta en BD
- Cargar ofertas existentes
- Paso 1: Proyecto (completo)

### 🚧 Pendiente
- Paso 2: Tarifa
- Paso 3: Situación Actual
- Paso 4: Propuesta
- Carga de archivos SIPS/Consumo
- Exportación CSV/Excel

---

## 📞 Soporte

¿Problemas? Contacta con el equipo de desarrollo.
