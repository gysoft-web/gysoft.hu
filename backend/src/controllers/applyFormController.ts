import { Request, Response, NextFunction } from 'express';
import * as formModel from '../models/applyFormModel.js';
import { ApplyForm } from '../models/applyFormModel.js';
import { FormStatus } from '../types/formStatus';

/**
 * Retrieves all application forms from the database.
 * @param _ - The Express request object (unused).
 * @param res - The Express response object used to send the JSON response.
 * @param next - The Express next middleware function for error handling.
 * @returns void - Sends a 200 status with an array of ApplyForm objects or passes errors to the next middleware.
 */
export const getAllForms = async (_: Request, res: Response, next: NextFunction) => {
    try {
        const forms: ApplyForm[] = await formModel.getAllForms();
        res.status(200).json(forms);
    } catch (error) {
        next(error);
    }
};

/**
 * Deletes a form by its ID.
 * @param {Request} req - The Express request object containing the form ID in params
 * @param {Response} res - The Express response object
 * @param {NextFunction} next - The Express next function for error handling
 * @returns {Promise<void>} - Returns a promise that resolves when the deletion is complete
 * @throws {Error} - Passes any errors to the next middleware via next()
 * @example
 * // DELETE /forms/:id
 * // Response on success: { message: 'Form deleted successfully' }
 * // Response on not found: { message: 'Form not found' }
 */
export const deleteFormById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const success = await formModel.deleteFormById(id);
        if (success) {
            res.status(200).json({ message: 'Form deleted successfully' });
        } else {
            res.status(404).json({ message: 'Form not found' });
        }
    } catch (error) {
        next(error);
    }
};

/**
 * Updates the status of a form by its ID.
 *
 * @param {Request} req - The Express request object containing the form ID in params and status in body
 * @param {Request.params.id} req.params.id - The numeric ID of the form to update
 * @param {string} req.body.status - The new status value for the form
 * @param {Response} res - The Express response object
 * @param {NextFunction} next - The Express next function for error handling
 * @returns {Promise<void>} Sends a JSON response with status 200 if successful, or 404 if form not found
 * @throws {Error} Passes errors to the next middleware for centralized error handling
 */
export const updateFormStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const { status } = req.body;
        const success = await formModel.updateFormStatus(id, status);
        if (success) {
            res.status(200).json({ message: 'Form status updated successfully' });
        } else {
            res.status(404).json({ message: 'Form not found' });
        }
    } catch (error) {
        next(error);
    }
};

/**
 * Creates a new application form with the provided name and email.
 *
 * @async
 * @function createForm
 * @param {Request} req - Express request object containing form data in the body
 * @param {Request.body} req.body - The request body
 * @param {string} req.body.name - The applicant's name
 * @param {string} req.body.email - The applicant's email address
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function for error handling
 * @returns {void}
 * @throws {ValidationError} When name or email is missing, returns 400 status with error message
 *
 * @description
 * Validates the presence of name and email fields, creates a new ApplyForm object
 * with pending status and current timestamp, persists it to the database via formModel,
 * and returns the created form with a 201 status code.
 *
 * @example
 * POST /api/forms
 * Content-Type: application/json
 *
 * {
 *   "name": "John Doe",
 *   "email": "john@example.com"
 * }
 *
 * Response: 201 Created
 * {
 *   "name": "John Doe",
 *   "email": "john@example.com",
 *   "created": "2024-01-15T10:30:00.000Z",
 *   "status": "pending"
 *   "note": "Some additional notes like skills, age etc."
 * }
 */
export const createForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, note } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        const newForm: ApplyForm = {
            name,
            email,
            created: new Date(),
            status: 'pending',
            note,
        };
        const createdForm = await formModel.createForm(newForm);
        res.status(201).json(createdForm);
    } catch (error) {
        next(error);
    }
};
