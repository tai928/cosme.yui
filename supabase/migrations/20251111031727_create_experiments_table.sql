/*
  # Chemistry Experiments Database Schema

  1. New Tables
    - `experiments`
      - `id` (uuid, primary key) - Unique identifier for each experiment
      - `title` (text) - Name of the experiment
      - `description` (text) - Brief description shown on thumbnail
      - `thumbnail_url` (text) - URL to thumbnail image
      - `full_description` (text) - Detailed explanation of the experiment
      - `experiment_type` (text) - Type of simulation (acid_base, titration, etc.)
      - `created_at` (timestamptz) - Timestamp of creation
      
  2. Security
    - Enable RLS on `experiments` table
    - Add policy for public read access (anyone can view experiments)
*/

CREATE TABLE IF NOT EXISTS experiments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  thumbnail_url text NOT NULL,
  full_description text NOT NULL,
  experiment_type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE experiments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view experiments"
  ON experiments
  FOR SELECT
  TO public
  USING (true);

INSERT INTO experiments (title, description, thumbnail_url, full_description, experiment_type) VALUES
  ('酸塩基指示薬実験', '指示薬の色変化を観察する実験', 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400', 'pH指示薬を酸性・中性・塩基性の溶液に加えると、溶液のpHに応じて色が変化します。フェノールフタレインは酸性で無色、塩基性でピンク色になります。この実験では、様々な溶液にドロップして色の変化を観察できます。', 'indicator'),
  ('中和滴定実験', '酸と塩基の中和反応を観察', 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400', '中和滴定は、酸性溶液に塩基性溶液を少しずつ加えていく実験です。指示薬の色が変わる点を中和点といい、そこで酸と塩基が過不足なく反応したことを示します。ビュレットから滴下する量を調整して、正確な中和点を見つけましょう。', 'titration'),
  ('炎色反応実験', '金属イオンの炎色を観察', 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400', '金属イオンを炎の中に入れると、元素特有の色を示します。ナトリウムは黄色、カリウムは紫色、銅は青緑色、カルシウムは橙赤色になります。これは電子が励起状態から基底状態に戻るときに光を放出するためです。', 'flame'),
  ('電気分解実験', '水の電気分解を観察', 'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=400', '水に電流を流すと、陽極から酸素、陰極から水素が発生します。発生する気体の体積比は水素:酸素=2:1になります。この実験では、電圧を調整して電気分解の様子を観察し、発生する気体の量を確認できます。', 'electrolysis');
