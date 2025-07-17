import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import multer from "multer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const upload = multer();

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(upload.single("file"))
  .post(async (req: any, res) => {
    const { originalname, mimetype, buffer } = req.file;

    const archivo = await prisma.archivo.create({
      data: {
        nombre: originalname,
        tipo: mimetype,
        datos: buffer,
      },
    });

    res
      .status(200)
      .json({ id: archivo.id, message: "Archivo subido correctamente" });
  })
  .onError((err, req, res) => {
    res.status(500).json({ error: `Error interno: ${err.message}` });
  })
  .onNoMatch((req, res) => {
    res.status(405).json({ error: `Método ${req.method} no permitido` });
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default router.handler();
