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
const express_1 = require("express");
const applyFormController = __importStar(require("../controllers/applyFormController.js"));
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
const router = (0, express_1.Router)();
// GET all forms
router.get('/', applyFormController.getAllForms);
// POST create new form
router.post('/', applyFormController.createForm);
// PUT update form status
router.patch('/:id/status', applyFormController.updateFormStatus);
// DELETE form by id
router.delete('/:id', applyFormController.deleteFormById);
exports.default = router;
