
export const isValidEmail = (email: string): boolean => {
  
    const match = String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
  
      return !!match;
  };

export const isEmail = (email: string): string | undefined => {
  return isValidEmail(email) 
    ? undefined
    : 'El correo no parece ser válido';
}

  export const isValidTelephone = (tel:string):boolean =>{
    const match = String(tel)
    .toLowerCase()
    .match(/^[9]\d{8}$/gm);
    return !!match;


  }

  export const isTelephone = (tel : string): string | undefined => {
    return isValidTelephone(tel ) 
      ? undefined
      : 'El número no parece ser válido';
  }

  export const isValidNumber = (tel:string):boolean =>{
    const match = String(tel)
    .toLowerCase()
    .match(/^[0-9]+$/gm);
    return !!match;


  }

  export const isNumber = (tel : string): string | undefined => {
    return isValidNumber(tel ) 
      ? undefined
      : 'El número no parece ser válido';
  }