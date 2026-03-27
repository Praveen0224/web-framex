import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // A simple query to check connectivity
        // This assumes there might not be any tables yet, so we just check if the client is initialized
        // Or we can try to fetch something from a common schema
        const { data, error } = await supabase.from('_metadata').select('*').limit(1);

        if (error && error.code !== 'PGRST116' && error.code !== '42P01') {
            // PGRST116 is 'no rows returned', 42P01 is 'relation does not exist'
            // These are acceptable if the database is empty or the table doesn't exist
            // But other errors might indicate a connection issue
            return NextResponse.json({
                status: 'error',
                message: 'Failed to connect to Supabase',
                error: error.message
            }, { status: 500 });
        }

        return NextResponse.json({
            status: 'success',
            message: 'Supabase client initialized and connected successfully!',
            note: 'Note: If "relation does not exist" error occurred, it just means the test table doesn\'t exist yet, but the client reached the server.'
        });
    } catch (err) {
        return NextResponse.json({
            status: 'error',
            message: 'An unexpected error occurred',
            error: err.message
        }, { status: 500 });
    }
}
