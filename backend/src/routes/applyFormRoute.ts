import { Router } from 'express';
import * as applyFormController from '../controllers/applyFormController.js';

/** @swagger
 * /api/apply-form:
 *   get:
 *     summary: Get all apply forms
 *     description: Retrieve all application forms
 *     tags:
 *       - Apply Form
 *     responses:
 *       200:
 *         description: Successfully retrieved all forms
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Submit apply form
 *     description: Submit a new application form
 *     tags:
 *       - Apply Form
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApplyForm'
 *     responses:
 *       201:
 *         description: Form submitted successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 * /api/apply-form/{id}/status:
 *   patch:
 *     summary: Update form status
 *     description: Update the status of an application form
 *     tags:
 *       - Apply Form
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Form status updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Form not found
 *       500:
 *         description: Internal server error
 * /api/apply-form/{id}:
 *   delete:
 *     summary: Delete form by id
 *     description: Delete an application form by its ID
 *     tags:
 *       - Apply Form
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Form deleted successfully
 *       404:
 *         description: Form not found
 *       500:
 *         description: Internal server error
 */
const router = Router();

// GET all forms
router.get('/', applyFormController.getAllForms);
// POST create new form
router.post('/', applyFormController.createForm);

// PUT update form status
router.patch('/:id/status', applyFormController.updateFormStatus);

// DELETE form by id
router.delete('/:id', applyFormController.deleteFormById);

export default router;
