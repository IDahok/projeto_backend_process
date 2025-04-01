import { Request, Response } from 'express';
import { ProcessoModel, Processo } from '../models/Processo';

export class ProcessoController {
  static async listarProcessos(req: Request, res: Response) {
    try {
      const processos = await ProcessoModel.findAll();
      res.json(processos);
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'Erro ao listar processos' });
    }
  }

  static async buscarProcesso(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const processo = await ProcessoModel.findById(id);
      
      if (!processo) {
        return res.status(404).json({ error: 'Processo não encontrado' });
      }
      
      res.json(processo);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar processo' });
    }
  }

  static async listarSubprocessos(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const subprocessos = await ProcessoModel.findSubprocessos(id);
      res.json(subprocessos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar subprocessos' });
    }
  }

  static async criarProcesso(req: Request, res: Response) {
    try {
      const processoData: Omit<Processo, 'id'> = req.body;
      const processo = await ProcessoModel.create(processoData);
      res.status(201).json(processo);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar processo' });
    }
  }

  static async atualizarProcesso(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const processoData: Partial<Omit<Processo, 'id'>> = req.body;
      const processo = await ProcessoModel.update(id, processoData);
      
      if (!processo) {
        return res.status(404).json({ error: 'Processo não encontrado' });
      }
      
      res.json(processo);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar processo' });
    }
  }

  static async deletarProcesso(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await ProcessoModel.delete(id);
      
      if (!deleted) {
        return res.status(404).json({ error: 'Processo não encontrado' });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar processo' });
    }
  }
} 