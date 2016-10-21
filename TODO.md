##TO DO:

###Back End:
- Flesh out database structure
  - Add Abilities to Champions
  - ~~Add Battlerites to Champions~~
- Update routes to reflect abilities and battlerites
  - ~~.../champions/:champ_id/battlerites{/:battlerite_id}~~
    - Add a GET route replacing champ_id and br_id with champ_name and br_name for clarity
  - .../champions/:champ_id/abilities{/:ability_id}
- Write BBCode parser
  
###Front End:
- Create textarea that takes BBCode input and sends it to back end
  - Update BBCode to HTML on server response

###Extra Stuff:
- Analytics (popular champions, etc.)
