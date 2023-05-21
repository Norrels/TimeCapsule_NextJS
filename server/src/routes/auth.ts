import { FastifyInstance } from "fastify";
import axios from "axios";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function authRoutes(app: FastifyInstance) {
  app.post("/register", async (request) => {
    const bodySchema = z.object({
      code: z.string(),
    });

    // Deve ser enviado o código que vem do front depois que o usuário autoriza se conecta com o github
    const { code } = bodySchema.parse(request.body);

    // Com esse código que nos da acesso a informações do perfil do usuário fazemos um req para o API do github
    const accessTokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    // Ele retorna um access token que permite que a gente faça essa outra req para finalmente pega os dados do usuário
    const { access_token } = accessTokenResponse.data;

    const userReponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });

    const userSchema = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
    });

    const userInfo = userSchema.parse(userReponse.data);

    // Checando se o usuário já existe
    let user = await prisma.user.findUnique({
      where: {
        githubId: userInfo.id,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          avatarUrl: userInfo.avatar_url,
          githubId: userInfo.id,
          login: userInfo.login,
          name: userInfo.name,
        },
      });
    }

    const token = app.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      {
        sub: user.id,
        expiresIn: "30 days",
      }
    );

    return {
      token,
    };
  });
}
