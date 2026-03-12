/**
 * Valor Solutions - Cloudflare Worker
 * Handles contact form submissions and saves them to D1 database.
 */

export default {
    async fetch(request, env) {
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
            // Binding: valor_solutions_db
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

            // 3. Success Response
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
};
