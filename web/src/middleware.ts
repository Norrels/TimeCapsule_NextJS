import { NextRequest, NextResponse } from "next/server";

const singInUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`;

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // A invés de retorna o usuário para home eu quero que ele seja logado e volte para tela que estáva tentando acessar
  if (!token) {
    return NextResponse.redirect(singInUrl, {
      headers: {
        "Set-Cookie": `redirectTo=${req.url}; Path=/; HttpOnly; max-age=20`,
      },
    });
  }
}

export const config = {
  matcher: "/memories/:path*",
};
