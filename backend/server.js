const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/claims', require('./routes/claims'));

// Database initialization
const db = require('./config/database');
const initDb = async () => {
  try {
    // Create claims table if it doesn't exist
    await db.execute(`
      CREATE TABLE IF NOT EXISTS claims (
        id INT AUTO_INCREMENT PRIMARY KEY,
        tenant_name VARCHAR(255) NOT NULL,
        mobile_no VARCHAR(20) NOT NULL,
        bond_version VARCHAR(50),
        bond_status ENUM('Ongoing', 'Completed') DEFAULT 'Ongoing',
        claim_status ENUM('Ongoing', 'Completed') DEFAULT 'Ongoing',
        claim_date DATE NOT NULL,
        landlord_name VARCHAR(255) NOT NULL,
        email_id VARCHAR(255) NOT NULL,
        bond_period VARCHAR(50),
        bond_value DECIMAL(10,2),
        monthly_rent DECIMAL(10,2),
        ll_period VARCHAR(50),
        ll_agreement BOOLEAN DEFAULT true,
        ll_expiry_date DATE,
        check_in_date DATE NOT NULL,
        check_out_date DATE NOT NULL,
        stay_days VARCHAR(50),
        check_out_notice_date DATE,
        lock_in_period VARCHAR(50) NOT NULL,
        notice_period VARCHAR(50) NOT NULL,
        breach_lock_in_days VARCHAR(50),
        breach_notice_days VARCHAR(50),
        actual_locking_period VARCHAR(50),
        actual_notice_period VARCHAR(50),
        move_in_video VARCHAR(500),
        move_out_video VARCHAR(500),
        payment_date1 DATE,
        amount1 DECIMAL(10,2),
        upi_cheque1 VARCHAR(100),
        bank_name1 VARCHAR(100),
        tuesnet_ltd1 ENUM('Yes', 'No') DEFAULT 'Yes',
        exp_to_h1 ENUM('Yes', 'No') DEFAULT 'Yes',
        t_and_t1 ENUM('Yes', 'No') DEFAULT 'Yes',
        type1 VARCHAR(50),
        advice1 TEXT,
        recovery_request_date1 DATE,
        recovery_amount1 DECIMAL(10,2),
        recovery_upi_cheque1 VARCHAR(100),
        recovery_bank_name1 VARCHAR(100),
        recovery_tuesnet_ltd1 ENUM('Yes', 'No') DEFAULT 'Yes',
        recovery_exp_to_h1 ENUM('Yes', 'No') DEFAULT 'Yes',
        recovery_t_and_t1 ENUM('Yes', 'No') DEFAULT 'Yes',
        recovery_type1 VARCHAR(50),
        recovery_advice1 TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await initDb();
}); 