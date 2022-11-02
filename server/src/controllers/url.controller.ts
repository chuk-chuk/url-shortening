import { Request, Response, NextFunction } from "express";
import { createNewUrl, getAllUrls } from "../businessLogic/url.businessLogic";

const getUrls = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, data } = await getAllUrls();
    res.status(code).send(data);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving urls" });
    next(error);
  }
};

const createUrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdObject = req.body || {};
    const { data } = await createNewUrl(createdObject);
    res.status(data.code).json(data);
  } catch (error) {
    res.status(500).send({ message: "Error creating a new record" });
    next(error);
  }
};


export default { getUrls, createUrl };