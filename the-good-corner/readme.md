Keskona:
 - [frontend] main.tsx: router
 - [frontend] App.tsx: layout
 - [frontend] pages/RecentAds.tsx: liste d'annonces récentes
    - fetch depuis une api
    - utilisation de useState+useEffect
 - [frontend] src/pages/AdCreaForm.tsx: formulaire
 - [backend] Routes Category (BREAD)
    - browse
    - add
 - [backend] Routes Ad (BREAD)
    - browse
    - read
    - edit
    - add
    - delete
 - ✅ [frontend] src/components/Header.tsx: 
    - ✅ fetch depuis une api
    - ✅ utilisation de useState+useEffect
    - ✅ Lien "Publier une annonce" vers "AdCreaForm"
 - ✅ [backend] Entité Tag
 - ✅ [backend] Routes Tag (BREAD)
   - ✅ browse
   - ✅ add
 - ✅ [backend] index.ts:
   - ✅ splitter les routes
 - [frontend] src/pages/AdCreaForm.tsx:
    - ✅ envoyer données backend
    - ✅ ajouter des champs pour matcher la data du backend (Ad)
    - ✅ ajouter des champs pour Category
  - ✅ [frontend] src/pages/CategoryDetail.tsx: 
    - ✅ ... tout ?
 - [frontend] atomic design:
   - molecules/
   - organisms/
   - pages/
 - [frontend] src/pages/AdCreaForm.tsx:
    - ajouter des champs pour Tag
  - [frontend] src/pages/AdDetail.tsx: 
    - ... tout ?
 - [frontend] src/molecules/Search.tsx: recherche d'ads en fonction d'une string
  - Luxon
  - AdDetail
    - swap enrte formulaire et detail
 - [frontend] src/components/AdCard.tsx: 
    - suppression annonce
  - AdEditionForm:
    - Champs invariables
  - pas de 404 sur length=0

KESKONFOUT:
 
Keskifofaire:
 - [frontend] atomic design:
   - atoms/
   - templates/
 - [frontend] src/components/AdCard.tsx: 
    - ajout de la photo
    - css
  - AdEditionForm:
    - ❌ Noms des champs (raccord backend: typage)
--------------

# Glossaire
ActionA //<- action simple, immediate
(ActionA...) //<- action complexe, longue
(...A) //<- l'action est reellement finie

# Cas simple: pas d'asynchrone
ActionA
ActionB
ActionC(needB)

# Cas moins simple: A est long
(ActionA...)
ActionB
ActionC(needB)
(...A)

# Cas BIEN POURRI: *tout** est long
(ActionA...)
(ActionB...)
(ActionC...)(needB)
(...C)
(...B)
(...A)

---
# Callbacks
(ActionA...)
(ActionB...)
  (...B)
    (ActionC...)(needB)
(...C)
(...A)

---
# .then() (Promise<>)
(ActionA...)
(ActionB...)
  .then((...B)(ActionC...)(needB))
(...C)
(...A)

---
# async/await 
(ActionA...)
await (ActionB...)
NAN TAGGLE JATTENDS
(...B)
(ActionC...)(needB)
(...C)
(...A)

---
## Pourquoi les Promises c'est bien ?

### async/await: sequentiel
await (ActionA...)
NAN TAGGLE JATTENDS
(...A)
await (ActionB...)
NAN TAGGLE JATTENDS
(...B)
await (ActionC...)
NAN TAGGLE JATTENDS
(...C)


ActionD(needA, B, C)

=>LONG ! Durée de A + Durée de B + Durée de C

### Promises: parallelisme
(ActionA...)
(ActionB...)
(ActionC...)

Quand(A, B, C) // Promise.all
ActionD(needA, B, C)

=> Aussi long que la plus longue des actions