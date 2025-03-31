package org.example.secondsemlastp.advisor;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.example.secondsemlastp.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@RestControllerAdvice
public class AppWideExceptionHandler {

    private final Logger logger = LoggerFactory.getLogger(AppWideExceptionHandler.class);

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseUtil handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        logger.warn("Validation failed: {}", errors); // Log validation errors
        return new ResponseUtil(400, "Validation failed", errors);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseUtil handleConstraintViolationException(ConstraintViolationException ex) {
        Map<String, String> errors = new HashMap<>();
        Set<ConstraintViolation<?>> violations = ex.getConstraintViolations();
        for (ConstraintViolation<?> violation : violations) {
            String propertyPath = violation.getPropertyPath().toString();
            String fieldName = propertyPath.substring(propertyPath.lastIndexOf('.') + 1);
            String errorMessage = violation.getMessage();
            errors.put(fieldName, errorMessage);
        }
        logger.warn("Validation failed during persistence: {}", errors); // Log validation errors
        return new ResponseUtil(400, "Validation failed during persistence", errors);
    }

    @ExceptionHandler(TransactionSystemException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseUtil handleTransactionSystemException(TransactionSystemException ex) {
        Throwable rootCause = ex.getRootCause();
        if (rootCause instanceof ConstraintViolationException) {
            ConstraintViolationException constraintViolationException = (ConstraintViolationException) rootCause;
            Map<String, String> errors = new HashMap<>();
            Set<ConstraintViolation<?>> violations = constraintViolationException.getConstraintViolations();
            for (ConstraintViolation<?> violation : violations) {
                String propertyPath = violation.getPropertyPath().toString();
                String fieldName = propertyPath.substring(propertyPath.lastIndexOf('.') + 1);
                String errorMessage = violation.getMessage();
                errors.put(fieldName, errorMessage);
            }
            logger.warn("Validation failed during persistence: {}", errors);
            return new ResponseUtil(400, "Validation failed during persistence", errors);
        }
        logger.error("Transaction failed: ", ex);
        return new ResponseUtil(500, "An unexpected error occurred during transaction.", null);
    }
    @ExceptionHandler(Exception.class)
    public ResponseUtil handleAllExceptions(Exception ex) {
        logger.error("An unexpected error occurred: ", ex); // Log the full exception
        return new ResponseUtil(500, ex.getMessage(), null);
    }
}