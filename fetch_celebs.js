const fs = require('fs');
const path = require('path');
const https = require('https');

const SEASONS = {
  'clear-spring': ['Emma Stone', 'Emmy Rossum', 'Kerry Washington'],
  'true-spring': ['Amy Adams', 'Isla Fisher', 'Nicole Scherzinger'],
  'light-spring': ['Taylor Swift', 'Margot Robbie', 'IU (Lee Ji-eun)'],
  'light-summer': ['Elle Fanning', 'Cate Blanchett', 'Gemma Chan'],
  'true-summer': ['Emily Blunt', 'Sarah Jessica Parker', 'Zoe Saldana'],
  'soft-summer': ['Leona Lewis', 'Jennifer Aniston', 'Kate Middleton'],
  'soft-autumn': ['Gigi Hadid', 'Jennifer Lopez', 'Jessica Biel'],
  'true-autumn': ['Julia Roberts', 'Beyoncé', 'Eva Mendes'],
  'dark-autumn': ['Keira Knightley', 'Penélope Cruz', 'Mindy Kaling'],
  'dark-winter': ['Lily Collins', 'Lucy Liu', 'Viola Davis'],
  'true-winter': ['Anne Hathaway', 'Fan Bingbing', 'Lupita Nyong\'o'],
  'bright-winter': ['Megan Fox', 'Dita Von Teese', 'Naomi Campbell']
};

const CELEB_WIKI_MAP = {
  'IU (Lee Ji-eun)': 'IU (singer)',
  'Jennifer Lopez': 'Jennifer Lopez',
  'Beyoncé': 'Beyoncé',
  'Zoe Saldana': 'Zoe Saldana',
  'Gemma Chan': 'Gemma Chan',
  'Nicole Scherzinger': 'Nicole Scherzinger',
  'Lupita Nyong\'o': 'Lupita Nyong\'o',
  'Fan Bingbing': 'Fan Bingbing',
  'Dita Von Teese': 'Dita Von Teese',
  'Naomi Campbell': 'Naomi Campbell',
  'Kate Middleton': 'Catherine, Princess of Wales',
  'Jada Smith': 'Jada Pinkett Smith'
};

const OUTPUT_DIR = path.join(__dirname, 'public', 'twins');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'AlleleCelebFetcher/1.0 (anishka.content@gmail.com)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'AlleleCelebFetcher/1.0 (anishka.content@gmail.com)' } }, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function fetchCelebImage(celebName, filename) {
  const wikiTitle = CELEB_WIKI_MAP[celebName] || celebName;
  const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(wikiTitle)}&prop=pageimages&format=json&pithumbsize=300&redirects=1`;

  try {
    const res = await getJson(apiUrl);
    const pages = res?.query?.pages;
    if (!pages) return false;

    const pageId = Object.keys(pages)[0];
    if (pageId === '-1') {
      console.log(`❌ Page not found for: ${celebName}`);
      return false;
    }

    const thumbUrl = pages[pageId]?.thumbnail?.source;
    if (!thumbUrl) {
      console.log(`⚠️ No thumbnail found for: ${celebName}`);
      return false;
    }

    const destPath = path.join(OUTPUT_DIR, filename);
    await downloadFile(thumbUrl, destPath);
    console.log(`✅ Downloaded: ${celebName} -> ${filename}`);
    return true;
  } catch (err) {
    console.error(`💥 Error fetching ${celebName}:`, err.message);
    return false;
  }
}

async function run() {
  console.log('🚀 Starting celebrity photo fetcher...');
  let total = 0;
  let downloaded = 0;

  for (const [seasonId, celebs] of Object.entries(SEASONS)) {
    for (const celebName of celebs) {
      total++;
      const fileSlug = `${seasonId}-${celebName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg`;
      const success = await fetchCelebImage(celebName, fileSlug);
      if (success) downloaded++;
      
      // Gentle throttling to respect Wikimedia API
      await new Promise(r => setTimeout(r, 250));
    }
  }

  console.log(`\n🎉 Process complete. Successfully downloaded ${downloaded}/${total} celebrity portraits.`);
}

run();
