// middleware.ts
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
    const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const requestedPage = req.nextUrl.pathname;
    const validRoles = ['admin'];

    if( !session ){
      const url = req.nextUrl.clone();

      url.pathname = `/auth/login`;
      url.search = `p=${ requestedPage }`;
      
      if( requestedPage.includes('/api') ){
        return new Response( JSON.stringify({ message: 'No autorizado' }),{
          status: 401,
          headers:{
            'Content-Type':'application/json'
          }
        });
      };

      return NextResponse.redirect( url );
    };

    if( requestedPage.includes('/api/admin') && !validRoles.includes( session.user.rol.name ) ){
 
      return new Response( JSON.stringify({ message: 'No autorizado' }),{
        status: 401,
        headers:{
          'Content-Type':'application/json'
        }
        });
    };

    if( requestedPage.includes('/admin') && !validRoles.includes( session.user.rol.name ) ){
 
      return NextResponse.redirect(new URL('/', req.url));
    };
 

    return NextResponse.next();

}

// See "Matching Paths" below to learn more
export const config = {
  matcher:[ '/admin/:path*'],
}