/**
 * Valor Solutions - Cloudflare Worker
 * Handles contact form submissions and saves them to D1 database.
 */

export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        // Only handle specific API route
        if (url.pathname === '/api/contact') {
            const corsHeaders = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Content-Type': 'application/json'
            };

            // Handle CORS Preflight
            if (request.method === 'OPTIONS') {
                return new Response(null, { status: 204, headers: corsHeaders });
            }

            if (request.method !== 'POST') {
                return new Response(JSON.stringify({ success: false, error: 'Method not allowed' }), { 
                    status: 405, 
                    headers: corsHeaders 
                });
            }

            try {
                const body = await request.json();
                const { nombre, email, mensaje } = body;

                // 1. Validation
                if (!nombre || !email || !mensaje) {
                    return new Response(JSON.stringify({ success: false, error: 'Todos los campos son obligatorios' }), { 
                        status: 400, 
                        headers: corsHeaders 
                    });
                }

                // Basic email regex
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    return new Response(JSON.stringify({ success: false, error: 'Email inválido' }), { 
                        status: 400, 
                        headers: corsHeaders 
                    });
                }

                // 2. Insert into D1
                const { success } = await env.valor_solutions_db.prepare(
                    'INSERT INTO leads (nombre, email, mensaje, created_at) VALUES (?, ?, ?, ?)'
                ).bind(
                    nombre, 
                    email, 
                    mensaje, 
                    new Date().toISOString()
                ).run();

                if (!success) {
                    throw new Error('Database insertion failed');
                }

                // 3. Send email notification via Resend
                if (env.RESEND_API_KEY) {
                    try {
                        await fetch('https://api.resend.com/emails', {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${env.RESEND_API_KEY}`,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                from: 'Valor Solutions <notifications@resend.dev>',
                                to: 'felipevalor7@gmail.com',
                                subject: `Nuevo Lead: ${nombre}`,
                                html: `
                                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                                        <h2 style="color: #0a0a0a; border-bottom: 2px solid #f45151; padding-bottom: 10px;">Nuevo Lead - Valor Solutions</h2>
                                        <p style="font-size: 16px; margin: 20px 0;">Has recibido un nuevo contacto desde el sitio web.</p>
                                        <div style="background: #f9f9f9; padding: 15px; border-radius: 4px;">
                                            <p><strong>Nombre:</strong> ${nombre}</p>
                                            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #f45151;">${email}</a></p>
                                            <p><strong>Mensaje:</strong></p>
                                            <p style="white-space: pre-wrap; font-style: italic;">${mensaje}</p>
                                        </div>
                                        <p style="font-size: 12px; color: #888; margin-top: 30px; text-align: center;">Este correo fue enviado automáticamente desde el Cloudflare Worker.</p>
                                    </div>
                                `,
                            }),
                        });
                    } catch (e) {
                        console.error('Error enviando email:', e.message);
                    }
                }

                // 4. Success Response
                return new Response(JSON.stringify({ success: true }), { 
                    status: 200, 
                    headers: corsHeaders 
                });

            } catch (error) {
                console.error('Worker Error:', error.message);
                return new Response(JSON.stringify({ success: false, error: 'Error interno del servidor' }), { 
                    status: 500, 
                    headers: corsHeaders 
                });
            }
        }

        // Default: Serve static assets
        return env.ASSETS.fetch(request);
    }
};
