import { Router } from "express";
import { HealthController } from "../controllers/healthController";

export class HealthRouter {
  public healthRoute: Router;
  private healthController = new HealthController();

  constructor() {
    this.healthRoute = Router();
    /**
     * @openapi
     * /helath:
     *   get:
     *     summary: Get service health
     *     responses:
     *       200:
     *         description: The service is healthy
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               required: [status, service, podName, uptimeSeconds, timestamp]
     *               properties:
     *                 status:
     *                   type: string
     *                   example: healthy
     *                 service:
     *                   type: string
     *                   example: keda-worker-service
     *                 podName:
     *                   type: string
     *                   example: keda-worker-service-7f8d9c-abc12
     *                 uptimeSeconds:
     *                   type: integer
     *                   example: 125
     *                 timestamp:
     *                   type: string
     *                   format: date-time
     *                   example: 2026-10-18T10:00:00.000Z
     */
    this.healthRoute.get("/", this.healthController.getHealth);
  }
}
