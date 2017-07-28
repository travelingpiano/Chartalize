API Endpoints
=============
HTML API
--------
### Root
- `GET /`
  - loads webpage

JSON API
--------
### Users
- `POST /api/users`
  - creates new user
- `GET /api/users`
  - fetches all users except for current user to share chart with

### Session
- `POST /api/session`
  - signs in existing user
- `DELETE /api/session`
  -  logs out user

### DataTables
- `GET /api/data_tables`
  - show all data tables
- `POST /api/data_tables`
  - put new data table into database
- `GET /api/data_tables/:id`
  - view a single data table
- `DELETE /api/data_tables/:id`
  -  delete a single data table

### Charts
- `GET /api/charts`
  - show all current user's charts
- `POST /api/charts`
  - create new chart
- `GET /api/charts/:id`
  - view a single chart
- `DELETE /api/charts/:id`
  - delete a single chart
- `UPDATE /api/charts/:id`
  -  change shared users of chart
- `GET /api/charts/shared`
  - show all charts shared to current user
- `GET /api/charts/shared/:id`
  - view a single shared chart
