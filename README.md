# Paylink Manager

Gestor de links de pago inspirado en el checkout de Clip. Un comercio crea links con nombre, monto y descripción. Cada link genera una página pública de checkout donde el comprador puede pagar.

Construido como proyecto personal para explorar Next.js App Router, Server Components y deploy en Vercel.

---

## Demo

🔗 [paylink-manager.vercel.app](https://paylink-manager.vercel.app)

---

## Stack

- **Next.js 16** — App Router + TypeScript
- **MongoDB Atlas** — base de datos (free tier)
- **Tailwind CSS v4** — estilos
- **Vercel** — deploy

---

## Funcionalidades

- Crear links de pago con nombre, monto y descripción
- Cada link genera una URL pública única `/pay/[id]`
- Formulario de checkout con validación: número de tarjeta agrupado de a 4, fecha MM/AA, CVV solo números
- Estado del link: `pending` → `paid`
- Dashboard que refleja el estado en tiempo real
- Skeleton screen automático mientras carga el checkout
- Página de éxito post-pago
- Mobile-first, max-width 515px inspirado en el checkout real de Clip
- Color principal `#FC4C02` y tipografía Inter, igual que Clip

---

## Estructura

```
app/
  page.tsx                    ← dashboard
  api/
    links/
      route.ts                ← GET, POST
    links/[id]/
      route.ts                ← GET, PATCH
  pay/
    [id]/
      page.tsx                ← checkout (Server Component)
      PaymentClient.tsx       ← formulario (Client Component)
      loading.tsx             ← skeleton screen
      success/
        page.tsx              ← página de éxito
components/
  CreateLinkForm.tsx          ← formulario crear link (Client Component)
  PaylinkList.tsx             ← lista de links (Server Component)
lib/
  mongodb.ts                  ← conexión reutilizable (Singleton)
```

---


## Correr localmente

```bash
git clone https://github.com/LautaroPavanSarquis/paylink-manager.git
cd paylink-manager
npm install
```

Crear `.env.local` en la raíz:

```
MONGODB_URI=tu_string_de_mongodb_atlas
```

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

---

## Pendiente

- [ ] Autenticación del dashboard
- [ ] Rate limiting en endpoints
- [ ] Índice en MongoDB sobre el campo `id`
- [ ] ISR para cachear páginas de checkout
- [ ] Consumir la API real de Clip
