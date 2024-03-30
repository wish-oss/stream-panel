import { withAuth } from 'next-auth/middleware';

export const config = {
  matcher: ['/profile', '/api/:path?', '/projects/:path?', '/users/:path?'],
};

export default withAuth({
  pages: {
    signIn: `/login`,
    verifyRequest: `/login`,
    error: '/login', // Error code passed in query string as ?error=
  },
});
