function isPasswordValid(password:string) : boolean {
    const passwordRegex : RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&+])[A-Za-z\d@$!%*#?&+]{6,}$/;
    return passwordRegex.test(password);
  }
  
  export { isPasswordValid };