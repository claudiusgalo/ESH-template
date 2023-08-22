import { UsernamePasswordInput } from "src/utils/UsernamePasswordInput"

export const validateRegister = (options: UsernamePasswordInput) => {
    if (!options.email.includes("@")){ //Registration Validation
        return[
            {
                field: 'email',
                message: 'invalid email',
            },
          ];
        }

    if (options.username.length <= 2){ //Registration Validation
        return[
              {
                field: 'username',
                message: 'length must be greater than 2',
              },
          ];
        }

    if (options.username.includes('@')){ //Registration Validation
        return [
            {
                field: 'username',
                message: 'cannot include an @',
            },
          ];
        }

    if (options.password.length <= 3){ //Registration Validation
        return[
            {
                field: 'password',
                message: 'length must be greater than 3',
            },
          ];    
        }
    return null; 
}