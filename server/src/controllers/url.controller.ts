import { Request, Response, NextFunction } from "express";
import { getAllUrls } from "../businessLogic/url.businessLogic";

const getUrls = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, data } = await getAllUrls();
    res.status(code).send(data);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving urls" });
    next(error);
  }
};

export default { getUrls };