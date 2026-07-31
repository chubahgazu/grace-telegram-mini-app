import { spawn } from 'child_process';
import https from 'https';

const BOT_TOKEN = '8761090097:AAG-itbzZMYWRVLrIiUEu4b1KQLIepwyLvc';

function updateTelegramBot(url) {
  const data = JSON.stringify({
    menu_button: {
      type: 'web_app',
      text: '🛍 Магазин Grace',
      web_app: { url }
    }
  });

  const req = https.request(`https://api.telegram.org/bot${BOT_TOKEN}/setChatMenuButton`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }, (res) => {
    let response = '';
    res.on('data', chunk => response += chunk);
    res.on('end', () => console.log('>>> TELEGRAM BOT MENU UPDATED TO:', url, '| RESULT:', response));
  });

  req.on('error', (e) => console.error('Telegram API error:', e));
  req.write(data);
  req.end();
}

function runTunnel() {
  console.log('[Tunnel Manager] Spawning localtunnel...');
  const child = spawn('npx', ['localtunnel', '--port', '8901']);

  child.stdout.on('data', (data) => {
    const text = data.toString();
    console.log('[stdout]:', text);
    const match = text.match(/https:\/\/[^\s]+/);
    if (match) {
      const url = match[0].trim();
      updateTelegramBot(url);
    }
  });

  child.stderr.on('data', (data) => {
    console.error('[stderr]:', data.toString());
  });

  child.on('close', (code) => {
    console.log(`[Tunnel Manager] Tunnel process closed (${code}). Restarting in 2s...`);
    setTimeout(runTunnel, 2000);
  });
}

runTunnel();
