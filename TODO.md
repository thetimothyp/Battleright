##TO DO:

###Back End:
- Flesh out database structure
  - Add Users model
    - ~~Add User authentication~~
    - Add Edit operation
      - Implement Edit for a single chapter
        - Title for chapter
        - Body for chapter
      - Add functionality to add additional chapters
    - Add Save operation (save guide to user)
  - Add Abilities to Champions
  - ~~Add Battlerites to Champions~~
- Update routes to reflect abilities and battlerites
  - ~~.../champions/:champ_id/battlerites{/:battlerite_id}~~
    - ~~Add a GET route replacing champ_id with champ_name for clarity~~
    - Add a GET route replacing br_id with br_name for clarity
  - .../champions/:champ_id/abilities{/:ability_id}
- ~~Implement BBCode parser~~
  
###Front End:
- Create textarea that takes BBCode input and sends it to back end
  - Update BBCode to HTML on server response

###Extra Stuff:
- Analytics (popular champions, etc.)
