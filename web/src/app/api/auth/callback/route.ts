import { api } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const redirectTo = request.cookies.get("redirectTo")?.value;

  const registerResponse = await api.post("/register", {
    code,
  });

  const { token } = registerResponse.data;

  // é possivel saber de que url a req foi feita,
  // Nesse caso como só em uma url especeficia essa chamada pode ser feita (home) vamos redireciona o usuário para ela
  const redirectURL = redirectTo ?? new URL("/", request.url);

  const cookiesExpiresInSeconds = 60 * 60 * 24 * 30; // 30 dias

  return NextResponse.redirect(redirectURL, {
    // Esse path no final significa que esse cookie vai estar disponivel em todas as rotas da aplicação
    // Caso eu quise limitar isso seria path=/auth por exemplo
    headers: {
      "Set-Cookie": `token=${token}; Path=/; max-age=${cookiesExpiresInSeconds}`,
    },
  });
}
