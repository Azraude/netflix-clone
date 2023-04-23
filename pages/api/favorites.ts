import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const { currentUser } = await serverAuth(req,res);
    console.log("currentUser", currentUser);
    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        },
      },
    });
    console.log("favoriteMovies", favoriteMovies);
    return res.status(200).json(favoriteMovies);
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}
