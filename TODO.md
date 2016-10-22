##TO DO:

###Back End:
- Flesh out database structure
  - Add Users model
    - ~~Add User authentication~~
    - Add Edit operation
      - Only user whose guide it is should be able to edit the guide
      - ~~Implement Edit for a single chapter~~
        - ~~Title for chapter~~
        - ~~Body for chapter~~
      - Add functionality to add additional chapters
        - ~~Add chapter in Edit~~
        - ~~View multiple chapters in Preview~~
        - ~~Show multiple editable chapters when going back to Edit~~
        - Be able to delete chapters in edit mode
    - Add Save operation (save guide to user)
  - Add Abilities to Champions
  - ~~Add Battlerites to Champions~~
- Update routes to reflect abilities and battlerites
  - ~~.../champions/:champ_id/battlerites{/:battlerite_id}~~
    - ~~Add a GET route replacing champ_id with champ_name for clarity~~
    - Add a GET route replacing br_id with br_name for clarity
  - .../champions/:champ_id/abilities{/:ability_id}
- Implement BBCode parser
  - ~~Parse basic BBCode~~
  - Parse BBCode database queries ([[Croak]], [[SpitSpitSpit]], etc.)
  
###Front End:
- ~~Create textarea that takes BBCode input and sends it to back end~~
  - ~~Update BBCode to HTML on server response~~

###Extra Stuff:
- Analytics (popular champions, etc.)
