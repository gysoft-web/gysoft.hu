"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createForm = exports.updateFormStatus = exports.deleteFormById = exports.getAllForms = void 0;
const formModel = __importStar(require("../models/applyFormModel.js"));
/**
 * Retrieves all application forms from the database.
 * @param _ - The Express request object (unused).
 * @param res - The Express response object used to send the JSON response.
 * @param next - The Express next middleware function for error handling.
 * @returns void - Sends a 200 status with an array of ApplyForm objects or passes errors to the next middleware.
 */
const getAllForms = async (_, res, next) => {
    try {
        const forms = await formModel.getAllForms();
        res.status(200).json(forms);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllForms = getAllForms;
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
const deleteFormById = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const success = await formModel.deleteFormById(id);
        if (success) {
            res.status(200).json({ message: 'Form deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Form not found' });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.deleteFormById = deleteFormById;
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
const updateFormStatus = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { status } = req.body;
        const success = await formModel.updateFormStatus(id, status);
        if (success) {
            res.status(200).json({ message: 'Form status updated successfully' });
        }
        else {
            res.status(404).json({ message: 'Form not found' });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.updateFormStatus = updateFormStatus;
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
const createForm = async (req, res, next) => {
    try {
        const { name, email, note } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        const newForm = {
            name,
            email,
            created: new Date(),
            status: 'pending',
            note,
        };
        const createdForm = await formModel.createForm(newForm);
        res.status(201).json(createdForm);
    }
    catch (error) {
        next(error);
    }
};
exports.createForm = createForm;
