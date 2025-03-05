import express from 'express';
import { test } from '../controllers/user.controller.js';

/**
 * User Routes Definition
 * ------------------------
 * This file handles routing for user-related endpoints.
 * Each route is linked to its corresponding controller logic.
 */
const router = express.Router();

/**
 * Test Route
 * ------------------------
 * A simple GET endpoint to verify that the user routes and controller
 * are working correctly. Typically used for health checks or initial testing.
 */
router.get('/test', test);

export default router;
