const https = require('https');
const fs = require('fs');
const path = require('path');

const envContent = fs.readFileSync(path.join(__dirname, '../.env.local'), 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    env[match[1]] = match[2].trim();
  }
});

const serviceId = env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateId = env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const publicKey = env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

console.log('Using EmailJS Config:', { serviceId, templateId, publicKey: publicKey ? '***' + publicKey.slice(-4) : 'NONE' });

const payload = JSON.stringify({
  service_id: serviceId,
  template_id: templateId,
  user_id: publicKey,
  template_params: {
    name: 'Carlos Mendoza (Prueba de Sistema)',
    phone: '3109876543',
    location: 'Vereda Payandé - Finca El Manantial',
    email: 'carlos.mendoza.prueba@gmail.com',
    renting_status: 'No',
    property_url: 'No especificada (Sin URL - Opcional)',
    message: 'Esta es una solicitud de prueba para verificar que el formulario envía los correos correctamente a gerencia@villetaconserje.com.'
  }
});

const req = https.request({
  hostname: 'api.emailjs.com',
  path: '/api/v1.0/email/send',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload),
    'Origin': 'https://villetaconserje.com'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Response Status:', res.statusCode);
    console.log('Response Body:', data);
    if (res.statusCode === 200) {
      console.log('✅ Correo de prueba enviado con ÉXITO!');
    } else {
      console.error('❌ Error al enviar correo de prueba.');
    }
  });
});

req.on('error', (err) => {
  console.error('Request Error:', err);
});

req.write(payload);
req.end();
