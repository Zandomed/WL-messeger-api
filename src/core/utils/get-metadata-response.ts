import { Response, Request } from 'express';
export function getMetadataResponse(req: Request) {
  return {
    timestamp: new Date().toISOString(),
    // duration: `${duration.toLocaleString()} ms`,
    path: req.url,
    method: req.method,
  };
}
