import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

let dbUrl = process.env.DATABASE_URL || '';

if (dbUrl) {
  // Ensure sslmode=require
  if (!dbUrl.includes('sslmode=')) {
    dbUrl += (dbUrl.includes('?') ? '&' : '?') + 'sslmode=require';
  }
  // Ensure connect_timeout=30 so waking sleeping serverless Neon instances doesn't fail
  if (!dbUrl.includes('connect_timeout=')) {
    dbUrl += (dbUrl.includes('?') ? '&' : '?') + 'connect_timeout=30';
  }
  // Ensure pool_timeout=30
  if (!dbUrl.includes('pool_timeout=')) {
    dbUrl += (dbUrl.includes('?') ? '&' : '?') + 'pool_timeout=30';
  }
}

process.env.DATABASE_URL = dbUrl;

console.log('==============================================');
console.log('  🚀 BlueCollar Production Startup Sequence   ');
console.log('==============================================');

function sleep(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {}
}

function runWithRetry(command, maxRetries = 3, delayMs = 5000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[Startup] ${command} (attempt ${attempt}/${maxRetries})...`);
      execSync(command, { stdio: 'inherit', env: process.env, cwd: process.cwd() });
      console.log(`[Startup] Successfully completed: ${command}`);
      return true;
    } catch (err) {
      console.warn(`[Startup] Attempt ${attempt} failed: ${err.message}`);
      if (attempt < maxRetries) {
        console.log(`[Startup] Waiting ${delayMs / 1000}s for Neon database compute to spin up...`);
        sleep(delayMs);
      }
    }
  }
  return false;
}

// 1. Run migrations with retry for Neon cold start
runWithRetry('npx prisma migrate deploy', 3, 5000);

// 2. Run seed with retry
runWithRetry('node prisma/seed.js', 2, 3000);

// 3. Start Express and Socket.io server
console.log('[Startup] Launching Express + Socket.io Server...');
import('./src/server.js');
