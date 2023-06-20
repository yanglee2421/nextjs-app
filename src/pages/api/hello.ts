// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse, PageConfig } from "next";

// NextJs Imports
import formidable, { Fields, Files } from "formidable";

// NodeJs Imports
import { readFile } from "node:fs/promises";
import { IncomingMessage } from "node:http";

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
  try {
    const isNotPost = req.method?.toLowerCase() !== "post";
    if (isNotPost) throw new Error("not allowed method");

    const { fields, files } = await toParse(req);
    const { file } = files;
    const f = Array.isArray(file) ? file.at(0) : file;
    if (!f) throw new Error("invalid file");

    const buffer = await readFile(f.filepath);
    const data = buffer.toString("base64");

    return res.status(200).json({ data, fields });
  } catch (error: any) {
    console.log(error);
    return res.status(500).send({ data: error.message });
  }
}

interface FormValues {
  fields: Fields;
  files: Files;
}
// Parse Form
function toParse(req: IncomingMessage) {
  const form = formidable();
  return new Promise<FormValues>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      return resolve({ fields, files });
    });
  });
}
