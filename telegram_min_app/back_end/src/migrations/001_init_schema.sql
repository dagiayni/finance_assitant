-- Businesses (one per owner)
CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  master_tin VARCHAR(20) NOT NULL UNIQUE,
  telegram_chat_id VARCHAR(100) UNIQUE,
  owner_user_id UUID,
  drive_folder_id VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users (owner + employees)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  telegram_id VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255),
  email VARCHAR(255),
  role VARCHAR(20) CHECK (role IN ('owner', 'employee')),
  business_id UUID REFERENCES businesses(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Receipts (pending → approved)
CREATE TABLE IF NOT EXISTS receipts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) NOT NULL,
  uploaded_by UUID REFERENCES users(id),
  type VARCHAR(10) CHECK (type IN ('income', 'expense')) NOT NULL,
  vendor_name VARCHAR(255),
  vendor_tin VARCHAR(20),
  date DATE,
  total_amount DECIMAL(12, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'ETB',
  tax DECIMAL(12, 2),
  subtotal DECIMAL(12, 2),
  raw_ocr_text TEXT,
  confidence DECIMAL(3, 2),
  image_drive_url TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Line items (what was bought)
CREATE TABLE IF NOT EXISTS receipt_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_id UUID REFERENCES receipts(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity DECIMAL(10, 3),
  unit_price DECIMAL(12, 2),
  total DECIMAL(12, 2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_receipts_business_id ON receipts(business_id);
CREATE INDEX IF NOT EXISTS idx_receipts_status ON receipts(status);
CREATE INDEX IF NOT EXISTS idx_users_business_id ON users(business_id);
CREATE INDEX IF NOT EXISTS idx_receipt_items_receipt_id ON receipt_items(receipt_id);
