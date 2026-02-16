import { NextResponse } from 'next/server';
import { systems, getSystemBySlug } from '@/lib/systems';

// Utility: CORS headers
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': process.env.CORS_ORIGINS || '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

// OPTIONS handler for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

// GET handler
export async function GET(request) {
  try {
    const { pathname } = new URL(request.url);
    const path = pathname.replace('/api', '');

    // GET /api/systems - Return all systems
    if (path === '/systems' || path === '/systems/') {
      return NextResponse.json(
        { success: true, data: systems },
        { headers: corsHeaders() }
      );
    }

    // GET /api/systems/:slug - Return a single system
    const systemMatch = path.match(/^\/systems\/([\w-]+)$/);
    if (systemMatch) {
      const slug = systemMatch[1];
      const system = getSystemBySlug(slug);
      if (!system) {
        return NextResponse.json(
          { success: false, error: 'System not found' },
          { status: 404, headers: corsHeaders() }
        );
      }
      return NextResponse.json(
        { success: true, data: system },
        { headers: corsHeaders() }
      );
    }

    // GET /api/health - Health check
    if (path === '/health' || path === '/' || path === '') {
      return NextResponse.json(
        { success: true, message: 'Roblox Systems Hub API', version: '1.0.0' },
        { headers: corsHeaders() }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Route not found' },
      { status: 404, headers: corsHeaders() }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500, headers: corsHeaders() }
    );
  }
}
