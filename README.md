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

## Egyedi azonosítók

Az egyedi azonosítók létrehozásához a UUID (`v4`) modult használtam a következő módon:

```javascript
import { v4 as uuidv4 } from 'uuid';

const uniqueId = uuidv4();
