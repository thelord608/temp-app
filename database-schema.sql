-- Create the extractions table for storing user's text extractions
CREATE TABLE IF NOT EXISTS extractions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  image_url TEXT,
  title VARCHAR(255) DEFAULT 'Untitled Extraction',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_extractions_user_id ON extractions(user_id);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_extractions_created_at ON extractions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE extractions ENABLE ROW LEVEL SECURITY;

-- Create RLS policy: users can only see their own extractions
CREATE POLICY "Users can view own extractions" ON extractions
  FOR SELECT USING (auth.uid() = user_id);

-- Create RLS policy: users can insert their own extractions
CREATE POLICY "Users can insert own extractions" ON extractions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policy: users can update their own extractions
CREATE POLICY "Users can update own extractions" ON extractions
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policy: users can delete their own extractions
CREATE POLICY "Users can delete own extractions" ON extractions
  FOR DELETE USING (auth.uid() = user_id);
