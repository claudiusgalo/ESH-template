import { FieldError } from "../graphql/gql/graphql";

export const toErrorMap = (errors: FieldError[]) => {
    const errorMap: Record<string, string> = {};
    errors.forEach(({ field, message }) => {
        errorMap[field] = message;
    });
    return errorMap; 
}

// What we are receiving back from response.data.register.errors looks like...
// [{field: 'username', message: 'something wrong!' }]