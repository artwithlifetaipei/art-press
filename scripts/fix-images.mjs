
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ndykxwqdhgffnldpfoiw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5keWt4d3FkaGdmZm5sZHBmb2l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NTkxMTAsImV4cCI6MjA5NDIzNTExMH0.hPoot7WIdklyBZHNz8q10OIlcXnv40W58sEixybpZF8';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const run = async () => {
  console.log('🚀 Fixing missing cover images...');

  const updates = [
    { 
      slug: 'eme-skincare', 
      image: 'https://i0.wp.com/tapeverythingcom.wpcomstaging.com/wp-content/uploads/2025/07/IMG_7628.jpg?fit=843%2C745&ssl=1' 
    },
    { 
      slug: 'dan-retro', 
      image: 'https://i0.wp.com/tapeverythingcom.wpcomstaging.com/wp-content/uploads/2025/06/IMG_7170.jpg?fit=1200%2C1184&ssl=1' 
    }
  ];

  for (const u of updates) {
    const { error } = await supabase
      .from('articles')
      .update({ image: u.image })
      .eq('slug', u.slug);
    
    if (error) {
      console.error(`❌ Failed to update ${u.slug}:`, error.message);
    } else {
      console.log(`✅ Successfully updated image for ${u.slug}`);
    }
  }

  console.log('✨ All fixes complete!');
};

run();
