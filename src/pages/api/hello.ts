// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse, PageConfig } from "next";

// NextJs Imports
import formidable, { Fields, Files } from "formidable";

// NodeJs Imports
import { readFile } from "node:fs/promises";

// Disabled the default body parser in NextJs
export const config: PageConfig = { api: { bodyParser: false } };

interface Res {
  data: string;
  fields?: Fields;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Res>
) {
  if (req.method?.toLowerCase() !== "post") return;

  try {
    const form = formidable();

    const { fields, files } = await new Promise<FormValues>(
      (resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          return resolve({ fields, files });
        });
      }
    );

    const { file } = files;
    const f = Array.isArray(file) ? file[0] : file;
    const buffer = await readFile(f.filepath);
    const data = buffer.toString("base64");

    return res.status(200).json({ data, fields });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ data: "Error" });
  }
}

interface FormValues {
  fields: Fields;
  files: Files;
}
