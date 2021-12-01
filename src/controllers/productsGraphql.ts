import { productsPersistencia } from '../persistencia/productos';
import { Request, Response, NextFunction } from 'express';

export const getProducts = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const producto = id
    ? await productsPersistencia.leerUno(id)
    : await productsPersistencia.leer();

  res.json({
    data: producto,
  });
};

export const checkProductExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.params.id) {
    const id = req.params.id;

    const producto = productsPersistencia.leerUno(id);

    if (!producto) {
      return res.status(404).json({
        msg: 'producto not found',
      });
    }
  }
  next();
};

export const addProducts = async (req: Request, res: Response) => {
  const { title, price, thumbnail } = req.body;
  const newItem = productsPersistencia.guardar(title, price, thumbnail);

  res.json({
    msg: 'producto agregado con exito',
    data: newItem,
  });
};
