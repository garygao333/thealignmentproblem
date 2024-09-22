// import "./logger.js";

export const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: `uknonwn endpoint` });
};

export const errorHandler = (error, req, res, next) => {
  console.log(error);
  next(error);
};
