import { Request, Response } from 'express';
import { AreaModel, Area } from '../models/Area';

export class AreaController {
  static async listarAreas(req: Request, res: Response) {
    try {
      const areas = await AreaModel.findAll();
      res.json(areas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar áreas' });
    }
  }

  static async buscarArea(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const area = await AreaModel.findById(id);
      
      if (!area) {
        return res.status(404).json({ error: 'Área não encontrada' });
      }
      
      res.json(area);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar área' });
    }
  }

  static async criarArea(req: Request, res: Response) {
    try {
      const areaData: Omit<Area, 'id'> = req.body;
      const area = await AreaModel.create(areaData);
      res.status(201).json(area);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar área' });
    }
  }

  static async atualizarArea(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const areaData: Partial<Omit<Area, 'id'>> = req.body;
      const area = await AreaModel.update(id, areaData);
      
      if (!area) {
        return res.status(404).json({ error: 'Área não encontrada' });
      }
      
      res.json(area);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar área' });
    }
  }

  static async deletarArea(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await AreaModel.delete(id);
      
      if (!deleted) {
        return res.status(404).json({ error: 'Área não encontrada' });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar área' });
    }
  }
} 