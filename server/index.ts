import express, { type Request, type Response } from 'express';
import { createClient } from '@supabase/supabase-js';

const app = express();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.get('/posts', async (_req: Request, res: Response) => {
  const { data, error } = await supabase.from('posts').select('*');
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
