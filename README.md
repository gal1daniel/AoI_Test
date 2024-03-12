# AoI_Test

Ez a projekt egy példa Next.js-alapú webalkalmazásra, amely lovak adatait kezeli.

## Technológiai háttér

A projekt készítése során a Next.js keretrendszert használtam, amely egy React-alapú keretrendszer. Az oldalakat az "app" mappában hoztam létre, amelyeket a Next.js beépített Link komponensek segítségével jelenítettem meg, és Bootstrap által formázott táblázatban rendszereztem, mint a kezdőlapot.

## Adatkezelés

Az alkalmazás részeként találhatóak:

- `app/breeds-count`: Ez a mappa a "breeds-count.json" adattömböt kezeli.
- `app/horse`: Ez a mappa a "horses.json" fájlt kezeli.

A `breeds-count` mappában található `route.ts` fájlt az "adatok" oldal használja. A `horse` mappában található `route.ts` fájlt a "rogzites" oldal, a `horse/[id]` mappában lévő `route.ts` fájlt pedig a "modositas" oldal használja.

## UI

A UI a pontossága érdekében Boostrap v5.3-at használtam:

"import 'bootstrap/dist/css/bootstrap.min.css';"

## Modulok amiket használtam (ezek közé beletartozik az is amiket a NextJs telepítésekor letölttöt "npx create-next-app@latest"

`├── @types/fs-extra@11.0.4
├── @types/node@20.11.20
├── @types/react-dom@18.2.19
├── @types/react@18.2.60
├── @types/uuid@9.0.8
├── autoprefixer@10.4.17
├── bootstrap@5.3.3
├── next@14.1.0
├── postcss@8.4.35
├── react-dom@18.2.0
├── react@18.2.0
├── tailwindcss@3.4.1
├── typescript@5.3.3
└── uuid@9.0.1`

## Egyedi azonosítók

Az egyedi azonosítók létrehozásához a UUID (`v4`) modult használtam a következő módon:

```javascript
import { v4 as uuidv4 } from 'uuid';

const uniqueId = uuidv4();

