import { body, validationResult } from "express-validator";

export const validators = [
    body("firstName")
        .isString()
        .withMessage("This is not a valid string.please provide us with correct name."),
    body("lastName")
        .isString()
        .withMessage("This is not a valid string.please provide us with correct name.")
        .isLength({ min: 3, max: 15 })
        .withMessage("Your last name is too short or too long")
        .customSanitizer((value) => value.replace(/["§$%&/()=?]/g, "")),

    body("email")
        .isEmail()
        .withMessage("This is not proper valid email!")
        .normalizeEmail(),
    body("password")
        .isStrongPassword()
        .withMessage("Password is too week!")
        .trim(),
    (req, res, next) => {
        const results = validationResult(req)
        if (results.isEmpty()) {
            next()
        } else {
            res.status(404).send({ success: false, message: results.errors });
        }
    }

]














