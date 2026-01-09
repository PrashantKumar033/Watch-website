# 🕰️ Rolex Watch Store - MERN Stack E-commerce Website

A complete responsive watch e-commerce website built with MERN stack (MongoDB, Express.js, React.js, Node.js) featuring modern UI/UX design and full shopping functionality.

## 🌟 Features

### 🎨 Frontend Features
- **Responsive Design** - Works perfectly on all devices
- **Modern UI/UX** - Clean and professional design
- **Dark/Light Theme** - Toggle between themes
- **Product Showcase** - Featured, Products, and New Arrivals sections
- **Shopping Cart** - Add, remove, and manage cart items
- **User Authentication** - Login/Register functionality
- **Interactive Components** - Smooth animations and transitions

### ⚙️ Backend Features
- **RESTful API** - Complete API for all operations
- **User Management** - Registration, login, profile management
- **Product Management** - CRUD operations for products
- **Shopping Cart** - Cart management with user sessions
- **Order Processing** - Complete order management system
- **Newsletter** - Email subscription system
- **Authentication** - JWT-based secure authentication

### 🛒 E-commerce Functionality
- **Product Catalog** - Browse watches by categories
- **Search & Filter** - Find products easily
- **Shopping Cart** - Add/remove items, quantity management
- **Checkout Process** - Complete order placement
- **User Accounts** - Profile management and order history
- **Admin Panel** - Product and order management

## 🚀 Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **JavaScript (ES6+)** - Interactive functionality
- **Swiper.js** - Touch slider components
- **BoxIcons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Nodemailer** - Email functionality
- **Multer** - File upload handling

## 📁 Project Structure

```
Watch-website/
├── responsive-watches-website/          # Frontend
│   ├── assets/
│   │   ├── css/
│   │   │   ├── styles.css              # Main styles
│   │   │   ├── custom.css              # Custom components
│   │   │   └── swiper-bundle.min.css   # Swiper styles
│   │   ├── js/
│   │   │   ├── main.js                 # Main functionality
│   │   │   ├── api.js                  # API integration
│   │   │   ├── components.js           # Component loader
│   │   │   └── theme-fix.js            # Theme fixes
│   │   └── img/                        # Images and assets
│   ├── components/
│   │   ├── header.html                 # Common header
│   │   ├── footer.html                 # Common footer
│   │   └── cart.html                   # Shopping cart
│   ├── pages/
│   │   ├── featured.html               # Featured products
│   │   ├── products.html               # All products
│   │   ├── new-arrivals.html           # New arrivals
│   │   ├── about-us.html               # About page
│   │   ├── support-center.html         # Support center
│   │   ├── customer-support.html       # Customer support
│   │   └── copyright.html              # Legal information
│   └── index.html                      # Main page
└── backend/                            # Backend API
    ├── config/
    │   └── seeder.js                   # Database seeder
    ├── controllers/
    │   ├── productController.js        # Product operations
    │   ├── userController.js           # User operations
    │   ├── cartController.js           # Cart operations
    │   ├── orderController.js          # Order operations
    │   └── newsletterController.js     # Newsletter operations
    ├── middleware/
    │   └── auth.js                     # Authentication middleware
    ├── models/
    │   ├── Product.js                  # Product model
    │   ├── User.js                     # User model
    │   ├── Cart.js                     # Cart model
    │   ├── Order.js                    # Order model
    │   └── Newsletter.js               # Newsletter model
    ├── routes/
    │   ├── productRoutes.js            # Product routes
    │   ├── userRoutes.js               # User routes
    │   ├── cartRoutes.js               # Cart routes
    │   ├── orderRoutes.js              # Order routes
    │   └── newsletterRoutes.js         # Newsletter routes
    ├── uploads/                        # File uploads
    ├── .env                           # Environment variables
    ├── server.js                      # Main server file
    └── package.json                   # Dependencies
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

### 1. Clone Repository
```bash
git clone <repository-url>
cd Watch-website
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Environment Configuration
Create `.env` file in backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/watchstore
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

### 4. Database Setup
```bash
# Seed database with sample data
npm run seed
```

### 5. Start Application
```bash
# Start backend server
npm run dev

# Open frontend
# Navigate to responsive-watches-website/index.html
# Or serve via backend: http://localhost:5000
```

## 🎯 Usage

### For Users
1. **Browse Products** - Explore featured, all products, and new arrivals
2. **User Account** - Register/login to access cart and orders
3. **Shopping** - Add items to cart, manage quantities
4. **Checkout** - Place orders with shipping information
5. **Newsletter** - Subscribe for updates and offers

### For Admins
1. **Login** with admin credentials (admin@watchstore.com / admin123)
2. **Manage Products** - Add, edit, delete products
3. **Order Management** - View and update order status
4. **User Management** - View registered users
5. **Newsletter** - Manage subscribers

## 🌐 API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart & Orders
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add to cart
- `POST /api/orders` - Create order
- `GET /api/orders/my-orders` - Get user orders

## 🎨 Features Showcase

### 🌙 Dark/Light Theme
- Instant theme switching
- Persistent theme preference
- All components theme-aware

### 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interface

### 🛒 Shopping Experience
- Smooth cart animations
- Real-time cart updates
- Secure checkout process

### 🔐 Security
- JWT authentication
- Password hashing
- Protected routes
- Input validation

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Prashant Kumar**
- GitHub: [@prashant-kumar](https://github.com/nishant-kumar)
- Email: prashant@example.com

## 🙏 Acknowledgments

- Design inspiration from modern e-commerce websites
- Icons by [BoxIcons](https://boxicons.com/)
- Slider component by [Swiper.js](https://swiperjs.com/)
- Font by [Google Fonts](https://fonts.google.com/)

---

⭐ **Star this repository if you found it helpful!**