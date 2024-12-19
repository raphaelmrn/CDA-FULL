Keskona:
- Entites typeorm
- supprimer serveur Express
- lier entité à graphQL
  - ajouter decorateurs type-graphql sur entités
- ecrire AdResolver
- demarrer serveur GraphQL
- completer AdResolver (reste du CRUD)
  - On a pas su faire le PATCH ;_;
- ecrire resolvers Category/Tag
- adCreationForm
- AdEditionForm
- Implementer graphql-codegen
- nettoyer code

KESKONFOUT:
- migration sqlite>postgresql
  - compose.yaml: ajouter un service db
  - backend: modifier src/config/db pour utiliser le service db
  - ajouter un .env
    - backend: utiliser le .env
    - compose.yalm: utiliser le .env
  - installer nginx
    - compose.yaml: service gateway
    - nginx.conf: 

Keskifofaire:
- molecules/Search
  - Fonctionnement general

- organisms/AdCreationForm
  - label sur Select (multi-select)
- organisms/AdEditionForm
  - label sur Select (multi-select)
  
- pages/AdPage
  - getAdById ne fournit pas la categorie ou les tags (x2)
- pages/HomePage
  - getAdById ne fournit pas la categorie ou les tags
