/*
  # Initial Schema Setup

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `price` (decimal)
      - `image_url` (text)
      - `created_at` (timestamp)
    
    - `recipes`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `image_url` (text)
      - `youtube_url` (text)
      - `created_at` (timestamp)
    
    - `events`
      - `id` (uuid, primary key)
      - `title` (text)
      - `address` (text)
      - `maps_url` (text)
      - `image_url` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage content
    - Allow public read access
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on products" 
  ON products FOR SELECT 
  TO public 
  USING (true);

CREATE POLICY "Allow authenticated users to manage products" 
  ON products FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- Create recipes table
CREATE TABLE IF NOT EXISTS recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  image_url text NOT NULL,
  youtube_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on recipes" 
  ON recipes FOR SELECT 
  TO public 
  USING (true);

CREATE POLICY "Allow authenticated users to manage recipes" 
  ON recipes FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  address text NOT NULL,
  maps_url text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on events" 
  ON events FOR SELECT 
  TO public 
  USING (true);

CREATE POLICY "Allow authenticated users to manage events" 
  ON events FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- Insert sample data
INSERT INTO products (title, description, price, image_url) VALUES
('Mieszanka ziół prowansalskich', 'Klasyczna kompozycja ziół charakterystyczna dla kuchni prowansalskiej', 24.99, 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d'),
('Pieprz czarny mielony', 'Aromatyczny pieprz czarny o intensywnym smaku', 19.99, 'https://images.unsplash.com/photo-1599909092372-3b7dc5b0d393');

INSERT INTO recipes (title, content, image_url, youtube_url) VALUES
('Zioła prowansalskie w kuchni', 'Odkryj magię ziół prowansalskich w swojej kuchni...', 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26', 'https://www.youtube.com/watch?v=example1'),
('Idealne przyprawianie mięs', 'Poznaj sekrety idealnego przyprawiania różnych rodzajów mięs...', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f', 'https://www.youtube.com/watch?v=example2');

INSERT INTO events (title, address, maps_url, image_url) VALUES
('Warsztaty kulinarne', 'ul. Przykładowa 1, Warszawa', 'https://goo.gl/maps/example1', 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d'),
('Degustacja przypraw', 'ul. Testowa 2, Kraków', 'https://goo.gl/maps/example2', 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40');