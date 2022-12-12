// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type User = {
  name: string;
  work: string;
};

export const getUserDetails = (): any => {
  return { name: "Kenny", work: "Developer" };
};

const UserData = (req: NextApiRequest, res: NextApiResponse<User>) => {
  if (req.method === "POST") {
    const username: string = req.body.username;
    const work: string = req.body.work;
    res.status(200).json({ name: username, work: work });
  } else {
    // GET
    res.status(200).json(getUserDetails());
  }
};

export default UserData;
