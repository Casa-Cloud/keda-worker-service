import { Request, Response } from "express";
import { hostname } from "os";

export class HealthController {
  public getHealth = (req: Request, res: Response) => {
    return res.status(200).json({
      status: "healthy",
      service: "keda-worker-service",
      podName: process.env.HOSTNAME || hostname(),
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString()
    });
  }
}
