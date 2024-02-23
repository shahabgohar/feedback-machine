### Features

- Implemented user authentication. (Sanctum). User can login, logout and signup.
- Feedback creation/submission is developed. Form Validatoins are done on both client side and server side.
- Feedback table is created with pagination displaying title, feedback category and user who created it.
- Users are allowed to leave comments. Users can also mention other users using @ symbol.
- Simple styling, loaders and responsiveness are added.

### How to Set up?

- there are 2 separate folders one is for frontend and other is for backend
- cd/ to backend folder and run composer install to install laravel packages
- copy .env.example to .env
- run php artisan key:generate to generate application key
- please setup database in your system, create a database and enter credentials in .env
- run php artisan migrate to create tables
- run php artisan db:seed to seed database with dummy data
- default login credentials are email: test@test.com , password:12345678
- run php artisan serve (the default address will be http://127.0.0.1:8000)
- now open another terminal and cd to frontend
- run npm install
- create .env and set these variables
  VITE_MODE="development"
  VITE_API_URL="http://127.0.0.1:8000"
- run npm run dev
- please use the default url: http://localhost:5173/ to visit the site

in case of any issue contect developer: shahab.developer.work@gmail.com
