# Watch Store Backend API

MERN Stack backend for the responsive watch website.

## Features

- **User Authentication** (Register, Login, JWT)
- **Product Management** (CRUD operations)
- **Shopping Cart** (Add, Update, Remove items)
- **Order Management** (Create, Track orders)
- **Newsletter Subscription** (Email management)
- **Admin Panel** (Product & Order management)

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove/:productId` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe from newsletter
- `GET /api/newsletter/subscribers` - Get all subscribers (Admin)

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create `.env` file with:
   ```
   MONGODB_URI=mongodb://localhost:27017/watchstore
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```

3. **Start MongoDB**
   Make sure MongoDB is running on your system

4. **Seed Database**
   ```bash
   npm run seed
   ```

5. **Start Server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## Default Admin Credentials
- Email: admin@watchstore.com
- Password: admin123

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt
- Nodemailer
- Multer (for file uploads)

## Project Structure
```
backend/
├── config/
│   └── seeder.js
├── controllers/
│   ├── productController.js
│   ├── userController.js
│   ├── cartController.js
│   ├── orderController.js
│   └── newsletterController.js
├── middleware/
│   └── auth.js
├── models/
│   ├── Product.js
│   ├── User.js
│   ├── Cart.js
│   ├── Order.js
│   └── Newsletter.js
├── routes/
│   ├── productRoutes.js
│   ├── userRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   └── newsletterRoutes.js
├── uploads/
├── .env
├── server.js
└── package.json
```