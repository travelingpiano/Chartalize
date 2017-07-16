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
- `PATCH /api/users`

### Session
- `POST /api/session`
  - signs in existing user
- `DELETE /api/session`
  -  logs out user
- `GET /api/session`

### DataTables
- `GET /api/datatables`
  - show all data tables
- `POST /api/datatables`
  - put new data table into database
- `GET /api/datatables/:id`
  - view a single data table
- `DELETE /api/datatables/:id`
  -  delete a single data table

### Charts
- `GET /api/charts`
  - show all charts
- `POST /api/charts`
  - create new chart
- `GET /api/charts/:id`
  - view a single chart
- `DELETE /api/charts/:id`
  - delete a single chart
