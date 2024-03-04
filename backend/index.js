const jwt = require('jsonwebtoken');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const multer = require('multer');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors()); 

// MongoDB connection
const MONGODB_URI = 'mongodb+srv://dazzledclouds:ddcpassword24@cluster0.kjn5ddu.mongodb.net/my_database';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


// User model
const User = require('./models/users');
const Product = require('./models/product');
const CartItem = require('./models/cartitem');
const Order = require('./models/order');
const WalkInTransaction=require('./models/walkInTransaction');
const InStoreCartItem = require('./models/InStoreCart');
const Raffle = require('./models/Raffle'); 
const Prize= require('./models/Prize');







//walkin
// code here


//confirm order
//confirm order
app.post('/storeorders', async (req, res) => {
    const { user, totalAmount } = req.body;

    try {
        // Fetch cart items for the user and populate the product details
        const cartItems = await InStoreCartItem.find({ user }).populate('product');

        // Extract products and quantities from the cart items
        const products = cartItems.map(item => ({ product: item.product._id, quantity: item.quantity }));

        // Create a new order with the user, products, total amount, and type
        const newOrder = new Order({
            user,
            products,
            totalAmount,
            type: 'In-store' // Set the type to "In-store"
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();

        // Optionally, you can clear the cart items after saving the order
        await InStoreCartItem.deleteMany({ user });

        // Send a success response with the saved order
        res.status(201).json({ message: 'Order saved successfully', savedOrder });
    } catch (error) {
        // Handle errors
        console.error('Error saving order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Update the quantity of an item in the in-store cart
app.put('/in-store-cart/:itemId', async (req, res) => {
    const { itemId } = req.params;
    const { quantity } = req.body;

    try {
        const updatedItem = await InStoreCartItem.findByIdAndUpdate(itemId, { quantity }, { new: true });

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Quantity updated successfully', updatedItem });
    } catch (error) {
        console.error('Error updating quantity:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//delete
app.delete('/in-store-cart/:itemId', async (req, res) => {
    const { itemId } = req.params;

    try {
        // Find the item by its ID and remove it from the in-store cart
        const deletedItem = await InStoreCartItem.findByIdAndDelete(itemId);

        if (!deletedItem) {
            // If the item with the given ID is not found, return a 404 error
            return res.status(404).json({ message: 'Item not found' });
        }

        // If the item is successfully deleted, send a success response
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        // If an error occurs, log the error and send a 500 error response
        console.error('Error deleting item from in-store cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//add
app.post('/in-store-cart', async (req, res) => {
    try {
        const { user, product, quantity, totalAmount } = req.body;

        const inStoreCartItem = new InStoreCartItem({
            user,
            product,
            quantity,
            totalAmount
        });

        await inStoreCartItem.save();

        res.status(201).json({ message: "Item added to in-store cart successfully", inStoreCartItem });
    } catch (error) {
        console.error("Error adding item to in-store cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Fetch store cart items
app.get('/in-store-cart', async (req, res) => {
    try {
        // Fetch all in-store cart items from the database
        const inStoreCartItems = await InStoreCartItem.find().populate('product');
        
        // Send the in-store cart items as the response
        res.status(200).json(inStoreCartItems);
    } catch (error) {
        console.error('Error fetching in-store cart items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




//raffle

//reacre prize
app.post('/prizes', async (req, res) => {
    try {
        const { name, value } = req.body;

        // Create a new prize object
        const newPrize = new Prize({
            name,
            value
        });

        // Save the new prize to the database
        await newPrize.save();

        res.status(201).json({ message: "Prize created successfully", prize: newPrize });
    } catch (error) {
        console.error("Error creating prize:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// Create new raffle
app.post('/raffles', async (req, res) => {
    try {
        const {
            user_id,
            start_date,
            end_date,
            entry_fee,
            total_entries_needed,
            prize1_product_id,
            prize2_product_id,
            prize3_product_id
        } = req.body;

        console.log('Received raffle data:', req.body);
        console.log('Searching for prizes...');

  

        const newRaffle = new Raffle({
            user_id,
            start_date,
            end_date,
            entry_fee,
            total_entries_needed,
            prize1_product_id,
            prize2_product_id,
            prize3_product_id
        });

        await newRaffle.save();

        res.status(201).json({ message: "Raffle created successfully", raffle: newRaffle });
    } catch (error) {
        console.error("Error creating raffle:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



//GET THELASTEST
app.get('/latest', async (req, res) => {
    try {
  
        const latestRaffle = await Raffle.findOne().sort({ entry_date: -1 });

        if (!latestRaffle) {
            return res.status(404).json({ message: 'No raffle event found' });
        }

        const prize1Product = await Product.findById(latestRaffle.prize1_product_id);
        const prize2Product = await Product.findById(latestRaffle.prize2_product_id);
        const prize3Product = await Product.findById(latestRaffle.prize3_product_id);

        const modifiedResponse = {
            ...latestRaffle.toObject(),
            prize1_product: prize1Product,
            prize2_product: prize2Product,
            prize3_product: prize3Product
        };

        res.json(modifiedResponse);
    } catch (error) {
        console.error('Error fetching latest raffle:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


  
//get all raflle
app.get('/raffles', async (req, res) => {
    try {
        const raffles = await Raffle.find();
        res.json(raffles);
    } catch (error) {
        console.error("Error fetching raffles:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//get by id
app.get('/raffles/:raffleId', async (req, res) => {
    try {
        const raffle = await Raffle.findById(req.params.raffleId);
        if (!raffle) {
            return res.status(404).json({ error: "Raffle not found" });
        }
        res.json(raffle);
    } catch (error) {
        console.error("Error fetching raffle:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Route to add a participant to a raffle
app.post('/raffles/:raffleId/participants', async (req, res) => {
    try {
      const { raffleId } = req.params;
      const { participantName } = req.body;

      const raffle = await Raffle.findById(raffleId);
      if (!raffle) {
        return res.status(404).json({ error: 'Raffle not found' });
      }

      // Add the participant name to the participants array of the raffle
      raffle.participants.push(participantName);
      await raffle.save();

      res.status(201).json({ message: 'Participant added to raffle successfully' });
    } catch (error) {
      console.error('Error adding participant to raffle:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });





//end raffle

// Retrieve delivered sales data
app.get('/delivered-sales', async (req, res) => {
    try {
     
        const deliveredSales = await Order.find({ status: 'delivered' }).populate({
            path: 'products.product',
            select: 'name price wholesaleprice' 
        });

     
        deliveredSales.forEach(sale => {
       
            let totalSales = 0;
            sale.products.forEach(product => {
                totalSales += product.quantity * product.product.price;
            });
            sale.totalSales = totalSales;
        });

        res.json(deliveredSales);
    } catch (error) {
        console.error("Error retrieving delivered sales data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});






app.put('/orders/:orderId/cancel', async (req, res) => {
    try {
        const orderId = req.params.orderId;

        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: 'cancelled' }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.json({ message: "Order cancelled successfully", order: updatedOrder });
    } catch (error) {
        console.error("Error cancelling order:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET user points by user ID
app.get('/api/users/:userId/points', async (req, res) => {
    try {
 
      const user = await User.findById(req.params.userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  

      res.json({ points: user.points });
    } catch (error) {
      console.error('Error fetching user points:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  
//admin crud order
app.put('/orders/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
    
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const originalStatus = order.status;
 
        order.status = status;
        await order.save();

        if (status === 'delivered' && originalStatus !== 'delivered') {
        
            const pointsEarned = Math.floor(order.totalAmount / 100);
            
         
            const user = await User.findById(order.user);
            if (!user) {
                console.error(`User not found for ID: ${order.user}`);
            } else {
                user.points += pointsEarned;
                await user.save();
            }
        }

        // Update product quantities based on order status
        for (const item of order.products) {
            const product = await Product.findById(item.product);
            if (!product) {
                console.error(`Product not found for ID: ${item.product}`);
                continue;
            }

            if (status === 'delivered') {
                product.quantity -= item.quantity;
            } else if (status === 'cancelled' && originalStatus !== 'cancelled') {
                product.quantity += item.quantity;
            }
            await product.save();
        }

        res.json({ message: 'Order status updated successfully' });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});






app.get('/items', async (req, res) => {
    try {
     
        const items = await Order.find().populate('products.product');

        res.json(items);
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



// Fetch orders with product details
app.get('/orders/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

       
        const orders = await Order.find({ user: userId }).populate({
            path: 'products.product',
            model: 'Product' 
        });

        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// Update quantity of a cart item
app.put('/cartItems/:itemId', async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const { quantity } = req.body;

        // Find the cart item by ID and update its quantity
        const updatedCartItem = await CartItem.findByIdAndUpdate(itemId, { quantity }, { new: true });

        if (!updatedCartItem) {
            return res.status(404).json({ error: "Cart item not found" });
        }

        res.json({ message: "Cart item quantity updated successfully", cartItem: updatedCartItem });
    } catch (error) {
        console.error("Error updating cart item quantity:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



// Purchase items in the cart
// Purchase items in the cart
app.post('/purchase/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Fetch cart items for the user
        const cartItems = await CartItem.find({ user: userId }).populate('product');

        // Check if there are cart items
        if (!cartItems || cartItems.length === 0) {
            return res.status(404).json({ error: "No items found in the cart" });
        }

        // Calculate total amount and create products array for the order
        let totalAmount = 0;
        const products = cartItems.map(cartItem => {
            totalAmount += cartItem.product.price * cartItem.quantity;
            return {
                product: cartItem.product._id,
                quantity: cartItem.quantity
            };
        });

        // Calculate delivery fee based on total amount
        let deliveryFee = 0;
        if (totalAmount <= 10000) {
            const selectedBarangay = req.body.barangay; 
            if (selectedBarangay === "Kita-kita") {
                deliveryFee = 21;
            } else if (selectedBarangay === "Poblacion") {
                deliveryFee = 31;
            } else if (selectedBarangay === "Pugaro") {
                deliveryFee = 51;
            }
        }

        const totalPriceWithFee = totalAmount + deliveryFee;

        const newOrder = new Order({
            user: userId,
            products: products,
            totalAmount: totalAmount,
            totalPriceWithFee: totalPriceWithFee
        });

        const order = await newOrder.save();


        await CartItem.deleteMany({ user: userId });

  
        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});




// Fetch cart items for a specific user
app.get('/cartItems', async (req, res) => {
    try {
       
        const userId = req.query.userId;

     
        const cartItems = await CartItem.find({ user: userId })
        .populate('user') 
        .populate('product'); 
        res.json(cartItems);
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Remove item from shopping cart
app.delete('/cart/:userId/:productId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const productId = req.params.productId; 
     
     
        const cartItem = await CartItem.findOneAndDelete({ user: userId, product: productId });
        
        if (!cartItem) {
            return res.status(404).json({ error: "Cart item not found" });
        }

        res.json({ message: "Item removed from cart successfully" });
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});




// Add item to shopping cart
app.post('/cart', async (req, res) => {
    try {
        const { user, products } = req.body;

     
        for (const item of products) {
            const { productId, quantity } = item;

        
            if (!Number.isInteger(quantity) || quantity <= 0) {
                return res.status(400).json({ error: "Quantity must be a positive integer" });
            }

         
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }

            const totalPrice = product.price * quantity;

       
            const cartItem = new CartItem({
                product: productId, 
                quantity,
                totalPrice,
                user
            });

         
            await cartItem.save();
        }

        res.status(201).json({ message: "Items added to cart successfully" });
    } catch (error) {
        console.error("Error adding item(s) to cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



//add product for admin
app.post('/products', async (req, res) => {
    try {
        const { name,wholesaleprice, description, price, category, quantity, photoUrl } = req.body;

        const newProduct = new Product({
            name,
            description,
            price,
            wholesaleprice,
            category,
            quantity,
            photoUrl  
        });

        await newProduct.save();

        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


//fetch product
app.get('/products', async (req, res) => {
    try {
       
        const products = await Product.find();

        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});




app.post('/register', async (req, res) => {
    try {
        const { username, email, password, firstname, lastname, number } = req.body;

        // Check if username, email, and password are provided
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Username, email, and password are required" });
        }

        // Check if the user with the given username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object with the provided data
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            firstname,
            lastname,
            number
        });

        // Save the new user to the database
        await newUser.save();

        // Send success response
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.get('/users', async (req, res) => {
    try {
       
        const users = await User.find({}, '-password');
      
        res.status(200).json({ users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



// Login route
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }

    
        const token = jwt.sign({ userId: user._id, username: user.username, role: user.role }, 'your_secret_key', { expiresIn: '1h' });

        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error authenticating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});




// // Login route
// app.post('/login', authenticateUser, (req, res) => {
//     res.json({ message: "Login successful", user: req.user });
// });

// Test route
app.post('/test', (req, res) => {
    res.json({ msg: "testsss" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
