import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  const { id } = req.query;
  // when URI is '/parents/xxx' returns 'xxx'
  return res.json({ id });
};

export default handler;
